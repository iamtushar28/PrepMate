"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { speak } from "@/lib/speak";
import { saveConversation } from "@/services/transcript.service";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

import type { TranscriptMessage } from "@/components/interview/Transcript";
import { useToastStore } from "@/store/toast-store";

export const useInterview = (interviewId: string) => {
  const router = useRouter();
  const { showToast } = useToastStore();

  const [currentQuestion, setCurrentQuestion] = useState("");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [totalQuestions, setTotalQuestions] = useState(0);

  const [isSpeaking, setIsSpeaking] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const [isRecording, setIsRecording] = useState(false);

  const [answer, setAnswer] = useState("");

  const [transcriptMessages, setTranscriptMessages] = useState<
    TranscriptMessage[]
  >([]);

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition();

  const loadInterview = async () => {
    try {
      const response = await fetch(`/api/interview/${interviewId}/session`);

      if (!response.ok) {
        throw new Error("Failed to load interview session.");
      }

      const data = await response.json();

      setCurrentQuestion(data.currentQuestion.question);

      setCurrentQuestionIndex(data.currentQuestionIndex);

      setTotalQuestions(data.totalQuestions);
    } catch (error) {
      console.error("Failed to load interview", error);

      showToast("Failed to load interview.", "error");
    }
  };

  const askQuestion = async (question: string) => {
    setTranscriptMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: question,
      },
    ]);

    setIsSpeaking(true);

    await speak(question);

    setIsSpeaking(false);
  };

  const handleAnswer = async (answer: string) => {
    if (!answer.trim()) return;

    try {
      setTranscriptMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: answer,
        },
      ]);

      setIsProcessing(true);

      const response = await fetch(`/api/interview/${interviewId}/answer`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: currentQuestion,
          answer,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process answer.");
      }

      const data = await response.json();

      setIsProcessing(false);

      setIsSpeaking(true);

      await speak(data.acknowledgement);

      setIsSpeaking(false);

      const nextResponse = await fetch(`/api/interview/${interviewId}/next`, {
        method: "POST",
      });

      if (!nextResponse.ok) {
        throw new Error("Failed to load next question.");
      }

      const nextData = await nextResponse.json();

      if (nextData.completed) {
        const completionMessage = "Interview completed. Thank you.";

        setTranscriptMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: completionMessage,
          },
        ]);

        setIsSpeaking(true);

        await speak(completionMessage);

        setIsSpeaking(false);

        router.replace(`/feedback/${interviewId}`);

        return;
      }

      setCurrentQuestion(nextData.currentQuestion.question);

      setCurrentQuestionIndex(nextData.currentQuestionIndex);
    } catch (error) {
      console.error("Failed to process answer", error);

      setIsProcessing(false);

      setIsSpeaking(false);
    }
  };

  const startRecording = () => {
    clearTranscript();

    setAnswer("");

    setIsRecording(true);

    startListening();
  };

  const stopRecording = () => {
    stopListening();

    setIsRecording(false);

    setAnswer(transcript);
  };

  useEffect(() => {
    if (!interviewId) return;

    loadInterview();
  }, [interviewId]);

  useEffect(() => {
    if (!currentQuestion) return;

    askQuestion(currentQuestion);
  }, [currentQuestion]);

  const submitAnswer = async () => {
    const finalAnswer = answer.trim();

    if (!finalAnswer) return;

    try {
      await saveConversation(interviewId, {
        questionIndex: currentQuestionIndex,
        question: currentQuestion,
        answer: finalAnswer,
      });

      await handleAnswer(finalAnswer);

      clearTranscript();

      setAnswer("");
    } catch (error) {
      console.error("Failed to save conversation", error);
    }
  };

  const clearAnswer = () => {
    clearTranscript();

    setAnswer("");
  };

  return {
    currentQuestion,

    currentQuestionIndex,

    totalQuestions,

    // Live speech transcript (optional, useful for debugging)
    transcript,

    // Editable answer
    answer,

    setAnswer,

    transcriptMessages,

    isListening,

    isSpeaking,

    isProcessing,

    isRecording,

    startRecording,

    stopRecording,

    submitAnswer,

    clearAnswer,
  };
};

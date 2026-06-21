'use client';

import { useEffect, useState } from "react";
import { speak } from "@/lib/speak";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

import type {
    TranscriptMessage,
} from "@/components/interview/Transcript";

export const useInterview = (
    interviewId: string
) => {

    const [
        currentQuestion,
        setCurrentQuestion
    ] = useState("");

    const [
        currentQuestionIndex,
        setCurrentQuestionIndex
    ] = useState(0);

    const [
        totalQuestions,
        setTotalQuestions
    ] = useState(0);

    const [
        isSpeaking,
        setIsSpeaking
    ] = useState(false);

    const [
        isProcessing,
        setIsProcessing
    ] = useState(false);

    const [
        isRecording,
        setIsRecording
    ] = useState(false);

    const [
        transcriptMessages,
        setTranscriptMessages,
    ] = useState<
        TranscriptMessage[]
    >([]);

    const {
        transcript,
        isListening,
        startListening,
        stopListening,
        clearTranscript,
    } = useSpeechRecognition();

    const loadInterview =
        async () => {

            try {

                const response =
                    await fetch(
                        `/api/interview/${interviewId}/session`
                    );

                const data =
                    await response.json();

                setCurrentQuestion(
                    data.currentQuestion.question
                );

                setCurrentQuestionIndex(
                    data.currentQuestionIndex
                );

                setTotalQuestions(
                    data.totalQuestions
                );

            } catch (error) {
                console.error(
                    "Failed to load interview",
                    error
                );
            }
        };

    const askQuestion =
        async (
            question: string
        ) => {

            setTranscriptMessages(
                prev => [
                    ...prev,
                    {
                        role: "ai",
                        text: question,
                    },
                ]
            );

            setIsSpeaking(true);

            await speak(
                question
            );

            setIsSpeaking(false);
        };

    const handleAnswer =
        async (
            answer: string
        ) => {

            if (!answer.trim())
                return;

            try {

                setTranscriptMessages(
                    prev => [
                        ...prev,
                        {
                            role: "user",
                            text: answer,
                        },
                    ]
                );

                setIsProcessing(true);

                const response =
                    await fetch(
                        `/api/interview/${interviewId}/answer`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify({
                                question:
                                    currentQuestion,

                                answer,
                            }),
                        }
                    );

                const data =
                    await response.json();

                setIsProcessing(false);

                setIsSpeaking(true);

                await speak(
                    data.acknowledgement
                );

                setIsSpeaking(false);

                const nextResponse =
                    await fetch(
                        `/api/interview/${interviewId}/next`,
                        {
                            method: "POST",
                        }
                    );

                const nextData =
                    await nextResponse.json();

                if (
                    nextData.completed
                ) {

                    setTranscriptMessages(
                        prev => [
                            ...prev,
                            {
                                role: "ai",
                                text:
                                    "Interview completed. Thank you.",
                            },
                        ]
                    );

                    await speak(
                        "Interview completed. Thank you."
                    );

                    return;
                }

                setCurrentQuestion(
                    nextData.currentQuestion
                        .question
                );

                setCurrentQuestionIndex(
                    nextData.currentQuestionIndex
                );

            } catch (error) {

                console.error(
                    "Failed to process answer",
                    error
                );

                setIsProcessing(
                    false
                );

                setIsSpeaking(
                    false
                );
            }
        };

    const startRecording =
        () => {

            clearTranscript();

            setIsRecording(
                true
            );

            startListening();
        };

    const stopRecording =
        async () => {

            stopListening();

            setIsRecording(
                false
            );

            const answer =
                transcript.trim();

            if (!answer)
                return;

            await handleAnswer(
                answer
            );
        };

    useEffect(() => {

        if (
            !interviewId
        ) return;

        loadInterview();

    }, [interviewId]);

    useEffect(() => {

        if (
            !currentQuestion
        ) return;

        askQuestion(
            currentQuestion
        );

    }, [currentQuestion]);

    return {

        currentQuestion,

        currentQuestionIndex,

        totalQuestions,

        transcript,

        transcriptMessages,

        isListening,

        isSpeaking,

        isProcessing,

        isRecording,

        startRecording,

        stopRecording,
    };
};
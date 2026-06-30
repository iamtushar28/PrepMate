import { useCallback, useRef, useState } from "react";

interface SpeechRecognitionResultEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message?: string;
}

interface BrowserSpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;

    start(): void;
    stop(): void;
    abort(): void;

    onstart: (() => void) | null;
    onend: (() => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
}

interface SpeechRecognitionConstructor {
    new (): BrowserSpeechRecognition;
}

declare global {
    interface Window {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }
}

export const useSpeechRecognition = () => {

    const [transcript, setTranscript] = useState("");

    const [isListening, setIsListening] = useState(false);

    const recognitionRef =
        useRef<BrowserSpeechRecognition | null>(null);

    const finalTranscriptRef = useRef("");

    const shouldContinueRef = useRef(false);

    const clearTranscript = useCallback(() => {

        finalTranscriptRef.current = "";

        setTranscript("");

    }, []);

    const startListening = useCallback(() => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            alert(
                "Speech Recognition is not supported in this browser."
            );

            return;
        }

        if (recognitionRef.current) {

            recognitionRef.current.stop();

        }

        shouldContinueRef.current = true;

        const recognition = new SpeechRecognition();

        recognition.lang = "en-IN";

        recognition.continuous = true;

        recognition.interimResults = true;

        recognition.maxAlternatives = 1;

        recognition.onstart = () => {

            setIsListening(true);

        };

        recognition.onresult = (
            event: SpeechRecognitionResultEvent
        ) => {

            let interimTranscript = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                const result = event.results[i];

                if (result.isFinal) {

                    finalTranscriptRef.current +=
                        result[0].transcript + " ";

                } else {

                    interimTranscript +=
                        result[0].transcript;

                }

            }

            setTranscript(
                (
                    finalTranscriptRef.current +
                    interimTranscript
                ).trim()
            );

        };

        recognition.onerror = (
            event: SpeechRecognitionErrorEvent
        ) => {

            console.error(
                "Speech Recognition Error:",
                event.error
            );

        };

        recognition.onend = () => {

            recognitionRef.current = null;

            if (shouldContinueRef.current) {

                // Restart automatically after unexpected stop
                setTimeout(() => {

                    if (shouldContinueRef.current) {

                        startListening();

                    }

                }, 200);

            } else {

                setIsListening(false);

            }

        };

        recognition.start();

        recognitionRef.current = recognition;

    }, []);

    const stopListening = useCallback(() => {

        shouldContinueRef.current = false;

        recognitionRef.current?.stop();

        recognitionRef.current = null;

        setIsListening(false);

    }, []);

    return {

        transcript,

        isListening,

        startListening,

        stopListening,

        clearTranscript,

    };

};
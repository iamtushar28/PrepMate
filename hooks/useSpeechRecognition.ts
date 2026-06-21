import { useRef, useState } from "react";

export const useSpeechRecognition = () => {

    const [
        transcript,
        setTranscript
    ] = useState("");

    const [
        isListening,
        setIsListening
    ] = useState(false);

    const recognitionRef =
        useRef<any>(null);

    const clearTranscript = () => {
        setTranscript("");
    };

    const startListening = () => {

        const SpeechRecognition =
            (window as any)
                .SpeechRecognition ||
            (window as any)
                .webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(
                "Speech Recognition is not supported in this browser."
            );
            return;
        }

        if (
            recognitionRef.current
        ) {
            recognitionRef.current.stop();
        }

        const recognition =
            new SpeechRecognition();

        recognition.lang =
            "en-US";

        recognition.continuous =
            true;

        recognition.interimResults =
            true;

        recognition.maxAlternatives =
            1;

        recognition.onstart =
            () => {
                setIsListening(
                    true
                );
            };

        recognition.onresult =
            (
                event: any
            ) => {

                let text =
                    "";

                for (
                    let i = 0;
                    i <
                    event.results
                        .length;
                    i++
                ) {
                    text +=
                        event.results[
                            i
                        ][0]
                            .transcript +
                        " ";
                }

                setTranscript(
                    text.trim()
                );
            };

        recognition.onerror =
            (
                event: any
            ) => {

                console.error(
                    "Speech Recognition Error:",
                    event
                );
            };

        recognition.onend =
            () => {

                setIsListening(
                    false
                );

                recognitionRef.current =
                    null;
            };

        recognition.start();

        recognitionRef.current =
            recognition;
    };

    const stopListening =
        () => {

            if (
                recognitionRef.current
            ) {

                recognitionRef.current.stop();

                recognitionRef.current =
                    null;
            }

            setIsListening(
                false
            );
        };

    return {

        transcript,

        isListening,

        startListening,

        stopListening,

        clearTranscript,
    };
};
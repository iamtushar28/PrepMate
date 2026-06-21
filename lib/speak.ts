export const speak = (text: string) => {
    return new Promise<void>((resolve) => {
        speechSynthesis.cancel();

        const utterance =
            new SpeechSynthesisUtterance(text);

        utterance.lang = "en-US";
        utterance.rate = 1;

        utterance.onend = () => resolve();

        speechSynthesis.speak(utterance);
    });
};
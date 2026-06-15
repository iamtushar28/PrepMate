import { create } from "zustand";

interface InterviewStore {
    jobDescription: string;
    parsedResume: any | null;
    isParsingResume: boolean;

    setJobDescription: (value: string) => void;
    setParsedResume: (value: any) => void;
    setIsParsingResume: (value: boolean) => void;
}

export const useInterviewStore = create<InterviewStore>((set) => ({
    isParsingResume: false,
    parsedResume: null,

    jobDescription: "",

    setIsParsingResume: (loading) =>
        set({ isParsingResume: loading }),

    setParsedResume: (resume) =>
        set({ parsedResume: resume }),

    setJobDescription: (jd) =>
        set({ jobDescription: jd }),
}));
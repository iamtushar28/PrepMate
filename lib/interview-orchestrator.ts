import { adminDb } from "./firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

type InterviewQuestion = {
    section: string;
    question: string;
};

type Interview = {
    id: string;
    userId: string;

    status: string;

    currentQuestionIndex: number;
    totalQuestions: number;

    estimatedLevel: string;

    questions: {
        technical: string[];
        project: string[];
        behavioral: string[];
    };

    createdAt: any;
    startedAt: any;
    completedAt: any;
    lastActivityAt: any;

    evaluation: any;
};

export class InterviewOrchestrator {
    static flattenQuestions(
        interview: Interview
    ): InterviewQuestion[] {
        return [
            ...(interview.questions?.technical || []).map(
                (question: string) => ({
                    section: "technical",
                    question,
                })
            ),

            ...(interview.questions?.project || []).map(
                (question: string) => ({
                    section: "project",
                    question,
                })
            ),

            ...(interview.questions?.behavioral || []).map(
                (question: string) => ({
                    section: "behavioral",
                    question,
                })
            ),
        ];
    }

    static async getInterview(
        interviewId: string
    ): Promise<Interview> {
        const doc = await adminDb
            .collection("interviews")
            .doc(interviewId)
            .get();

        if (!doc.exists) {
            throw new Error("Interview not found");
        }

        const interview =
            doc.data() as Interview | undefined;

        if (!interview) {
            throw new Error(
                "Interview data missing"
            );
        }

        return interview;
    }

    static async startInterview(
        interviewId: string
    ): Promise<Interview> {
        const interview =
            await this.getInterview(interviewId);

        if (interview.status === "created") {
            await adminDb
                .collection("interviews")
                .doc(interviewId)
                .update({
                    status: "in_progress",

                    startedAt:
                        FieldValue.serverTimestamp(),

                    lastActivityAt:
                        FieldValue.serverTimestamp(),
                });
        }

        return await this.getInterview(
            interviewId
        );
    }

    static async getCurrentQuestion(
        interviewId: string
    ) {
        const interview =
            await this.getInterview(interviewId);

        const questions =
            this.flattenQuestions(interview);

        const currentQuestion =
            questions[
                interview.currentQuestionIndex
            ];

        return {
            currentQuestion,
            currentQuestionIndex:
                interview.currentQuestionIndex,
            totalQuestions:
                interview.totalQuestions,
            status: interview.status,
        };
    }

    static async moveToNextQuestion(
        interviewId: string
    ) {
        const interview =
            await this.getInterview(interviewId);

        const nextIndex =
            interview.currentQuestionIndex + 1;

        if (
            nextIndex >=
            interview.totalQuestions
        ) {
            await this.completeInterview(
                interviewId
            );

            return {
                completed: true,
            };
        }

        await adminDb
            .collection("interviews")
            .doc(interviewId)
            .update({
                currentQuestionIndex:
                    nextIndex,

                lastActivityAt:
                    FieldValue.serverTimestamp(),
            });

        const updatedInterview =
            await this.getInterview(
                interviewId
            );

        const questions =
            this.flattenQuestions(
                updatedInterview
            );

        return {
            completed: false,

            currentQuestion:
                questions[nextIndex],

            currentQuestionIndex:
                nextIndex,
        };
    }

    static async completeInterview(
        interviewId: string
    ) {
        await adminDb
            .collection("interviews")
            .doc(interviewId)
            .update({
                status: "completed",

                completedAt:
                    FieldValue.serverTimestamp(),

                lastActivityAt:
                    FieldValue.serverTimestamp(),
            });

        return true;
    }
}
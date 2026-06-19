import { NextRequest, NextResponse } from "next/server";

import { InterviewOrchestrator } from "@/lib/interview-orchestrator";

export async function POST(
    request: NextRequest,
    {
        params,
    }: {
        params: Promise<{
            interviewId: string;
        }>;
    }
) {
    try {
        const { interviewId } =
            await params;

        const session =
            await InterviewOrchestrator.getCurrentQuestion(
                interviewId
            );

        const instructions = `
You are a professional AI interviewer.

Rules:

- Ask ONLY questions provided by the application.
- Do not generate new interview questions.
- Do not evaluate the candidate yet.
- Keep responses concise.
- After the candidate answers, briefly acknowledge them.
- Wait for the application's next instruction.

Current Interview Question:

${session.currentQuestion.question}
`;

        return NextResponse.json({
            success: true,

            interviewId,

            currentQuestion:
                session.currentQuestion,

            currentQuestionIndex:
                session.currentQuestionIndex,

            totalQuestions:
                session.totalQuestions,

            instructions,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to create realtime session",
            },
            {
                status: 500,
            }
        );
    }
}
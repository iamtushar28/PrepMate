import { InterviewOrchestrator } from "@/lib/interview-orchestrator";

export async function POST(
    request: Request,
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

        const result =
            await InterviewOrchestrator.moveToNextQuestion(
                interviewId
            );

        return Response.json(result);
    } catch (error) {
        return Response.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}
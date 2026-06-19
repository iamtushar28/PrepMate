import { InterviewOrchestrator } from "@/lib/interview-orchestrator";

export async function GET(
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

        await InterviewOrchestrator.startInterview(
            interviewId
        );

        const session =
            await InterviewOrchestrator.getCurrentQuestion(
                interviewId
            );

        return Response.json(session);
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
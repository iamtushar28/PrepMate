import InterviewNavbar from "./components/InterviewNavbar";
import InterviewHome from "./components/InterviewHome";

export default async function Page({
    params,
}: {
    params: Promise<{ interviewId: string }>;
}) {
    const { interviewId } = await params;

    return (
        <section className="min-h-screen h-auto w-full">
            <InterviewNavbar />

            <InterviewHome
                interviewId={interviewId}
            />
        </section>
    );
}
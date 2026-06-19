import InterviewNavbar from "./components/InterviewNavbar";
import InterviewHome from "./components/InterviewHome";

export default async function Page() {

    return (
        <section className="min-h-screen h-auto w-full bg-zinc-50/50">
            <InterviewNavbar />

            <InterviewHome />
        </section>
    );
}
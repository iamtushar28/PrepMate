import { redirect } from "next/navigation";

import { adminDb } from "@/lib/firebase-admin";
import InterviewNavbar from "./components/InterviewNavbar";
import InterviewHome from "./components/InterviewHome";

type Props = {
    params: Promise<{
        interviewId: string;
    }>;
};

export default async function Page({
    params,
}: Props) {

    const { interviewId } =
        await params;

    const interviewDoc =
        await adminDb
            .collection("interviews")
            .doc(interviewId)
            .get();

    if (!interviewDoc.exists) {
        redirect("/");
    }

    const interview =
        interviewDoc.data();

    if (!interview) {
        redirect("/");
    }

    if (interview.status === "completed") {
        redirect(
            `/feedback/${interviewId}`
        );
    }

    return (

        <section className="min-h-screen">

            <InterviewNavbar />

            <InterviewHome
                interviewId={interviewId}
            />

        </section>

    );

}
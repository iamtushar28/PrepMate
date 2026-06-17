"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

type Props = {
    interviewId: string;
};

const InterviewHome = ({
    interviewId,
}: Props) => {
    const [interview, setInterview] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const snapshot =
                    await getDoc(
                        doc(
                            db,
                            "interviews",
                            interviewId
                        )
                    );

                if (snapshot.exists()) {
                    setInterview(
                        snapshot.data()
                    );
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInterview();
    }, [interviewId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!interview) {
        return (
            <div>Interview not found</div>
        );
    }

    return (
        <div className="h-screen w-full flex justify-center items-center flex-col">
            <h2 className="text-xl font-bold mb-4">
                {interview.estimatedLevel}
            </h2>

            <h3 className="font-semibold">
                Technical
            </h3>

            <ul>
                {interview.questions.technical.map(
                    (
                        q: string,
                        i: number
                    ) => (
                        <li key={i}>
                            {q}
                        </li>
                    )
                )}
            </ul>

            <h3 className="font-semibold mt-6">
                Project
            </h3>

            <ul>
                {interview.questions.project.map(
                    (
                        q: string,
                        i: number
                    ) => (
                        <li key={i}>
                            {q}
                        </li>
                    )
                )}
            </ul>

            <h3 className="font-semibold mt-6">
                Behavioral
            </h3>

            <ul>
                {interview.questions.behavioral.map(
                    (
                        q: string,
                        i: number
                    ) => (
                        <li key={i}>
                            {q}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default InterviewHome;
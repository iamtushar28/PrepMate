"use client";

import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { useInterviewStore } from "@/store/interview-store";

export default function JobDescriptionInput() {
    const { jobDescription, setJobDescription } =
        useInterviewStore();

    const MAX_JD_WORDS = 500;

    const wordCount = jobDescription
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const value = e.target.value;

        const words = value
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (words.length <= MAX_JD_WORDS) {
            setJobDescription(value);
        }
    };

    const SAMPLE_JD = `Seeking a Frontend Developer Fresher with knowledge of HTML, CSS, JavaScript, React.js, and responsive design. The candidate will assist in developing and maintaining modern web applications, collaborate with team members, and learn best practices in frontend development.`;

    const handleSampleJD = () => {
        setJobDescription(SAMPLE_JD);
    };

    return (
        <div className="w-full md:w-[38%] h-auto p-5 border border-gray-200 bg-white rounded-2xl flex flex-col gap-4 relative shadow-xs">
            {/* Header */}
            <div>
                <div className="flex gap-2 items-center">
                    <p className="h-8 w-8 text-white bg-[#0B7A60] rounded-full flex justify-center items-center">
                        1
                    </p>

                    <h6 className="font-semibold">
                        Paste Job Description
                    </h6>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                    Add the full job description of the role you
                    are preparing for.
                </p>
            </div>

            {/* Sample JD */}
            <button
                onClick={handleSampleJD}
                type="button"
                className="hidden md:block w-fit px-3 py-1 text-xs font-semibold text-[#0B7A60] border border-gray-200 hover:bg-[#F4FBF8] rounded absolute top-4 right-4 transition duration-200 cursor-pointer"
            >
                Sample JD
            </button>

            {/* Textarea */}
            <div>
                <textarea
                    value={jobDescription}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Paste the job description here..."
                    className="w-full p-2 placeholder:text-sm border border-gray-200 rounded-lg outline-none resize-none"
                />

                <div className="flex justify-end mt-1">
                    <span
                        className={`text-xs ${wordCount > 450
                            ? "text-orange-500"
                            : "text-gray-400"
                            }`}
                    >
                        {wordCount}/{MAX_JD_WORDS} words
                    </span>
                </div>
            </div>

            {/* Tip Box */}
            <div className="p-2 w-full bg-[#F4FBF8] rounded-lg flex gap-1">
                <button className="min-h-6 min-w-10 text-xl text-[#0B7A60] flex justify-center items-center">
                    <MdOutlineTipsAndUpdates />
                </button>

                <p className="text-sm text-gray-500">
                    <span className="text-[#0B7A60] font-semibold">
                        Tip:
                    </span>{" "}
                    Include responsibilities, required
                    skills, tools and qualifications for
                    better results.
                </p>
            </div>
        </div>
    );
}
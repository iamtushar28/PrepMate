"use client";

import { useRef, useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import { PiSpinnerBold } from "react-icons/pi";
import { useInterviewStore } from "@/store/interview-store";
import { FaCircleCheck } from "react-icons/fa6";
import { useToastStore } from "@/store/toast-store";

interface ResumeUploadProps {
    onFileSelect: (file: File) => Promise<boolean>;
}

export default function ResumeUpload({
    onFileSelect,
}: ResumeUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { showToast } = useToastStore();
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState("");

    const { isParsingResume } = useInterviewStore();

    const validateFile = (file: File) => {
        if (file.type !== "application/pdf") {
            showToast(
                "Only PDF resumes are allowed",
                "error"
            );
            return false;
        }

        if (file.size > 5 * 1024 * 1024) {
            showToast(
                "Resume size must be less than 5MB",
                "error"
            );
            return false;
        }

        return true;
    };

    const handleFile = async (file: File) => {
        if (!validateFile(file)) return;

        const success = await onFileSelect(file);

        if (success) {
            setFileName(file.name);
        }
    };

    const handleDrop = async (
        e: React.DragEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];

        if (file) {
            await handleFile(file);
        }
    };

    return (
        <div className="w-full md:w-[38%] h-auto p-5 border border-gray-200 bg-white rounded-2xl flex flex-col gap-4 relative shadow-xs">
            {/* Header */}
            <div>
                <div className="flex gap-2 items-center">
                    <p className="h-8 w-8 text-white bg-[#0B7A60] rounded-full flex justify-center items-center">
                        2
                    </p>

                    <h6 className="font-semibold">
                        Upload Resume (Optional)
                    </h6>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                    Upload your resume so AI can personalize questions
                    based
                    <br />
                    on your experience.
                </p>
            </div>

            {/* Upload Area */}
            <div
                onClick={() => {
                    if (!isParsingResume) {
                        inputRef.current?.click();
                    }
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`
                    w-full h-42 border border-dashed rounded-lg
                    flex flex-col gap-1 justify-center items-center
                    transition-all duration-200
                    ${isParsingResume
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    ${isDragging
                        ? "border-[#0B7A60] bg-[#F4FBF8]"
                        : "border-gray-300"
                    }
                `}
            >
                {isParsingResume ? (
                    <>
                        <PiSpinnerBold
                            size={22}
                            color="#0B7A60"
                            className="animate-spin"
                        />

                        <h5 className="font-semibold">
                            Parsing Resume...
                        </h5>

                        <p className="text-sm text-gray-500">
                            AI is extracting your experience
                        </p>
                    </>
                ) : (
                    <>
                        <h5 className="font-semibold">
                            {fileName
                                ? <div className="flex gap-1 items-center">
                                    <p>Resume Parsed</p>
                                    <FaCircleCheck color="#0B7A60" />
                                </div>
                                : "Drag & drop your resume here"}
                        </h5>

                        {fileName ? (
                            <p className="text-sm text-[#0B7A60] font-medium">
                                {fileName}
                            </p>
                        ) : (
                            <>
                                <p className="text-gray-500">
                                    Or
                                </p>

                                <button
                                    type="button"
                                    className="px-5 py-2 text-sm text-[#0B7A60] font-semibold border border-gray-200 hover:bg-[#F4FBF8] rounded-lg cursor-pointer"
                                >
                                    Browse File
                                </button>

                                <p className="text-xs text-gray-400">
                                    PDF only • Max 5MB
                                </p>
                            </>
                        )}
                    </>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={async (e) => {
                        const file =
                            e.target.files?.[0];

                        if (file) {
                            await handleFile(file);
                        }

                        e.target.value = "";
                    }}
                />
            </div>

            {/* Security Notice */}
            <div className="p-2 w-full bg-[#F4FBF8] rounded-lg flex gap-1">
                <button className="min-h-6 min-w-10 text-xl text-[#0B7A60] flex justify-center items-center">
                    <GoShieldCheck />
                </button>

                <p className="text-sm text-gray-500">
                    <span className="text-[#0B7A60] font-semibold">
                        Your data is secure
                    </span>
                    <br />
                    We never share your data with anyone.
                </p>
            </div>
        </div>
    );
}
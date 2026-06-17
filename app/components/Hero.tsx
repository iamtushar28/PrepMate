'use client'

import { useState } from 'react'
import { useInterviewStore } from "@/store/interview-store";
import { BsFillLightningChargeFill, BsStars } from 'react-icons/bs'
import { FaArrowRightLong } from 'react-icons/fa6'
import Header from './Header'
import Features from './Features'
import ResumeUpload from './ResumeUpload'
import JobDescriptionInput from './JobDescriptionInput'
import { PiSpinnerBold } from 'react-icons/pi';
import { useToastStore } from '@/store/toast-store';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';

type Props = {}

const token = await auth.currentUser?.getIdToken();

const Hero = (props: Props) => {

    const router = useRouter();
    const { user, loading } = useAuthStore();

    const {
        jobDescription,
        parsedResume,
        isParsingResume,
        setIsParsingResume,
        setParsedResume,
    } = useInterviewStore();

    const { showToast } = useToastStore();
    const [isGeneratingInterview, setIsGeneratingInterview] =
        useState(false);

    const wordCount = jobDescription
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    const canGenerate =
        !isParsingResume &&
        !isGeneratingInterview &&
        wordCount >= 20;

    const handleResumeUpload = async (
        file: File
    ): Promise<boolean> => {
        try {
            setIsParsingResume(true);

            const formData = new FormData();
            formData.append("resume", file);

            const response = await fetch(
                "/api/parse-resume",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to parse resume"
                );
            }

            setParsedResume(data);

            return true;
        } catch (error) {
            showToast(
                error instanceof Error
                    ? error.message
                    : "Something went wrong",
                "error"
            );

            return false;
        } finally {
            setIsParsingResume(false);
        }
    };

    const handleCreateInterview = async () => {
        if (loading) return;

        if (!user) {
            showToast(
                "Please login first to generate an interview",
                "error"
            );
            return;
        }

        try {
            setIsGeneratingInterview(true);

            const token =
                await auth.currentUser?.getIdToken();

            const response = await fetch(
                "/api/generate-interview",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        jobDescription,
                        resume: parsedResume,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Failed to create interview"
                );
            }

            router.push(
                `/interview/${data.interviewId}`
            );

        } catch (error) {
            showToast(
                error instanceof Error
                    ? error.message
                    : "Something went wrong",
                "error"
            );
        } finally {
            setIsGeneratingInterview(false);
        }
    };

    return (
        <div className='pt-24 pb-8 px-4 min-h-screen h-auto w-full flex flex-col gap-6 justify-center items-center'>

            <Header />

            <div className='w-full flex gap-6 flex-col md:flex-row justify-center items-center'>

                <JobDescriptionInput />

                <ResumeUpload
                    onFileSelect={handleResumeUpload}
                />

            </div>

            <div className='w-full flex flex-col gap-3 justify-center items-center'>

                <div className='flex gap-2 items-center'>
                    <BsFillLightningChargeFill color='#0B7A60' />
                    <p className='text-sm text-gray-500'>
                        Takes less than 30 seconds
                    </p>
                </div>

                <button
                    onClick={handleCreateInterview}
                    disabled={!canGenerate}
                    className="w-[85%] md:w-[32%] py-2 rounded-lg transition duration-200 flex gap-4 justify-center items-center shadow bg-[#0B7A60] text-white enabled:cursor-pointer enabled:hover:bg-[#0E8F70] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {
                        !isGeneratingInterview && <BsStars />
                    }

                    {
                        isGeneratingInterview
                            ? "Creating..."

                            : "Create My Interview"
                    }

                    {
                        isGeneratingInterview && <PiSpinnerBold
                            size={22}
                            color="#ffffff"
                            className="animate-spin"
                        />
                    }

                    {
                        !isGeneratingInterview && <FaArrowRightLong />
                    }
                </button>

                <div>
                    <p className='text-sm text-gray-500'>
                        No credit card required ● Start for free
                    </p>
                </div>

            </div>

            <Features />

        </div>
    )
}

export default Hero
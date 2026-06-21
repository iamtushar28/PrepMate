'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { FaMicrophone, FaStop } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import { RiRobot2Line, RiSpeakAiLine } from 'react-icons/ri';
import { FaEarListen } from 'react-icons/fa6';

import MicHealth from './MicHealth';

import { useInterview } from '@/hooks/useInterview';
import Transcript from '@/components/interview/Transcript';

type Props = {};

const InterviewHome = (props: Props) => {
    const params = useParams();

    const interviewId =
        params.interviewId as string;

    const interview =
        useInterview(interviewId);

    const status = interview.isSpeaking
        ? "speaking"
        : interview.isListening
            ? "listening"
            : interview.isProcessing
                ? "processing"
                : "idle";

    return (
        <div className='pt-24 pb-8 px-4 min-h-screen h-auto w-full flex flex-col gap-10 md:gap-14 justify-center items-center relative'>

            {/* Mobile Title */}
            <div className='md:hidden flex flex-col items-center'>

                <h4 className='font-semibold'>
                    Software Engineer Interview
                </h4>

                <div className='text-sm text-gray-500 flex gap-1 items-center'>
                    <GoDotFill className='text-[#10A37F] animate-pulse' />
                    <p>In Progress</p>
                </div>

            </div>

            {/* AI Section */}
            <div className='w-full flex flex-col gap-5 justify-center items-center'>

                <RiRobot2Line
                    size={38}
                    color='#0B7A60'
                />

                <h4 className='-mt-2 font-semibold text-[#10A37F]'>
                    AI Interviewer
                </h4>

                {/* Recording */}
                <div className='px-6 py-2 rounded-full bg-green-50 border border-green-200 text-green-600 flex gap-2 items-center'>

                    {status === "speaking" && (
                        <>
                            <RiSpeakAiLine />
                            AI Speaking...
                        </>
                    )}

                    {status === "listening" && (
                        <>
                            <FaEarListen />
                            Listening...
                        </>
                    )}

                    {status === "processing" && (
                        <>
                            Processing Answer...
                        </>
                    )}

                    {status === "idle" && (
                        <>
                            Idle
                        </>
                    )}

                </div>

                {/* Question */}
                <h4 className='text-xl font-semibold w-full md:w-125 text-center'>
                    {interview.currentQuestion}
                </h4>

                {/* Progress */}
                <p className='text-sm text-gray-500'>
                    Question{" "}
                    {interview.currentQuestionIndex + 1}
                    {" / "}
                    {interview.totalQuestions}
                </p>

            </div>

            {/* User Section */}
            <div>

                <div className='flex flex-col gap-2 justify-center items-center'>

                    <div className='h-17 w-17 bg-[#0b7a6018] shadow flex justify-center items-center rounded-full'>

                        <button
                            onClick={() => {

                                if (
                                    interview.isRecording
                                ) {
                                    interview.stopRecording();
                                } else {
                                    interview.startRecording();
                                }
                            }}
                            disabled={
                                interview.isSpeaking ||
                                interview.isProcessing
                            }
                            className="h-14 w-14 text-xl text-white rounded-full flex justify-center items-center transition duration-200 bg-[#0B7A60] hover:bg-[#0E8F70] cursor-pointer"
                        >
                            {interview.isRecording
                                ?
                                <FaStop />
                                :
                                <FaMicrophone />
                            }
                        </button>

                    </div>

                    <p className='text-sm text-gray-500'>
                        {
                            interview.isRecording
                                ? <span className='animate-pulse'>Click to stop recording</span>
                                : "Click to start recording"
                        }
                    </p>

                    {interview.isRecording && interview.transcript && (
                        <p className='md:w-127 text-sm text-gray-500 text-center'>
                            {interview.transcript}
                        </p>
                    )}
                </div>

            </div>

            {/* Mic Health */}
            <MicHealth />

            {/* Future Transcript Panel */}
            <Transcript
                messages={
                    interview.transcriptMessages
                }
            />

        </div>
    );
};

export default InterviewHome;
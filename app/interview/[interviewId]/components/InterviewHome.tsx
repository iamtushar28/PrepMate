'use client';

import React from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import { RiRobot2Line, RiSpeakAiLine } from 'react-icons/ri';
import { FaEarListen } from 'react-icons/fa6';

import { useInterview } from '@/hooks/useInterview';
import Transcript from '@/components/interview/Transcript';

type Props = {
    interviewId: string;
};

const InterviewHome = ({
    interviewId,
}: Props) => {

    const interview =
        useInterview(interviewId);

    const status =
        interview.isSpeaking
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

                <div className="flex flex-col items-center gap-4">

                    {/* Microphone */}
                    <div className="h-17 w-17 rounded-full bg-[#0b7a6018] shadow flex items-center justify-center">

                        <button
                            onClick={() => {

                                if (interview.isRecording) {

                                    interview.stopRecording();

                                } else {

                                    interview.startRecording();

                                }

                            }}
                            disabled={
                                interview.isSpeaking ||
                                interview.isProcessing
                            }
                            className="h-14 w-14 rounded-full bg-[#0B7A60] hover:bg-[#0E8F70] text-white text-xl flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {
                                interview.isRecording
                                    ? <FaStop />
                                    : <FaMicrophone />
                            }
                        </button>

                    </div>

                    <p className="text-sm text-gray-500">

                        {
                            interview.isRecording
                                ? (
                                    <span className="animate-pulse">
                                        Listening...
                                    </span>
                                )
                                : "Click to start recording"
                        }

                    </p>

                    {/* Live Transcript */}
                    {
                        interview.isRecording &&
                        interview.transcript && (

                            <div className="w-full md:w-137 rounded-lg border border-gray-200 p-4">

                                <h3 className="mb-2 text-sm font-semibold text-gray-700">
                                    Live Transcript
                                </h3>

                                <div className="max-h-40 overflow-y-auto">

                                    <p className="text-sm leading-7 text-gray-600">

                                        {interview.transcript}

                                    </p>

                                </div>

                            </div>

                        )
                    }

                    {/* Editable Answer */}
                    {
                        !interview.isRecording &&
                        interview.answer && (

                            <div className="w-full md:w-137 rounded-lg border border-gray-200 bg-white p-4 space-y-3">

                                <div className="flex items-center justify-between">

                                    <h3 className="text-sm font-semibold text-gray-700">

                                        Edit your answer

                                    </h3>

                                    <button
                                        onClick={interview.clearAnswer}
                                        className="rounded border px-3 py-1 text-xs font-medium text-[#0B7A60] hover:bg-[#F4FBF8] cursor-pointer"
                                    >
                                        Clear
                                    </button>

                                </div>

                                <textarea
                                    rows={3}
                                    value={interview.answer}
                                    onChange={(e) =>
                                        interview.setAnswer(
                                            e.target.value
                                        )
                                    }
                                    className="w-full resize-none rounded-md border border-gray-200 p-3 text-sm outline-none focus:ring-2 focus:ring-[#0B7A60] transition-all duration-200"
                                    placeholder="Your answer..."
                                />

                                <button
                                    onClick={interview.submitAnswer}
                                    disabled={
                                        interview.isProcessing
                                    }
                                    className="w-full rounded-md bg-[#0B7A60] py-2 text-white hover:bg-[#0E8F70] disabled:opacity-50 cursor-pointer"
                                >
                                    Submit Answer
                                </button>

                            </div>

                        )
                    }

                </div>

            </div>

            {/* Conversation */}
            <Transcript
                messages={interview.transcriptMessages}
            />

        </div>
    );
};

export default InterviewHome;
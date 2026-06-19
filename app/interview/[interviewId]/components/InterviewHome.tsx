'use client'
import React, { useEffect, useState } from 'react'
import { FaEarListen, FaMicrophone } from 'react-icons/fa6'
import { GoDotFill } from 'react-icons/go'
import { RiRobot2Line, RiSpeakAiLine } from 'react-icons/ri'
import Transcript from './Transcript'
import MicHealth from './MicHealth'
import { useParams } from 'next/navigation'

type Props = {}

const InterviewHome = (props: Props) => {

    const params = useParams();
    const interviewId = params.interviewId as string;

    const [
        currentQuestion,
        setCurrentQuestion,
    ] = useState("");

    const [
        currentQuestionIndex,
        setCurrentQuestionIndex,
    ] = useState(0);

    const [
        totalQuestions,
        setTotalQuestions,
    ] = useState(0);

    const loadInterview =
        async () => {
            const response = await fetch(
                `/api/interview/${interviewId}/session`
            );

            const data =
                await response.json();

            setCurrentQuestion(
                data.currentQuestion.question
            );

            setCurrentQuestionIndex(
                data.currentQuestionIndex
            );

            setTotalQuestions(
                data.totalQuestions
            );
        };

    useEffect(() => {
        loadInterview();
    }, []);

    const nextQuestion =
        async () => {
            const response = await fetch(
                `/api/interview/${interviewId}/next`,
                {
                    method: "POST",
                }
            );

            const data =
                await response.json();

            if (data.completed) {
                console.log(
                    "Interview Complete"
                );

                return;
            }

            setCurrentQuestion(
                data.currentQuestion.question
            );

            setCurrentQuestionIndex(
                data.currentQuestionIndex
            );
        };

    return (
        <div className='pt-24 pb-8 px-4 min-h-screen h-auto w-full flex flex-col gap-10 md:gap-14 justify-center items-center relative'>

            {/* interview title */}
            <div className='md:hidden flex flex-col items-center'>

                <h4 className='font-semibold'>Software Engineer Interview</h4>

                <div className='text-sm text-gray-500 flex gap-1 items-center'>
                    <GoDotFill className='text-[#10A37F] animate-pulse' />
                    <p>In progress</p>
                </div>

            </div>

            {/* ai visual section */}
            <div className='w-full flex flex-col gap-5 justify-center items-center'>

                <RiRobot2Line size={38} color='#0B7A60' />

                <h4 className='-mt-2 font-semibold text-[#10A37F]'>
                    AI Interviewer
                </h4>

                <div className='animate-pulse -mt-3 px-6 py-2 w-fit text-sm text-[#0B7A60] border border-[#B7E4D7] bg-[#F4FBF8] rounded-full flex gap-2 justify-center items-center'>
                    <FaEarListen size={16} />
                    Listening...
                </div>
                <div className='animate-pulse -mt-3 px-6 py-2 w-fit text-sm text-[#0B7A60] border border-[#B7E4D7] bg-[#F4FBF8] rounded-full flex gap-2 justify-center items-center'>
                    <RiSpeakAiLine size={16} />
                    Talking...
                </div>

                {/* ai question caption */}
                <h4 className='text-xl font-semibold w-full md:w-100 text-center'>
                    Can you explain the virtual DOM in React and how it improves performance?
                </h4>

            </div>

            {/* user visual section */}
            <div>

                {/* mic */}
                <div className='flex flex-col gap-2 justify-between items-center'>
                    <div className='h-17 w-17 bg-[#0b7a6018] shadow flex justify-center items-center rounded-full'>
                        <button className='h-14 w-14 text-xl text-white bg-[#0B7A60] hover:bg-[#0E8F70] rounded-full flex justify-center items-center cursor-pointer transition duration-200'>
                            <FaMicrophone />
                        </button>
                    </div>

                    <p className='text-sm text-gray-500'>Click to speak</p>
                </div>

            </div>

            {/* user mic health */}
            <MicHealth />

            {/* live transcript section */}
            <Transcript />

        </div>
    )
}

export default InterviewHome
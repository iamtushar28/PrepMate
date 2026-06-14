import React from 'react'
import { FaEarListen, FaMicrophone } from 'react-icons/fa6'
import { GoDotFill } from 'react-icons/go'

type Props = {}

const InterviewHome = (props: Props) => {
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
            <div className='flex flex-col gap-5 justify-center items-center'>

                {/* ai */}
                <div className='h-30 w-30 border border-[#10A37F] rounded-full'></div>

                <h4 className='font-semibold text-[#10A37F]'>
                    AI Interviewer
                </h4>

                <div className='-mt-3 px-6 py-2 w-fit text-sm text-[#0B7A60] border border-[#B7E4D7] bg-[#F4FBF8] rounded-full flex gap-2 justify-center items-center'>
                    <FaEarListen size={16} />
                    Listening...
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
            <div className='w-fit px-3 py-2 bg-white shadow-sm border border-gray-50 rounded-full flex gap-2 justify-center items-center absolute bottom-4 left-4 md:bottom-10 md:left-10'>
                <GoDotFill className='text-[#10A37F] -mr-1' />
                Your Mic
                <div className='flex gap-0.5 items-end justify-center'>
                    <div className='h-1.5 w-1 bg-[#0B7A60] rounded-t-full'></div>
                    <div className='h-2 w-1 bg-[#0b7a60c0] rounded-t-full'></div>
                    <div className='h-3 w-1 bg-[#0b7a609a] rounded-t-full'></div>
                </div>
            </div>

            {/* live transcript section */}
            <div className='hidden md:block w-60 max-h-68 h-auto p-4 bg-white border border-gray-200 shadow-xs absolute bottom-10 right-4 rounded-lg'>

                <h4 className='font-semibold mb-3'>Live Transcript</h4>

                <div className='text-sm flex flex-col gap-3 max-h-50 h-auto overflow-y-auto'>

                    {/* AI */}
                    <div>
                        <p className='font-semibold text-[#0B7A60]'>AI Interviewer</p>
                        <p className='text-gray-600'>
                            Can you explain the virtual DOM in React and how it improves performance?
                        </p>
                    </div>

                    {/* USER */}
                    <div>
                        <p className='font-semibold text-blue-600'>
                            You
                        </p>
                        <p className='text-gray-600'>
                            Sure! The virtual DOM is a lightweight...
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default InterviewHome
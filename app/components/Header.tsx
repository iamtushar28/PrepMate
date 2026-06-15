import React from 'react'
import { BsStars } from 'react-icons/bs'
import { FaMicrophone } from 'react-icons/fa6'
import { LuShieldCheck } from 'react-icons/lu'
import { PiNoteBold } from 'react-icons/pi'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className='flex flex-col gap-5 justify-center items-center relative'>

            {/* brand strip */}
            <div className='px-8 py-2 w-fit text-sm text-[#0B7A60] border border-[#B7E4D7] bg-[#F4FBF8] rounded-full flex gap-2 justify-center items-center'>
                <BsStars />
                <p>AI-Powered Interview Preparation</p>
            </div>

            {/* brand title */}
            <div className='flex flex-col gap-2 items-center'>

                <h2 className='text-4xl md:text-5xl font-semibold text-center'>
                    Your Personal AI Interviewer
                </h2>

                <p className='w-full md:w-132 text-sm md:text-base text-gray-500 text-center'>
                    Paste the job description, upload your resume (optional) and get ready for a personalized, voice-to-voice interview experience.
                </p>

            </div>

            {/* visuals */}
            <div className='hidden md:flex h-10 w-10 rounded-lg text-xl text-[#0B7A60] bg-white shadow-xl border border-gray-50 justify-center items-center absolute bottom-1 -left-24'>
                <PiNoteBold />
            </div>
            <div className='h-8 w-8 md:h-10 md:w-10 rounded-lg text-sm md:text-xl text-[#0B7A60] bg-white shadow md:shadow-xl border border-gray-50 flex justify-center items-center absolute bottom-17 md:bottom-20 left-0 md:-left-36'>
                <FaMicrophone />
            </div>
            <div className='hidden md:flex h-10 w-10 rounded-lg text-xl text-[#0B7A60] bg-white shadow-xl border border-gray-50 justify-center items-center absolute bottom-1 -right-24'>
                <LuShieldCheck />
            </div>
            <div className='h-8 w-8 md:h-10 md:w-10 rounded-lg text-sm md:text-xl text-[#0B7A60] bg-white shadow md:shadow-xl border border-gray-50 flex justify-center items-center absolute bottom-17 md:bottom-20 right-0 md:-right-36'>
                <BsStars />
            </div>

        </div>
    )
}

export default Header
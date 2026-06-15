import React from 'react'
import { BsBarChartFill } from 'react-icons/bs'
import { FaBoltLightning } from 'react-icons/fa6'
import { MdKeyboardVoice } from 'react-icons/md'
import { PiUserFocusFill } from 'react-icons/pi'

type Props = {}

const Features = (props: Props) => {
    return (
        <div className='w-full md:w-[78%] h-auto p-5 bg-white border border-gray-200 rounded-lg flex flex-wrap gap-6 md:gap-0 justify-between items-center'>

            <div className='flex gap-2 items-center'>

                {/* icon */}
                <div className='h-10 w-10 text-xl text-[#0B7A60] bg-gray-100 rounded-full flex justify-center items-center'>
                    <PiUserFocusFill />
                </div>

                <div>
                    <p className='font-semibold'>
                        Personalize
                    </p>
                    <p className='text-sm text-gray-500'>
                        Tailored questions <br /> just for you
                    </p>
                </div>

            </div>

            {/* devider */}
            <div className='hidden md:block h-14 w-px bg-gray-200'></div>

            <div className='flex gap-2 items-center'>

                {/* icon */}
                <div className='h-10 w-10 text-xl text-[#0B7A60] bg-gray-100 rounded-full flex justify-center items-center'>
                    <MdKeyboardVoice />
                </div>

                <div>
                    <p className='font-semibold'>
                        Voice to Voice
                    </p>
                    <p className='text-sm text-gray-500'>
                        Real Conversational <br /> practice
                    </p>
                </div>

            </div>

            {/* devider */}
            <div className='hidden md:block h-14 w-px bg-gray-200'></div>

            <div className='flex gap-2 items-center'>

                {/* icon */}
                <div className='h-10 w-10 text-lg text-[#0B7A60] bg-gray-100 rounded-full flex justify-center items-center'>
                    <BsBarChartFill />
                </div>

                <div>
                    <p className='font-semibold'>
                        Smart Feedback
                    </p>
                    <p className='text-sm text-gray-500'>
                        Get detailed insights <br /> & score
                    </p>
                </div>

            </div>

            {/* devider */}
            <div className='hidden md:block h-14 w-px bg-gray-200'></div>

            <div className='flex gap-2 items-center'>

                {/* icon */}
                <div className='h-10 w-10 text-lg text-[#0B7A60] bg-gray-100 rounded-full flex justify-center items-center'>
                    <FaBoltLightning />
                </div>

                <div>
                    <p className='font-semibold'>
                        Improve Faster
                    </p>
                    <p className='text-sm text-gray-500'>
                        Practice. Analyze. <br /> Improve.
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Features
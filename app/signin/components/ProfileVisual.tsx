import React from 'react'
import { BsBarChartFill } from 'react-icons/bs'
import { FaMicrophone, FaUserLarge } from 'react-icons/fa6'
import { RiUserFill } from 'react-icons/ri'

type Props = {}

const ProfileVisual = (props: Props) => {

    const waveform = [
        3, 5, 8, 12, 18, 14, 8, 5,
        10, 16, 18, 14, 7, 4,
        5, 4, 5, 6,
        10, 18, 26, 16, 8, 5,
        7, 5, 6, 8,
        12, 20, 28, 16, 10, 6,
        5, 7, 10, 8, 5, 3
    ];

    return (
        <div className='w-full flex justify-center relative mt-6 mb-12'>

            {/* profile card */}
            <div className='h-48 w-76 p-4 bg-white rounded-2xl shadow-lg relative'>

                <div className='flex gap-3'>
                    {/* profile icon */}
                    <div className='h-10 w-10 bg-[#0B7A60] rounded-full flex justify-center items-end overflow-hidden'>
                        <RiUserFill color='#ffffff' size={34} className='-mb-1' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='w-28 h-4 bg-gray-100 rounded-full'></div>
                        <div className='w-38 h-3 bg-gray-100 rounded-full'></div>
                        <div className='w-30 h-3 -mt-1 bg-gray-100 rounded-full'></div>
                    </div>

                </div>

                {/* audio wave */}
                <div className='w-full h-20 flex justify-center items-center'>
                    <div className="w-64 h-13 border border-gray-200 rounded-lg flex items-center justify-center gap-1 bg-white">
                        <div className="flex items-center gap-0.75">
                            {waveform.map((height, index) => (
                                <div
                                    key={index}
                                    className="w-0.75 rounded-full bg-[#7CB99A] animate-pulse"
                                    style={{
                                        height: `${height}px`,
                                        animationDelay: `${index * 50}ms`,
                                        animationDuration: "1.5s",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className='absolute bottom-4 left-4 flex flex-col gap-2'>
                    <div className='w-38 h-3 bg-gray-100 rounded-full'></div>
                    <div className='w-30 h-3 -mt-1 bg-gray-100 rounded-full'></div>
                </div>

            </div>

            {/* audio feature card */}
            <div className='hidden md:flex h-12 w-35 text-[#0B7A60] bg-[] border border-[#B7E4D7] bg-white rounded-xl absolute -left-4 bottom-8 items-center shadow-lg'>

                <div className='h-12 w-10 flex justify-center items-center'>
                    <FaMicrophone size={18} />
                </div>

                <p className='text-xs font-semibold'>
                    Realistic Voice <br /> Interview
                </p>

            </div>

            {/* feedback feature card */}
            <div className='h-12 w-35 text-[#0B7A60] bg-[] border border-[#B7E4D7] bg-white rounded-xl absolute -right-3 md:right-2 -top-4 flex items-center shadow-lg'>

                <div className='h-12 w-10 flex justify-center items-center'>
                    <BsBarChartFill size={18} />
                </div>

                <p className='text-xs font-semibold'>
                    Smart Feedback
                </p>

            </div>

            {/* feedback feature card */}
            <div className='h-12 w-35 text-[#0B7A60] bg-[] border border-[#B7E4D7] bg-white rounded-xl absolute -right-3 bottom-3 md:right-2 md:bottom-4 flex items-center shadow-lg'>

                <div className='h-12 w-10 flex justify-center items-center'>
                    <FaUserLarge size={18} />
                </div>

                <p className='text-xs font-semibold'>
                    Personalized <br /> for You
                </p>

            </div>

        </div>
    )
}

export default ProfileVisual
import Link from 'next/link'
import React from 'react'
import { GoDotFill } from 'react-icons/go'
import { IoLogOutOutline } from 'react-icons/io5'

type Props = {}

const InterviewNavbar = (props: Props) => {
    return (
        <nav className='z-40 h-18 w-full px-4 bg-white border-b border-gray-50 shadow-2xs flex justify-between items-center fixed top-0 inset-0'>

            {/* logo */}
            <div className='text-xl md:text-2xl font-semibold flex justify-center items-center'>
                <p>PrepMat</p>
                <p className='text-[#0B7A60] -rotate-12'>e</p>
            </div>

            {/* interview title */}
            <div className='hidden md:flex flex-col items-center'>

                <h4 className='font-semibold'>Software Engineer Interview</h4>

                <div className='text-sm text-gray-500 flex gap-1 items-center'>
                    <GoDotFill className='text-[#10A37F] animate-pulse' />
                    <p>In progress</p>
                </div>

            </div>

            {/* end interview */}
            <Link href={'/'} className='px-4 py-2 text-sm md:text-base text-red-500 hover:bg-red-50 border border-red-200 rounded cursor-pointer transition duration-200 flex gap-2 items-center'>
                End Interview
                <IoLogOutOutline />
            </Link>

        </nav>
    )
}

export default InterviewNavbar
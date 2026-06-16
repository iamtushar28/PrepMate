import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className='z-40 h-18 w-full px-4 bg-white border-b border-gray-50 shadow-2xs flex justify-between items-center fixed top-0 inset-0'>

            {/* logo */}
            <div className='text-xl md:text-2xl font-semibold flex justify-center items-center'>
                <p>PrepMat</p>
                <p className='text-[#0B7A60] -rotate-12'>e</p>
            </div>

            {/* create account section */}
            <div className='flex gap-4'>

                <Link href={'/signin'} className='px-4 py-2 text-sm md:text-base text-white bg-[#0B7A60] hover:bg-[#0E8F70] rounded cursor-pointer transition duration-200 flex gap-2 items-center'>
                    Get Started Free
                    <FaArrowRightLong />
                </Link>

            </div>

        </nav>
    )
}

export default Navbar
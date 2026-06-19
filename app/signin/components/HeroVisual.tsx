import Image from 'next/image'
import React from 'react'
import { BsStars } from 'react-icons/bs'
import ProfileVisual from './ProfileVisual'
import Link from 'next/link'

type Props = {}

const HeroVisual = (props: Props) => {

    return (
        <div className='hidden md:flex w-[50%] h-screen px-6 bg-[#b7e4d728] relative flex-col justify-center items-center'>

            {/* logo */}
            <Link href={'/'} className='text-xl md:text-2xl font-semibold flex justify-center items-center absolute top-8 left-8'>
                <p>PrepMat</p>
                <Image
                    src={'/logo.png'}
                    alt='PrepMate Logo'
                    height={100}
                    width={100}
                    className='h-6 w-6 ml-0.5'
                />
            </Link>

            {/* visual section */}
            <div className='mt-10'>

                {/* brand strip */}
                <div className='mb-6 px-8 py-2 w-fit text-sm text-[#0B7A60] border border-[#B7E4D7] bg-[#f4fbf842] rounded-full flex gap-2 justify-center items-center shadow-sm'>
                    <BsStars />
                    <p>AI-Powered Interview Preparation</p>
                </div>

                <h2 className='mb-2 text-4xl md:text-5xl font-semibold text-start'>
                    Get interview ready
                    <br />
                    with <span className='text-[#0B7A60]'>AI</span> by your side.
                </h2>

                <p className='mb-6 text-gray-500'>
                    Personalized practice. Real conversations.
                    <br />
                    Better results.
                </p>

                {/* profile visual */}
                <ProfileVisual />

            </div>

        </div>
    )
}

export default HeroVisual
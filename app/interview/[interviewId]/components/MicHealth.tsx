import React from 'react'
import { GoDotFill } from 'react-icons/go'

type Props = {}

const MicHealth = (props: Props) => {
    return (
        <div className='w-fit px-3 py-2 bg-white shadow-sm border border-gray-50 rounded-full flex gap-2 justify-center items-center absolute bottom-4 left-4 md:bottom-10 md:left-10'>
            <GoDotFill className='text-[#10A37F] -mr-1' />
            Your Mic
            <div className='flex gap-0.5 items-end justify-center'>
                <div className='h-1.5 w-1 bg-[#0B7A60] rounded-t-full'></div>
                <div className='h-2 w-1 bg-[#0b7a60c0] rounded-t-full'></div>
                <div className='h-3 w-1 bg-[#0b7a609a] rounded-t-full'></div>
            </div>
        </div>
    )
}

export default MicHealth
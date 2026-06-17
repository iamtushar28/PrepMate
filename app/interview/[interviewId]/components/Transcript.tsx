import React from 'react'

type Props = {}

const Transcript = (props: Props) => {
    return (
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
    )
}

export default Transcript
import React from 'react'

export type TranscriptMessage = {
    role: "ai" | "user";
    text: string;
};

type Props = {
    messages: TranscriptMessage[];
}

const Transcript = ({
    messages
}: Props) => {
    return (
        <div className='hidden md:block w-72 max-h-105 p-4 bg-white border border-gray-200 shadow-xs absolute bottom-10 right-4 rounded-lg'>

            <h4 className='font-semibold mb-3'>
                Live Transcript
            </h4>

            <div className='text-sm flex flex-col gap-3 overflow-y-auto max-h-85'>

                {messages.length === 0 && (
                    <p className='text-gray-400'>
                        Transcript will appear here...
                    </p>
                )}

                {messages.map(
                    (message, index) => (
                        <div key={index}>

                            <p
                                className={`font-semibold ${message.role === "ai"
                                        ? "text-[#0B7A60]"
                                        : "text-blue-600"
                                    }`}
                            >
                                {
                                    message.role === "ai"
                                        ? "AI Interviewer"
                                        : "You"
                                }
                            </p>

                            <p className='text-gray-600'>
                                {message.text}
                            </p>

                        </div>
                    )
                )}

            </div>

        </div>
    )
}

export default Transcript
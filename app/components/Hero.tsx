import React from 'react'
import { BsBarChartFill, BsFillLightningChargeFill, BsStars } from 'react-icons/bs'
import { FaArrowRightLong, FaBoltLightning } from 'react-icons/fa6'
import { GoShieldCheck } from 'react-icons/go'
import { MdKeyboardVoice, MdOutlineTipsAndUpdates } from 'react-icons/md'
import { PiUserFocusFill } from 'react-icons/pi'

type Props = {}

const Hero = (props: Props) => {
    return (
        <div className='pt-24 pb-8 px-4 min-h-screen h-auto w-full flex flex-col gap-6 justify-center items-center'>

            {/* heading section */}
            <div className='flex flex-col gap-5 justify-center items-center'>

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

            </div>

            {/* input section */}
            <div className='w-full flex gap-6 flex-col md:flex-row justify-center items-center'>

                {/* job description input box */}
                <div className='w-full md:w-[38%] h-auto p-5 border border-gray-200 bg-white rounded-2xl flex flex-col gap-4 relative shadow-xs'>

                    {/* box header */}
                    <div>

                        <div className='flex gap-2 items-center'>
                            <p className='h-8 w-8 text-white bg-[#0B7A60] rounded-full flex justify-center items-center'>
                                1
                            </p>
                            <h6 className='font-semibold'>
                                Paste Job Description
                            </h6>
                        </div>

                        <p className='mt-1 text-sm text-gray-500'>
                            Add the full job description of the role you are preparing for.
                        </p>

                    </div>

                    {/* sample JD */}
                    <button className='hidden md:block w-fit px-3 py-1 text-xs font-semibold text-[#0B7A60] border border-gray-200 hover:bg-[#F4FBF8] rounded absolute top-4 right-4 cursor-pointer transition duration-200'>
                        Sample JD
                    </button>

                    {/* JD input box */}
                    <textarea
                        name='job_description'
                        rows={6}
                        placeholder='Paste the job description here...'
                        className='w-full p-2 placeholder:text-sm border border-gray-200 rounded-lg outline-none'
                    >

                    </textarea>

                    {/* JD tip box */}
                    <div className='p-2 w-full bg-[#F4FBF8] rounded-lg flex gap-1'>

                        {/* tip icon */}
                        <button className='min-h-6 min-w-10 text-xl text-[#0B7A60] flex justify-center items-center'>
                            <MdOutlineTipsAndUpdates />
                        </button>

                        <p className='text-sm text-gray-500'>
                            <span className='text-[#0B7A60] font-semibold'>Tip:</span>
                            Include responsibilities, required skills, tools and qualifications for better result.
                        </p>

                    </div>

                </div>

                {/* Upload resume input box */}
                <div className='w-full md:w-[38%] h-auto p-5 border border-gray-200 bg-white rounded-2xl flex flex-col gap-4 relative shadow-xs'>

                    {/* box header */}
                    <div>

                        <div className='flex gap-2 items-center'>
                            <p className='h-8 w-8 text-white bg-[#0B7A60] rounded-full flex justify-center items-center'>
                                2
                            </p>
                            <h6 className='font-semibold'>
                                Upload Resume (Optional)
                            </h6>
                        </div>

                        <p className='mt-1 text-sm text-gray-500'>
                            Upload your resume so AI can personalize questions based <br /> on your experience.
                        </p>

                    </div>

                    {/* Resume input box */}
                    <div
                        className='w-full h-35 placeholder:text-sm border border-gray-300 border-dashed rounded-lg flex flex-col gap-2 justify-center items-center'
                    >

                        <h5 className='font-semibold'>Drag & drop your resume here</h5>
                        <p className='text-gray-500'>Or</p>

                        <button className='px-5 py-2 text-sm text-[#0B7A60] font-semibold border border-gray-200 hover:bg-[#F4FBF8] rounded-lg cursor-pointer transition duration-200'>
                            Browse File
                        </button>

                    </div>

                    {/* Resume tip box */}
                    <div className='p-2 w-full bg-[#F4FBF8] rounded-lg flex gap-1'>

                        {/* tip icon */}
                        <button className='min-h-6 min-w-10 text-xl text-[#0B7A60] flex justify-center items-center'>
                            <GoShieldCheck />
                        </button>

                        <p className='text-sm text-gray-500'>
                            <span className='text-[#0B7A60] font-semibold'>
                                Your data is secure
                            </span>
                            <br />
                            We never share your data with anyone.
                        </p>

                    </div>

                </div>

            </div>

            {/* submit button section */}
            <div className='w-full flex flex-col gap-3 justify-center items-center'>

                <div className='flex gap-2 items-center'>
                    <BsFillLightningChargeFill color='#0B7A60' />
                    <p className='text-sm text-gray-500'>
                        Takes less than 30 seconds
                    </p>
                </div>

                <button className='w-[85%] md:w-[32%] py-2 text-white bg-[#0B7A60] hover:bg-[#0E8F70] rounded-lg cursor-pointer transition duration-200 flex gap-4 justify-center items-center shadow'>
                    <BsStars />
                    Create My Interview
                    <FaArrowRightLong />
                </button>

                <div>
                    <p className='text-sm text-gray-500'>
                        No credit card required ● Start for free
                    </p>
                </div>

            </div>

            {/* features section */}
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

        </div>
    )
}

export default Hero
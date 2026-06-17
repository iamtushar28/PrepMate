import Image from 'next/image'
import HeroVisual from './components/HeroVisual'
import { BsStars } from 'react-icons/bs'
import GoogleSigninButton from './components/GoogleSigninButton'

type Props = {}

const page = (props: Props) => {

    return (
        <section className='h-auto min-h-screen bg-[#b7e4d728] md:bg-white px-4 md:px-0 w-full flex'>

            {/* Hero section */}
            <HeroVisual />

            {/* Login section */}
            <div className='w-full md:w-[50%] h-screen flex justify-center items-center'>

                <div className='w-full md:w-[60%] hauto min-h-100 bg-white shadow border border-gray-100 rounded-2xl flex flex-col justify-center items-center'>

                    <Image
                        src={'/logo.png'}
                        alt='PrepMate Logo'
                        height={100}
                        width={100}
                        className='h-12 w-12 mb-7 hidden md:block'
                    />

                    {/* logo */}
                    <div className='md:hidden text-xl font-semibold flex gap-2 justify-center items-center mb-6'>
                        <Image
                            src={'/logo.png'}
                            alt='PrepMate Logo'
                            height={100}
                            width={100}
                            className='h-8 w-8'
                        />
                        <p>PrepMat</p>
                        <p className='text-[#0B7A60] -rotate-12 -ml-2'>e</p>
                    </div>

                    {/* brand strip */}
                    <div className='md:hidden mb-6 px-8 py-2 w-fit text-sm text-[#0B7A60] border border-[#B7E4D7] bg-[#f4fbf842] rounded-full flex gap-2 justify-center items-center shadow-sm'>
                        <BsStars />
                        <p>AI-Powered Interview Preparation</p>
                    </div>

                    <h4 className='text-xl font-semibold mb-2'>Welcome back 👋</h4>
                    <p className='text-gray-500'>Sign in to continue your</p>
                    <p className='text-gray-500 -mt-1 mb-6'>interview preparation journey.</p>

                    {/* devider */}
                    <div className='w-full flex gap-2 items-center justify-center mb-6 -mt-2'>

                        <div className='w-25 h-px bg-gray-200'></div>
                        <p className='text-gray-500'>Sign in with</p>
                        <div className='w-25 h-px bg-gray-200'></div>

                    </div>

                    {/* sign in button */}
                    <GoogleSigninButton />

                </div>

            </div>

        </section>
    )
}

export default page
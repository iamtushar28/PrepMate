"use client"
import { logoutUser } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/authStore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaArrowRightLong } from 'react-icons/fa6'
import ProfileMenu from './ProfileMenu'

type Props = {}

const Navbar = (props: Props) => {

    const router = useRouter();

    const user = useAuthStore(
        (state) => state.user
    );
    const loading = useAuthStore(
        (state) => state.loading
    );

    const handleLogout = async () => {
        await logoutUser();

        router.replace("/");
    };

    return (
        <nav className='z-40 h-18 w-full px-4 bg-white border-b border-gray-50 shadow-2xs flex justify-between items-center fixed top-0 inset-0'>

            {/* logo */}
            <Link href={'/'} className='text-xl md:text-2xl font-semibold flex justify-center items-center'>
                <p>PrepMat</p>
                <Image
                    src={'/logo.png'}
                    alt='PrepMate Logo'
                    height={100}
                    width={100}
                    className='h-6 w-6 ml-0.5'
                />
            </Link>

            {loading ? (
                <div className="h-11 w-44 bg-zinc-200 rounded animate-pulse" />
            ) : user
                ?
                <>
                    <ProfileMenu
                        user={user}
                        onLogout={handleLogout}
                    />
                </>
                :
                <>
                    {/* create account section */}
                    <div className='flex gap-4'>

                        <Link href={'/signin'} className='px-4 py-2 text-sm md:text-base text-white bg-[#0B7A60] hover:bg-[#0E8F70] rounded cursor-pointer transition duration-200 flex gap-2 items-center'>
                            Get Started Free
                            <FaArrowRightLong />
                        </Link>

                    </div>
                </>
            }

        </nav>
    )
}

export default Navbar
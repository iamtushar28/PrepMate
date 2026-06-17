"use client";

import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function GoogleSigninButton() {
    const router = useRouter();

    const handleLogin = async () => {
        const user = await loginWithGoogle();

        if (user) {
            router.push("/");
        }
    };

    return (
        <button
            onClick={handleLogin}
            className="w-[84%] h-11 font-semibold border border-gray-100 bg-white hover:bg-gray-50 shadow rounded-lg flex gap-4 items-center justify-center cursor-pointer transition duration-200"
        >
            <FcGoogle size={23} />
            Continue with Google
        </button>
    );
}
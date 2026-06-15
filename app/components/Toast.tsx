"use client";

import { FaCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { useToastStore } from "@/store/toast-store";

export default function Toast() {
    const { isOpen, message, type } =
        useToastStore();

    return (
        <div
            className={`
                fixed top-22 right-6 z-50

                min-w-72 h-12 px-4

                bg-white
                border border-gray-100
                rounded-lg
                shadow-lg

                flex items-center gap-2

                transition-all duration-300 ease-out

                ${isOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-10 opacity-0 pointer-events-none"
                }
            `}
        >
            {type === "success" ? (
                <FaCircleCheck
                    size={22}
                    color="#0B7A60"
                />
            ) : (
                <MdError
                    size={22}
                    color="#fb2c36"
                />
            )}

            <p className="text-sm font-medium">
                {message}
            </p>
        </div>
    );
}
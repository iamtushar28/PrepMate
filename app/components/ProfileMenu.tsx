"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import type { User } from "@/store/authStore";

interface ProfileMenuProps {
    user: User;
    onLogout: () => void;
}

const ProfileMenu = ({ user, onLogout }: ProfileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="h-10 w-10 border-2 border-[#0B7A60] rounded-full overflow-hidden cursor-pointer"
            >
                {user.photoURL ? (
                    <Image
                        src={user.photoURL}
                        alt={user.name ?? "User Avatar"}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-zinc-100">
                        <span className="text-[#0B7A60] font-semibold">
                            {user.name?.charAt(0).toUpperCase() ?? "U"}
                        </span>
                    </div>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-14 right-0 w-72 p-3 bg-white shadow-lg border border-zinc-200 rounded-xl z-50">
                    <div className="flex items-center gap-2">
                        <FaRegUserCircle color="#0B7A60" size={22} />

                        <div className="flex flex-col overflow-hidden">
                            <p className="font-semibold truncate">
                                {user.name ?? "User"}
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-zinc-200 my-3" />

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onLogout();
                        }}
                        className="w-full px-3 py-2 text-left rounded-lg hover:bg-zinc-100 transition duration-200 cursor-pointer"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
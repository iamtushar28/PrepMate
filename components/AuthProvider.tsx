"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setUser, setLoading } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (firebaseUser) => {
                if (firebaseUser) {
                    setUser({
                        uid: firebaseUser.uid,
                        name: firebaseUser.displayName,
                        email: firebaseUser.email,
                        photoURL: firebaseUser.photoURL,
                    });
                } else {
                    setUser(null);
                }

                setLoading(false);
            }
        );

        return unsubscribe;
    }, [setUser, setLoading]);

    return <>{children}</>;
}
import { create } from "zustand";

type ToastType = "success" | "error";

interface ToastState {
    isOpen: boolean;
    message: string;
    type: ToastType;

    showToast: (
        message: string,
        type: ToastType
    ) => void;
}

let timer: NodeJS.Timeout;

export const useToastStore =
    create<ToastState>((set) => ({
        isOpen: false,
        message: "",
        type: "success",

        showToast: (message, type) => {
            clearTimeout(timer);

            set({
                isOpen: true,
                message,
                type,
            });

            timer = setTimeout(() => {
                set({
                    isOpen: false,
                });
            }, 5000);
        },
    }));
import { create } from "zustand";

type Login = {
    isLoggedIn: boolean;
    login(): void;
    logout(): void;
}

export const useLoginStore = create<Login>(set => ({
    isLoggedIn: false,
    login: () => set(() => ({isLoggedIn: true})),
    logout: () => set(() => ({isLoggedIn: false})),
}))
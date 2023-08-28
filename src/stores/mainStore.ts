import { create } from 'zustand';

// Keeps track of parknest states
interface State {
    userType: string,
    operation: string,
    rememberMe: boolean,
    method: string,
    currentPage: string,
    updateUserType: (userType: string) => void
    updateOperation: (operation: string) => void,
    updateRememberMe: (rememberMe: boolean) => void,
    updateCurrentPage: (updateCurrentPage: string) => void,
    updateMethod: (method: string) => void,
}

// Creating store
export const useParknestStore = create<State>((set) => ({
    userType: 'po',
    operation: 'signin',
    rememberMe: false,
    method: 'email',
    currentPage: 'dashboard',
    updateUserType: (userType) => set((state) => ({ userType: userType })),
    updateOperation: (operation) => set((state) => ({ operation: operation })),
    updateRememberMe: (rememberMe) => set((state) => ({ rememberMe: rememberMe })),
    updateCurrentPage: (currentPage) => set((state) => ({ currentPage: currentPage })),
    updateMethod: (method) => set((state) => ({ method: method })),
}))
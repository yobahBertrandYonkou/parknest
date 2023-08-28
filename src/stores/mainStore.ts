import { create } from 'zustand';

// Keeps track of parknest states
interface State {
    userType: string,
    operation: string,
    rememberMe: boolean,
    method: string,
    updateUserType: (userType: string) => void
    updateOperation: (operation: string) => void,
    updateRememberMe: (rememberMe: boolean) => void,
    updateMethod: (method: string) => void,
}

// Creating store
export const useParknestStore = create<State>((set) => ({
    userType: 'po',
    operation: 'signin',
    rememberMe: false,
    method: 'email',
    updateUserType: (userType) => set((state) => ({ userType: userType })),
    updateOperation: (operation) => set((state) => ({ operation: operation })),
    updateRememberMe: (rememberMe) => set((state) => ({ rememberMe: rememberMe })),
    updateMethod: (method) => set((state) => ({ method: method })),
}))
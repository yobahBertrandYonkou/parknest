'use client';

import { useParknestStore } from "@/stores/mainStore";
import signCSS from "../sign.module.css";
import { useEffect } from "react";

export default function SignInPage(){
    // Park nest store
    const store = useParknestStore();
    
    useEffect(() => {
        // setting operation to sign in
        store.updateOperation('signin');
    }, []);

    return(
        <>
            <div className={ signCSS.button } onClick={() => {
                // updating auth method
                store.updateMethod('email');

                // redirecting
            }}>Sign in</div>

            {/* Sign in with google */}
            <div className={ signCSS.google } onClick={() => store.updateMethod('google')}>Sign in with Google</div>

            {/* Don't have an account */}
            <div className={ signCSS.noaccount }>Don't have an account? <a href="/auth/signup" className={ signCSS.signup }>Sign up</a></div>
        </>
    )
}
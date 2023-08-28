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
                if (store.userType == 'po'){
                    var path:string = '/user/po/dashboard';
                    store.updateCurrentPage('po-dashboard');
                }else{
                    var path:string = '/user/co/plots';
                    store.updateCurrentPage('co-plots');
                }

                // saving state to localStorage
                localStorage.setItem('useParknestStore', JSON.stringify(store))
                window.location.assign(path);
            }}>Sign in</div>

            {/* Sign in with google */}
            <div className={ signCSS.google } onClick={() => store.updateMethod('google')}>Sign in with Google</div>

            {/* Don't have an account */}
            <div className={ signCSS.noaccount }>Don't have an account? <a href="/auth/signup" className={ signCSS.signup }>Sign up</a></div>
        </>
    )
}
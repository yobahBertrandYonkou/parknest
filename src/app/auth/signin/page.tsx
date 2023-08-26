import signCSS from "../sign.module.css";

export default function SignInPage(){
    return(
        <>
            <div className={ signCSS.button }>Sign in</div>

            {/* Sign in with google */}
            <div className={ signCSS.google }>Sign in with Google</div>

            {/* Don't have an account */}
            <div className={ signCSS.noaccount }>Don't have an account? <a href="/auth/signup" className={ signCSS.signup }>Sign up</a></div>
        </>
    )
}
import signCSS from "../sign.module.css";

export default function SignUpPage(){
    return(
        <>
            <div className={ signCSS.button }>Sign up</div>

            {/* Sign in with google */}
            <div className={ signCSS.google }>Sign in with Google</div>

            {/* Don't have an account */}
            <div className={ signCSS.noaccount }>Already have an account? <span className={ signCSS.signup }>Sign in</span></div>
        </>
    )
}
"use client";

import { useParknestStore } from "@/stores/mainStore";
import signCSS from "../sign.module.css";
import { useEffect } from "react";

export default function SignUpPage() {
  // Park nest store
  const store = useParknestStore();

  useEffect(() => {
    // setting operation to sign in
    store.updateOperation("signup");
  }, []);

  return (
    <>
      <div
        className={signCSS.button}
        onClick={() => {
          // updating auth method
          store.updateMethod("email");

          // redirecting
          if (store.userType == "po") {
            var path: string = "/user/po/dashboard";
          } else {
            var path: string = "/user/co/plots";
          }

          window.location.assign(path);
        }}
      >
        Sign up
      </div>

      {/* Sign in with google */}
      <div
        className={signCSS.google}
        onClick={() => store.updateMethod("google")}
      >
        Sign up with Google
      </div>

      {/* Don't have an account */}
      <div className={signCSS.noaccount}>
        Already have an account?{" "}
        <a href="/auth/signin" className={signCSS.signup}>
          Sign in
        </a>
      </div>
    </>
  );
}

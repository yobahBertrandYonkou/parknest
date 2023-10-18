"use client";

import { useParknestStore } from "@/stores/mainStore";
import signCSS from "../sign.module.css";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  // Park nest store
  const store = useParknestStore();

  // handles errors
  const [error, setError] = useState("");

  useEffect(() => {
    // setting operation to sign in
    store.updateOperation("signup");
  }, []);

  return (
    <>
      <div
        className={signCSS.button}
        onClick={async () => {
          // updating auth method
          store.updateMethod("email");

          // reading email and password value
          let email = (
            document.getElementById("email") as HTMLInputElement
          ).value.trim();
          let password = (
            document.getElementById("password") as HTMLInputElement
          ).value.trim();

          // Validation
          if (email === "" || password === "") {
            console.log("email and password required");
            setError('Email and password required');
          } else {
            // setting error to ""
            setError("");

            // Authenticating user
            await fetch("/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email.trim(),
                password: password.trim(),
                userType: store.userType,
                method: 'signup'
              }),
            })
              .then((response) => response.json())
              .then((response) => {
                
                if (response.status === "failed") {
                  setError(response.message);
                } else {
                  setError("");

                  // redirect user
                  // redirecting
                  if (store.userType == "po") {
                    var path: string = "/user/po/dashboard";
                  } else {
                    var path: string = "/user/co/plots?id";
                  }

                  // saving state to localStorage
                  localStorage.setItem(
                    "useParknestStore",
                    JSON.stringify({...store, userId: response.insertedId})
                  );
                  window.location.assign(path);
                }
              })
              .catch((error) => console.log(error));
          }
        }}
      >
        Sign up
      </div>
      { error != "" && <div style={{position: 'absolute', top: "200px", width: '360px'}} className="alert alert-danger alert-dismissible fade show small" role="alert">
        { error }
        <button type="button" className="btn-close" data-bs-dismiss='alert' aria-label="Close" onClick={() => setError("")}></button>
      </div>}
      {/* Sign in with google */}
      <div
        className={signCSS.google}
        onClick={() => {
          store.updateMethod("google");
          signIn();
        }}
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

"use client";

import { useParknestStore } from "@/stores/mainStore";
import signCSS from "../sign.module.css";
import { useEffect, useState } from "react";

export default function SignInPage() {
  // Park nest store
  const store = useParknestStore();

  // handles errors
  const [error, setError] = useState("");

  useEffect(() => {
    // setting operation to sign in
    store.updateOperation("signin");
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
            setError("Email and password required");
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
                email: email,
                password: password,
                userType: store.userType,
                method: 'signin'
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
                    var path: string = "/user/co/plots";
                  }

                  // saving state to localStorage
                  localStorage.setItem(
                    "useParknestStore",
                    JSON.stringify({...store, userId: response._id, email: response.email})
                  );
                  window.location.assign(path);
                }
              })
              .catch((error) => console.log(error));
          }
        }}
      >
        Sign in
      </div>

      {error != "" && (
        <div
          style={{ position: "absolute", top: "200px", width: "360px" }}
          className="alert alert-danger alert-dismissible fade show small"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}

      {/* Sign in with google */}
      <div
        className={signCSS.google}
        onClick={() => store.updateMethod("google")}
      >
        Sign in with Google
      </div>

      {/* Don't have an account */}
      <div className={signCSS.noaccount}>
        Don't have an account?{" "}
        <a href="/auth/signup" className={signCSS.signup}>
          Sign up
        </a>
      </div>
    </>
  );
}

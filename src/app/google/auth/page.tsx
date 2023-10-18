"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function GoogleAuthRedirect() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      // Save user details
      // Authenticating user
      fetch("/api/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email?.trim(),
          userType: localStorage.getItem(
            "parkNestGoogleLoginUserType"
          ) as string,
          method: "google",
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          // redirecting
          if (
            (localStorage.getItem("parkNestGoogleLoginUserType") as string) ===
            "po"
          ) {
            var path: string = "/user/po/dashboard";
          } else {
            var path: string = "/user/co/plots?id";
          }

          // saving state to localStorage
          localStorage.setItem(
            "useParknestStore",
            JSON.stringify({
              email: session.user?.email,
              userType: localStorage.getItem("parkNestGoogleLoginUserType") as string,
              userId:
                response.data.insertedId === undefined
                  ? response.data._id
                  : response.data.insertedId,
            })
          );
          window.location.replace(path);
        })
        .catch((error) => console.log(error));
    }
  });
  return (
    <>
      <div style={{ padding: "20px" }} className="small">
        {session?.user
          ? `Signing user in... ${session?.user?.name}`
          : "Logging user out..."}
        <br />
      </div>
    </>
  );
}

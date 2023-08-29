'use client';

import { useEffect } from "react";
import authCSS from "./layout.module.css";
import { useParknestStore } from "@/stores/mainStore";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // Park nest store
  const store = useParknestStore();

  return (
    <div>
      {/* Back to home */}
      <a href="/" className={authCSS.backToHome}>
      <i className="fa-solid fa-arrow-left"></i> Back to home
      </a>
      <div className={authCSS.container}>
        <div className={authCSS.card}>
          {/* Plot owner and car owner */}
          <div className={authCSS.user}>
            <div className={`${authCSS.plot} ${ store.userType == 'po' ? authCSS.selectedUser : ''}`} onClick={() => store.updateUserType('po')}>Plot Owner</div>
            <div className={`${authCSS.car} ${ store.userType == 'co' ? authCSS.selectedUser : ''}`} onClick={() => store.updateUserType('co')}>Car Owner</div>
          </div>

          {/* Input row starts */}
          <div>
            <div className={authCSS.label}>Email</div>
            <input
              className={authCSS.input}
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <div className={authCSS.label}>Password</div>
            <input
              className={authCSS.input}
              type="password"
              placeholder="Password"
            />
          </div>

          {/* Remeber me and forgot password row */}
          <div className={authCSS.middle}>
            <div className={authCSS.remember}>
              <input
                id="rememberMe"
                className={authCSS.rememberCheckBox}
                type="checkbox"
                onChange={(status) => {store.updateRememberMe(status.target.checked)}}
              />
              <label className={authCSS.rememberLabel} htmlFor="rememberMe">
                &nbsp;Remember me
              </label>
            </div>

            <div className={authCSS.forgot}>Forgot password</div>
          </div>

          {/* Thos will be passed based on whether the sign in or sign up routes have been chosen */}
          {children}
        </div>
      </div>
    </div>
  );
}

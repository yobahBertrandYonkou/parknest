import authCSS from "./layout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={authCSS.container}>
        <div className={authCSS.card}>
          {/* Plot owner and car owner */}
          <div className={authCSS.user}>
            <div className={authCSS.plot}>Plot Owner</div>
            <div className={authCSS.car}>Car Owner</div>
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
              />
              <label className={authCSS.rememberLabel} htmlFor="rememberMe">
                Remember me
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

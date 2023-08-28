'use client';

import { useEffect, useState } from 'react';
import notLoggedInCSS from './not-logged-in.module.css';

export default function NotLoggedInPopup(){
    const [pathname, setPathname] = useState('');

    useEffect(() => setPathname(window.location.pathname));
    
    return(
        <>
        <div className={notLoggedInCSS.transparentBg}>
          <div className={notLoggedInCSS.signinContainer}>
            <div className="container-fluid">
              <div className="row">
                {/* Title bar */}
                <div className={`col-12 ${notLoggedInCSS.titleBar}`}>
                  <div>
                    <b>Sign in required!</b>
                  </div>
                </div>
                <hr />

                {/* Middle section */}
                <div className={notLoggedInCSS.warningText}>
                  The requested page {pathname} can only be accessed by authorized persons. Sign in to gain access to the page.
                </div>
                {/* Action buttons */}
                <div className={notLoggedInCSS.action}>
                  <div className={notLoggedInCSS.home} onClick={() => window.location.assign('/')}>
                    Go to home
                  </div>
                  <div className={notLoggedInCSS.signin} onClick={() => window.location.assign('/auth/signin')}>Sign in</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    );
}
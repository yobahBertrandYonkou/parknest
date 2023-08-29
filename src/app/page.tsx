import homeCSS from './home.module.css';

export default function HomePage(){
    return(
        <>
            <body style={{backgroundColor: '#F8F0FF'}}>
                <div className={homeCSS.mainContainer}>
                {/* top nav */}
                <div className={homeCSS.topNav}>
                    {/* Logo */}
                    <div className={homeCSS.logo}>
                        <div className={homeCSS.logoPhotoContainer}>
                            <img className={homeCSS.logoPhoto} src="/images/logo.png" alt="logo" />
                        </div>
                        <div className={homeCSS.logoText}>ParkNest</div>
                    </div>

                    {/* Navigation options */}
                    <div className={homeCSS.navOptions}>
                        <div className={`${homeCSS.home} ${homeCSS.navOption}`}>Home</div>
                        <div className={`${homeCSS.login} ${homeCSS.navOption}`}>Login</div>
                        <div className={`${homeCSS.help} ${homeCSS.navOption}`}>Help</div>
                        <div className={`${homeCSS.aboutus} ${homeCSS.navOption}`}>About us</div>
                    </div>
                </div>

                {/* body section */}
                <div className={`${homeCSS.topPage} container-fluid`}>
                    <div className="row">
                        {/* Left section */}
                        <div className={`${homeCSS.homeText} col-lg-6`}>
                            <div className={homeCSS.pageText}>
                                A parking space is a terrible thing to waste.
                            </div>

                            {/* Get started btn */}
                            <div className={homeCSS.getStartedBtn}>Get started</div>
                        </div>
                        <div className="col-lg-6">
                            <img className={homeCSS.pageImage} src="/images/bg.png" alt="bg" />
                        </div>
                    </div>
                </div>
            </div>
            </body>
        </>
    )
}
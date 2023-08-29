"use client";

import homeCSS from "./home.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function HomePage() {
  return (
    <>
      <body style={{ backgroundColor: "#F8F0FF" }}>
        <div className={homeCSS.mainContainer}>
          {/* top nav */}
          <div className={homeCSS.topNav}>
            {/* Logo */}
            <div className={homeCSS.logo}>
              <div className={homeCSS.logoPhotoContainer}>
                <img
                  className={homeCSS.logoPhoto}
                  src="/images/logo.png"
                  alt="logo"
                />
              </div>
              <div className={homeCSS.logoText}>ParkNest</div>
            </div>

            {/* Navigation options */}
            <div className={homeCSS.navOptions}>
              <div className={`${homeCSS.home} ${homeCSS.navOption}`}>Home</div>
              <div
                className={`${homeCSS.login} ${homeCSS.navOption}`}
                onClick={() => {
                  window.location.assign("/auth/signin");
                }}
              >
                Login
              </div>
              <div className={`${homeCSS.help} ${homeCSS.navOption}`}>Help</div>
              <div className={`${homeCSS.aboutus} ${homeCSS.navOption}`}>
                About us
              </div>
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
                <div
                  className={homeCSS.getStartedBtn}
                  onClick={() => {
                    window.location.assign("/auth/signup");
                  }}
                >
                  Get started
                </div>
              </div>

              {/* Image */}
              <div className="col-lg-6">
                <img
                  className={homeCSS.pageImage}
                  src="/images/bg.png"
                  alt="bg"
                />
              </div>

              <div style={{ height: "100px" }}></div>

              {/* Our trusted partners */}
              <div className={`${homeCSS.trustedPartners} col-lg-12`}>
                <div className={homeCSS.tpTitle}>Trusted Partners</div>
                <div className={homeCSS.tpCards}>
                  <Carousel
                    swipeable={true}
                    draggable={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={2000}
                    responsive={{
                        desktop: {
                          breakpoint: { max: 3000, min: 1024 },
                          items: 6,
                        },
                        tablet: {
                          breakpoint: { max: 1024, min: 464 },
                          items: 6,
                        },
                        mobile: {
                          breakpoint: { max: 464, min: 0 },
                          items: 1,
                        }
                      }}
                  >
                    {[
                      {
                        key: 1,
                        src: "https://farm3.staticflickr.com/2220/1572613671_7311098b76_z_d.jpg",
                        width: 800,
                        height: 600,
                      },
                      
                      {
                        key: 3,
                        src: "https://farm7.staticflickr.com/6089/6115759179_86316c08ff_z_d.jpg",
                        width: 800,
                        height: 600,
                      },
                      {
                        key: 4,
                        src: "https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg",
                        width: 800,
                        height: 600,
                      },
                      {
                        key: 5,
                        src: "https://farm2.staticflickr.com/1449/24800673529_64272a66ec_z_d.jpg",
                        width: 800,
                        height: 600,
                      },
                      {
                        key: 6,
                        src: "https://farm4.staticflickr.com/3752/9684880330_9b4698f7cb_z_d.jpg",
                        width: 800,
                        height: 600,
                      },
                    ].map((image) => {
                      return (
                        <div key={image.key}>
                          <img className={homeCSS.tpPhotos} src={image.src} alt={image.src} />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

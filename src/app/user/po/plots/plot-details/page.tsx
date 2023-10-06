"use client";

import plotDetailsCSS from "./plot-details.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import Checkout from "./checkout/checkout";

export default function PlotDetails() {
  // Controls the visibility of the checkout page
  let [showCheckout, setShowCheckout] = useState(false);
  let [data, setData] = useState(null);
  let [userType, setUser] = useState(null);

  useEffect(() => {
    // setting user
    setUser(JSON.parse(localStorage.getItem('useParknestStore') as string).userType)
    // getting plot id from url
    let plotId = new URL(window.location.href).searchParams.get("plotId");

    // fetch plot details
    fetch("/api/plots/plot-details?plotId=" + plotId)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .then((error) => console.log(error));
  }, []);

  return (
    <>
      {data != null && (
        <div className={plotDetailsCSS.mainContainer}>
          {/* Checkout popup */}
          {showCheckout && <Checkout changeVisibility={setShowCheckout} />}

          {/* First row */}
          {userType === 'co' && <div className={plotDetailsCSS.firstRow}>
            <div>Plot Details</div>
            <div
              className={plotDetailsCSS.bookBtn}
              onClick={() => setShowCheckout(true)}
            >
              Book now
            </div>
          </div>
}
          {/* Plot details */}
          <div className={plotDetailsCSS.plotDetails}>
            <div className={plotDetailsCSS.plotName}>{data["plot_name"]}</div>
            <div className={plotDetailsCSS.row}>
              <div className={plotDetailsCSS.location}>
                {data["plot_location"]["full_address"]}
              </div>
              <div className={plotDetailsCSS.price}>
                ₹{data["price"]} per hour
              </div>
            </div>

            {/* Photo carousel */}
            <div className={plotDetailsCSS.photoCarouselContainer}>
              <Carousel
                showArrows={true}
                autoPlay={true}
                interval={5}
                showThumbs={false}
              >
                {/* <Carousel showArrows={true} > */}
                

                {(data["photos"] as string[]).map((photo) => {
                  return (
                    <div key={photo} className={plotDetailsCSS.imageContainer}>
                      <img
                        className={plotDetailsCSS.images}
                        src={photo}
                        alt={photo}
                      />
                    </div>
                  );
                })}
                
              </Carousel>
            </div>
            {/* Plot description */}
            <div className={plotDetailsCSS.description}>
              <div className={plotDetailsCSS.descriptionTitle}>
                Plot description
              </div>
              <div className={plotDetailsCSS.descriptionText}>
                {data["description"]}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

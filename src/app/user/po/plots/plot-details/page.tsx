"use client";

import plotDetailsCSS from "./plot-details.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import TimeField from "react-simple-timefield";
import checkoutCSS from "./checkout.module.css";

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
          {showCheckout && 
            <form className={checkoutCSS.mainContainer}>
            <div className={checkoutCSS.checkoutContainer}>
              <div className="container-fluid">
                <div className="row">
                  {/* Title bar */}
                  <div className={`col-12 ${checkoutCSS.titleBar}`}>
                    <div><b>Checkout</b></div>
                    <div>Total price</div>
                  </div>
                  <hr />
    
                  {/* Middle section */}
                  <div className={`col-12 ${checkoutCSS.content}`}>
                    <div>Destination</div>
                    <div>Plot location</div>
                  </div>
    
                  {/* Input fields */}
    
                  <div className="col-6">
                  <label htmlFor="" className="form-label small">Parking duration</label>
                    <select className="form-select">
                      <option value="">1 hour</option>
                      <option value="">1 hour</option>
                      <option value="">1 hour</option>
                      <option value="">1 hour</option>
                    </select>
                  </div>
                  <div className="col-6">
                  <label htmlFor="" className="form-label small">Number of slots</label>
                    <select className="form-select">
                      <option value="">2 slots</option>
                      <option value="">2 slots</option>
                      <option value="">2 slots</option>
                      <option value="">2 slots</option>
                    </select>
                  </div>
                  <div style={{ marginTop: '15px'}} className="col-12">
                    <label htmlFor="" className="form-label small">Time of arrival</label>
                    <TimeField
                      className="form-control"
                      style={{
                        width: "100%",
                      }}
                      showSeconds
                    />
                  </div>
    
                  {/* Action buttons */}
                  <div className={checkoutCSS.action}>
                    <div className={checkoutCSS.cancel} onClick={ () => {
                      setShowCheckout(false);
                    }}>Cancel</div>
                    <div className={checkoutCSS.pay}>Pay</div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          }

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

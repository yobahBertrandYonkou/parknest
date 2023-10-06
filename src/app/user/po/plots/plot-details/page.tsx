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
  let [timeOfArrival, setTimeOfArrival] = useState(null);
  let [parkingDuration, setParkingDuration] = useState(1);
  let [numberOfSlots, setNumberOfSlots] = useState(1);
  let [destination, setDestination] = useState<Object | null>(null);

  useEffect(() => {
    // setting user
    setUser(JSON.parse(localStorage.getItem('useParknestStore') as string).userType)
    // getting plot id from url
    let plotId = new URL(window.location.href).searchParams.get("plotId");
    setDestination(JSON.parse(new URL(window.location.href).searchParams.get("location") as string) as Object);

    // fetch plot details
    fetch("/api/plots/plot-details?plotId=" + plotId)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .then((error) => console.log(error));
  }, []);

  let range = (start: number = 1, end: number) => {
    let index = start;
    let values: number[] = [];
    for (index; index <= end; index++) values.push(index);
    return values;
  }

  return (
    <>
      {data !== null && (
        <div className={plotDetailsCSS.mainContainer}>
          {/* Checkout popup */}
          {showCheckout && 
            <form className={checkoutCSS.mainContainer} onSubmit={(event) => {

              if (timeOfArrival === "00:00:00"){
                alert("Time of arirval is required!");
                event.preventDefault();
                return;
              }

              event.preventDefault();
      
              // getting data from form
              let formData = new FormData(event.target as HTMLFormElement);

              // adding time
              formData.append('time_of_arrival', timeOfArrival as unknown as string)
      
              // make payments
              
              fetch("/api/plots/booking", {
                method: "POST",
                // headers: { 'Content-Type': 'multipart/form-data' },
                body: formData,
              })
                .then((response) => response.json())
                .then((response) => {
                  console.log(response);
                  
                })
                .catch((error) => console.log(error));
            }}>
            <div className={checkoutCSS.checkoutContainer}>
              <div className="container-fluid">
                <div className="row">
                  {/* Title bar */}
                  <div className={`col-12 ${checkoutCSS.titleBar}`}>
                    <div><b>Checkout</b></div>
                    <div className="small"><b>Total price:</b> ₹{numberOfSlots * parkingDuration * parseFloat(data.price)}</div>
                  </div>
                  <hr />
    
                  {/* Middle section */}
                  <div className={`col-12 ${checkoutCSS.content}`}>
                    <div className="small"><b>Destination:</b> {destination.name}</div>
                    <div className="small"><b>Plot location:</b> {data.plot_location.full_address}</div>
                  </div>
    
                  {/* Input fields */}
    
                  <div className="col-6">
                  <label htmlFor="" className="form-label small">Parking duration</label>
                    <select name="duration" defaultValue={parkingDuration} className="form-select" onChange={() => setParkingDuration(parseInt(event?.target.value))}>
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="5">5 hours</option>
                    </select>
                  </div>
                  <div className="col-6">
                  <label htmlFor="" className="form-label small">Number of slots</label>
                    <select name="number_of_spots" defaultValue={numberOfSlots} className="form-select" onChange={() => setNumberOfSlots(parseInt(event?.target.value))}>
                      {
                         range(1, data.capacity).map( index => {
                          return (<option key={index} value={index}>{index} slots</option>)
                         })
                      }
                    </select>
                  </div>
                  <div style={{ marginTop: '15px'}} className="col-12">
                    <label htmlFor="" className="form-label small">Time of arrival (24 hours)</label>
                    <TimeField
                      className="form-control"
                      style={{
                        width: "100%",
                      }}
                      onChange={(value) => setTimeOfArrival(value.target.value.trim())}
                      showSeconds
                      required
                    />
                  </div>
    
                  {/* Action buttons */}
                  <div className={checkoutCSS.action}>
                    <div className={checkoutCSS.cancel} onClick={ () => {
                      setShowCheckout(false);
                    }}>Cancel</div>
                    <input type="submit" className={checkoutCSS.pay} value={"Pay"}/>
                  </div>
                </div>
              </div>
            </div>
          </form>
          }

          {/* First row */}
          {userType === 'co' && destination !== null && <div className={plotDetailsCSS.firstRow}>
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

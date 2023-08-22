'use client';

import TimeField from "react-simple-timefield";
import checkoutCSS from "./checkout.module.css";
import { Dispatch, SetStateAction } from "react";

export default function Checkout() {
  return (
    <>
      <div className={checkoutCSS.mainContainer}>
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
                }}>Cancel</div>
                <div className={checkoutCSS.pay}>Pay</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

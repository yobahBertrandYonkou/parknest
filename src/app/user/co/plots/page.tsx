"use client";
import plotCSS from "./plots.co.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZGV2ZWxvcGVyLWJtYmNvcnAiLCJhIjoiY2xscnRkMjg4MHZ3czNkdGhvZWZ2Z3FmdyJ9.08SvDDYJ4oInBba-ClOtAQ";

export default function COPlotsPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [latitude, setLatitude] = useState(77.4661303);
  const [longitude, setLongitude] = useState(12.9539456);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [latitude, longitude],
      zoom: zoom,
    });
  });

  return (
    <>
      {/* Top bar */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className={plotCSS.actionBar}>
              <div className={plotCSS.searchContainer}>
                <div className={plotCSS.searchIcon}>
                  <div>
                    <i className={`fa-solid fa-magnifying-glass`}></i>
                  </div>
                </div>
                <input
                  className={plotCSS.search}
                  type="search"
                  placeholder="Enter destination"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map and history row */}
      <div className="container-fluid">
        <div className="row">
          {/* Google map */}
          <div className="col-lg-8">
            <div
              ref={mapContainer}
              className={`${plotCSS.googleMap} ${plotCSS.contentContainer}`}
            ></div>
          </div>
          {/* History */}
          <div className="col-lg-4">
            <div className={`${plotCSS.history} ${plotCSS.contentContainer}`}>
              <div className={plotCSS.historyMainTitle}>History</div>

              {/* History list */}
              <div className={plotCSS.historyContent}>

                {/* History item */}
                <div className={plotCSS.historyContainer}>
                  <div className={plotCSS.historyPhoto}></div>
                  <div className={plotCSS.historyText}>
                    <div className={plotCSS.historyTitle}>Destination</div>
                    <div className={plotCSS.historySubTitle}>
                      Parking location
                    </div>
                  </div>
                  <div className={plotCSS.historyIcon}>
                    <i className="fa-solid fa-location-dot fa-lg"></i>
                  </div>
                </div>

                 {/* History item */}
                 <div className={plotCSS.historyContainer}>
                  <div className={plotCSS.historyPhoto}></div>
                  <div className={plotCSS.historyText}>
                    <div className={plotCSS.historyTitle}>Destination</div>
                    <div className={plotCSS.historySubTitle}>
                      Parking location
                    </div>
                  </div>
                  <div className={plotCSS.historyIcon}>
                    <i className="fa-solid fa-location-dot fa-lg"></i>
                  </div>
                </div>
                 {/* History item */}
                 <div className={plotCSS.historyContainer}>
                  <div className={plotCSS.historyPhoto}></div>
                  <div className={plotCSS.historyText}>
                    <div className={plotCSS.historyTitle}>Destination</div>
                    <div className={plotCSS.historySubTitle}>
                      Parking location
                    </div>
                  </div>
                  <div className={plotCSS.historyIcon}>
                    <i className="fa-solid fa-location-dot fa-lg"></i>
                  </div>
                </div>
                 {/* History item */}
                 <div className={plotCSS.historyContainer}>
                  <div className={plotCSS.historyPhoto}></div>
                  <div className={plotCSS.historyText}>
                    <div className={plotCSS.historyTitle}>Destination</div>
                    <div className={plotCSS.historySubTitle}>
                      Parking location
                    </div>
                  </div>
                  <div className={plotCSS.historyIcon}>
                    <i className="fa-solid fa-location-dot fa-lg"></i>
                  </div>
                </div>
                 {/* History item */}
                 <div className={plotCSS.historyContainer}>
                  <div className={plotCSS.historyPhoto}></div>
                  <div className={plotCSS.historyText}>
                    <div className={plotCSS.historyTitle}>Destination</div>
                    <div className={plotCSS.historySubTitle}>
                      Parking location
                    </div>
                  </div>
                  <div className={plotCSS.historyIcon}>
                    <i className="fa-solid fa-location-dot fa-lg"></i>
                  </div>
                </div>
                 {/* History item */}
                 <div className={plotCSS.historyContainer}>
                  <div className={plotCSS.historyPhoto}></div>
                  <div className={plotCSS.historyText}>
                    <div className={plotCSS.historyTitle}>Destination</div>
                    <div className={plotCSS.historySubTitle}>
                      Parking location
                    </div>
                  </div>
                  <div className={plotCSS.historyIcon}>
                    <i className="fa-solid fa-location-dot fa-lg"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${plotCSS.plotCSS} col-12 container-fluid`}>
            <div className="row">
              {/* Plot card */}
              <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

              {/* Plot card */}
              <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/* Plot card */}
              <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/* Plot card */}
              <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/* Plot card */}
              <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/* Plot card */}
              <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/* Plot card */}
              <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/* Plot card */}
              <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

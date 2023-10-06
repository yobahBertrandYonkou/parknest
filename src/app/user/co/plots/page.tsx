"use client";
import plotCSS from "./plots.co.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZGV2ZWxvcGVyLWJtYmNvcnAiLCJhIjoiY2xscnRkMjg4MHZ3czNkdGhvZWZ2Z3FmdyJ9.08SvDDYJ4oInBba-ClOtAQ";

export default function COPlotsPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [latitude, setLatitude] = useState(77.4661303);
  const [longitude, setLongitude] = useState(12.9539456);
  const [zoom, setZoom] = useState(11);
  const [mapObj, setMap] = useState<mapboxgl.Map | null>();
  const [data, setData] = useState<Array<Object[]> | null>(null);
  const [locationObj, setLocationObj] = useState<Object | null>(null);

  // Adds ellipse to end of text
  let addEllipsis = (text: string, length: number = 70) => {
    if(text.length > length){
      return text.slice(0, 67) + '...';
    }
    return text;
  }

  useEffect(() => {
    // Fetching plots
    fetch("/api/plots?userType=co", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        // setting data
        setData(response.data);
      })
      .catch((error) => console.log(error));

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [latitude, longitude],
      zoom: zoom,
    });

    setMap(map.current as mapboxgl.Map);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className={plotCSS.actionBar}>
              <div className={plotCSS.searchContainer}>
              <SearchBox
                  accessToken="pk.eyJ1IjoiZGV2ZWxvcGVyLWJtYmNvcnAiLCJhIjoiY2xscnRkMjg4MHZ3czNkdGhvZWZ2Z3FmdyJ9.08SvDDYJ4oInBba-ClOtAQ"
                  options={{ country: "IN", language: "en" }}
                  placeholder="Enter and select your destination from the dropdown..."
                  value=""
                  marker={
                    new mapboxgl.Marker({
                      color: "#3D2857",
                    })
                  }
                  theme={{
                    variables: {
                      colorPrimary: "#3D2857",
                      boxShadow: "none",
                      border: "2px solid rgba(61, 40, 87, 0.8)",
                      borderRadius: "0.4em",
                    },
                  }}
                  onRetrieve={(res) => {
                    setLocationObj({
                      full_address: res.features[0].properties.full_address,
                      coordinates: res.features[0].properties.coordinates,
                      name: res.features[0].properties.name,
                    });
                  }}
                  map={mapObj}
                  mapboxgl={mapboxgl}
                  name="location"
                  id="plot-location"
                  onChange={(value) => setLocationObj(null)}
                  required
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
          {data !== null &&
            data.map((plot) => {
              return (
                  <div key={plot["_id"]} className="col-lg-3">
                    <div className={plotCSS.card}>
                      <div className={plotCSS.photo}>
                        <a
                          href={`/user/po/plots/plot-details?plotId=${plot["_id"]}`}
                        >
                          <img
                          title="Click to see plot details"
                            className={plotCSS.cardImg}
                            src={
                              (plot["photos"] as Array<string>).length != 0
                                ? plot["photos"][0]
                                : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-768x576.png"
                            }
                            alt={plot["photos"]["plot_name"]}
                          />
                        </a>
                      </div>
                      <div className={plotCSS.cardContent}>
                        <div className={plotCSS.name}>{plot["plot_name"]}</div>
                        <div className={plotCSS.description}>
                          {addEllipsis(plot["description"])}
                        </div>
                        <div className={plotCSS.footer}>
                          <div className={plotCSS.price}>
                            ₹{plot["price"]} per hour
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              );
            })}
        </div>
          </div>
        </div>
      </div>
    </>
  );
}

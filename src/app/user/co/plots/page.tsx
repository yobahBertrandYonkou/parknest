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
  const [markerObj, setMarker] = useState<mapboxgl.Marker[]>([]);
  const [mapObj, setMap] = useState<mapboxgl.Map | null>();
  const [data, setData] = useState<Array<Object[]> | null>(null);
  const [locationObj, setLocationObj] = useState<Object | null>(null);
  const [originalData, setOriginalData] = useState<Array<Object[]> | null>(null);
  const [bookings, setBookings] = useState<Array<Object[]> | null>(null);

  // Adds ellipse to end of text
  let addEllipsis = (text: string, length: number = 70) => {
    if (text.length > length) {
      return text.slice(0, 67) + "...";
    }
    return text;
  };

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
        setOriginalData(response.data);
      })
      .catch((error) => console.log(error));

    // Fetching bookings
    fetch(
      ("/api/plots/booking?userId=" +
        JSON.parse(localStorage.getItem("useParknestStore") as string)[
          "userId"
        ]) as string,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then(async (response) => {
        console.log(response);

        // setting data
        setBookings(response.data);
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
                      border: "2px solid #F8F0FF",
                      borderRadius: "0.4em",
                    },
                  }}
                  onRetrieve={(res) => {
                    console.log("Receiver");
                    console.log(markerObj);
                    
                    
                    if (markerObj?.length !== 0){
                      markerObj.forEach(marker => {
                        console.log(marker);
                        
                        marker.remove();
                      });
                      setMarker([]);
                    }
                    setLocationObj({
                      full_address: res.features[0].properties.full_address,
                      coordinates: res.features[0].properties.coordinates,
                      name: res.features[0].properties.name,
                    });

                    // creating center point
                    let centerPoint = window.turf.point([
                      res.features[0].properties.coordinates.longitude,
                      res.features[0].properties.coordinates.latitude
                    ]);

                    // creating buffer area of 1 km radios
                    let bufferZone = window.turf.buffer(centerPoint, 1, { units: 'kilometers'});
                    console.log(bufferZone);
                    

                    // calculation of distance from center point to all other points
                    let distances = {}

                    // holds plots within buffer radius
                    let plotsWithinRadius: string[] = [];

                    originalData?.forEach( plot => {
                      // creating plot point
                      let point = window.turf.point([
                        plot.plot_location.coordinates.longitude,
                        plot.plot_location.coordinates.latitude,
                      ]);

                      // calculation of distance
                      distances[plot._id as keyof Object] = window.turf.distance(centerPoint, point);

                      // Checking whether plot within buffer radius
                      if (window.turf.booleanPointInPolygon(point, bufferZone)){
                        // saving plot id
                        plotsWithinRadius.push(plot._id);

                        // showing marker on map
                        let marker = new mapboxgl.Marker();
                        
                        marker.setLngLat({
                          lat: plot.plot_location.coordinates.latitude,
                          lng: plot.plot_location.coordinates.longitude
                        });
                        marker.addTo(mapObj);

                        setMarker([
                          ...markerObj ?? [],
                          marker
                        ]);
                      }
                    });

                    // updating data
                    plotsWithinRadius.forEach( id => {
                      return originalData[id as keyof Object];
                    });

                    console.log(distances);
                    console.log(plotsWithinRadius);
                    
                  }}
                  map={mapObj}
                  mapboxgl={mapboxgl}
                  name="location"
                  id="plot-location"
                  onChange={(value) => {
                    // resetting location object
                    setLocationObj(null)

                    // resetting data
                    setData(originalData);
                  }}
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
                {
                  bookings !== null &&
                  bookings.map( booking => {
                    return (<div key={booking._id} className={plotCSS.historyContainer}>
                      <div className={plotCSS.historyPhoto}></div>
                      <div className={plotCSS.historyText}>
                        <div className={plotCSS.historyTitle}>Destination: {booking.destination.full_address}</div>
                        <div className={plotCSS.historySubTitle}>
                          Parking location: {booking.parking_location.full_address}
                        </div>
                        <div className={plotCSS.historySubTitle}>
                          Durationg: {booking.duration} hours at ₹ {booking.total_price}
                        </div>
                      </div>
                      <div className={plotCSS.historyIcon}>
                        <i className="fa-solid fa-location-dot fa-lg"></i>
                      </div>
                    </div>)
                  })
                }
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
                            href={`/user/co/plots/plot-details?plotId=${plot["_id"]}&location=${JSON.stringify(locationObj)}`}
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
                          <div className={plotCSS.name}>
                            {plot["plot_name"]}
                          </div>
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

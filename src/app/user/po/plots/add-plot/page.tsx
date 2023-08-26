"use client";
import addPlotCSS from "./add-plot.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import { PhotoAlbum } from "react-photo-album";
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
            <div className={addPlotCSS.titleBar}>New plot</div>
          </div>
        </div>
      </div>

      {/* Space */}
      <div style={{height: '20px'}}></div>

      {/* Map and plot detail row */}
      <div className="container-fluid">
        <div className={`${addPlotCSS.contentContainer} row`}>
          {/* Title */}
          <div className={`${addPlotCSS.title} col-12`}>Enter plot details</div>

          {/* Form section */}
          <div className="col-lg-5 container-fluid">
            {/* <div className="container-fluid"> */}
            <div className="row">
              {/* Form field */}
              <div className="col-8">
                <label htmlFor="plot-name" className={`${addPlotCSS.labels} form-label small`}>
                  Plot name
                </label>
                <input type="text" id="plot-name" className="form-control" />
              </div>

              {/* Form field */}
              <div className="col-4">
                <label htmlFor="plot-price" className={`${addPlotCSS.labels} form-label small`}>
                  Price per hour
                </label>
                <input type="number" id="plot-price" className="form-control" />
              </div>

              {/* Form field */}
              <div className="col-12">
                <label htmlFor="plot-location" className={`${addPlotCSS.labels} form-label small`}>
                  Plot location
                </label>
                <input
                  type="text"
                  id="plot-location"
                  className="form-control"
                />
              </div>

              {/* Form field */}
              <div className="col-12">
                <label htmlFor="plot-description" className={`${addPlotCSS.labels} form-label small`}>
                  Plot description
                </label>
                <textarea
                  id="plot-description"
                  className="form-control"
                ></textarea>
              </div>
            </div>
            {/* </div> */}
          </div>

          {/* Google map */}
          <div className="col-lg-7">
            <div
              ref={mapContainer}
              className={`${addPlotCSS.googleMap} ${addPlotCSS.contentContainer}`}
            ></div>
          </div>
        </div>
      </div>

      <div style={{height: '20px'}}></div>

      {/* Photos */}
      <div className="container-fluid">
        <div className={`${addPlotCSS.contentContainer} row`}>
          {/* Photo title bar */}
          <div className={`${addPlotCSS.photoTitleBar} col-12`}>
            <div className={addPlotCSS.photoTitle}>Photos</div>
            <div className={addPlotCSS.photoAddPhoto}><i className="fa-solid fa-file-circle-plus"></i></div>
          </div>

          {/* Photos */}
          <div className="col-12 container-fluid">
            <div className="row">
              <PhotoAlbum 
                photos={[
                  { src: 'https://i.imgur.com/CzXTtJV.jpg', width: 800, height: 600 },
                  { src: 'https://i.imgur.com/OB0y6MR.jpg', width: 800, height: 600 },
                  { src: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://farm9.staticflickr.com/8505/8441256181_4e98d8bff5_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://i.imgur.com/OnwEDW3.jpg', width: 800, height: 600 },
                  { src: 'https://farm3.staticflickr.com/2220/1572613671_7311098b76_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://farm6.staticflickr.com/5590/14821526429_5c6ea60405_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://farm7.staticflickr.com/6089/6115759179_86316c08ff_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://farm2.staticflickr.com/1090/4595137268_0e3f2b9aa7_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://farm4.staticflickr.com/3224/3081748027_0ee3d59fea_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://farm8.staticflickr.com/7377/9359257263_81b080a039_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://farm2.staticflickr.com/1449/24800673529_64272a66ec_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://farm4.staticflickr.com/3752/9684880330_9b4698f7cb_z_d.jpg', width: 800, height: 600 },
                  { src: 'https://farm4.staticflickr.com/3827/11349066413_99c32dee4a_z_d.jpg', width: 800, height: 600 }
                ]}

                layout="columns"

                onClick={({ index }) => {window.alert(index)}}
              />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";
import addPlotCSS from "./add-plot.module.css";
import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import { Photo, PhotoAlbum } from "react-photo-album";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGV2ZWxvcGVyLWJtYmNvcnAiLCJhIjoiY2xscnRkMjg4MHZ3czNkdGhvZWZ2Z3FmdyJ9.08SvDDYJ4oInBba-ClOtAQ";

export default function COPlotsPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [latitude, setLatitude] = useState(77.4661303);
  const [longitude, setLongitude] = useState(12.9539456);
  const [zoom, setZoom] = useState(11);
  const [photos, setPhotos] = useState<Object>({});
  const [showCurrentImage, setShowCurrentImage] = useState<boolean>(false);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [latitude, longitude],
      zoom: zoom,
    });

    // listing to form submitting
    // document.getElementById('add-plot-form')?.addEventListener('submit', (event) => {

    // })
  }, []);

  return (
    <form
      id="add-plot-form"
      onSubmit={(event) => {
        event.preventDefault();

        // getting data from form
        let formData = new FormData(event.target as HTMLFormElement);
        let photoIds: Array<string> = [];

        console.log({ ...photos });

        // Adding files to formData
        Object.keys(photos).forEach((photo) => {
          console.log(photos[photo as keyof Object]['file' as keyof Object]);
          let file = photos[photo as keyof Object]['file' as keyof Object] as File;
          formData.append("files", file);
          photoIds.push(photo + "." + file.name.split('.').slice(-1));
        });

        // Adding photo ids to form data
        formData.append('photoIds', photoIds.toString());
        formData.append('userId', JSON.parse(localStorage.getItem('useParknestStore') ?? '')['userId']);

        // let data = {
        //   plot_name: formData.get('name'),
        //   price: formData.get('price'),
        //   plot_location: formData.get('location'),
        //   description: formData.get('description'),
        //   capacity: formData.get('capacity'),
        //   photos: photos,
        //   user_id: ''
        // }

        // Saving data
        fetch("/api/plots", {
          method: "POST",
          // headers: { 'Content-Type': 'multipart/form-data' },
          body: formData,
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
      }}
    >
      {/* Top bar */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className={addPlotCSS.titleBar}>New plot</div>
          </div>
        </div>
      </div>

      {/* Space */}
      <div style={{ height: "20px" }}></div>

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
                <label
                  htmlFor="plot-name"
                  className={`${addPlotCSS.labels} form-label small`}
                >
                  Plot name
                </label>
                <input
                  required
                  type="text"
                  id="plot-name"
                  className="form-control"
                  name="name"
                />
              </div>

              {/* Form field */}
              <div className="col-4">
                <label
                  htmlFor="plot-price"
                  className={`${addPlotCSS.labels} form-label small`}
                >
                  Price per hour
                </label>
                <input
                  required
                  type="number"
                  id="plot-price"
                  className="form-control"
                  name="price"
                />
              </div>

              {/* Form field */}
              <div className="col-8">
                <label
                  htmlFor="plot-location"
                  className={`${addPlotCSS.labels} form-label small`}
                >
                  Plot location
                </label>
                <input
                  type="text"
                  id="plot-location"
                  className="form-control"
                  name="location"
                  required
                />
              </div>
              <div className="col-4">
                <label
                  htmlFor="plot-capacity"
                  className={`${addPlotCSS.labels} form-label small`}
                >
                  Plot capacity
                </label>
                <input
                  type="number"
                  id="plot-capacity"
                  className="form-control"
                  name="capacity"
                  required
                />
              </div>

              {/* Form field */}
              <div className="col-12">
                <label
                  htmlFor="plot-description"
                  className={`${addPlotCSS.labels} form-label small`}
                >
                  Plot description
                </label>
                <textarea
                  required
                  id="plot-description"
                  className="form-control"
                  name="description"
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

      <div style={{ height: "20px" }}></div>

      {/* Photos */}
      <div className="container-fluid">
        <div className={`${addPlotCSS.contentContainer} row`}>
          {/* Photo title bar */}
          <div className={`${addPlotCSS.photoTitleBar} col-12`}>
            <div className={addPlotCSS.photoTitle}>
              Photos ({Object.keys(photos).length})
            </div>
            <div
              className={addPlotCSS.photoAddBtn}
              onClick={() => {
                let photo = document.getElementById(
                  "plot-photo"
                ) as HTMLInputElement;

                // Opening select window
                photo?.click();

                // Add selected photos to photo list
                photo?.addEventListener("change", (event) => {
                  if (photo.files) {
                    // creating file reader object
                    let reader = new FileReader();

                    // handling file upload by reader
                    reader.onload = (event) => {
                      let temp = {};
                      let key = new Date().getTime();
                      temp[key] = {
                        src: event.target?.result,
                        width: 800,
                        height: 600,
                        key: key,
                        file: photo.files != null ? photo.files[0] : null,
                      };

                      setPhotos({
                        ...(photos || []),
                        ...temp,
                      });
                    };

                    // Reading file as data url
                    reader.readAsDataURL(photo.files[0]);
                  }
                });
              }}
            >
              <i className="fa-solid fa-file-circle-plus"></i>
              <input
                style={{ display: "none" }}
                type="file"
                id="plot-photo"
                accept="image/*"
              />
            </div>
          </div>

          {/* Photos */}
          <div className="col-12 container-fluid">
            <div className="row">
              <PhotoAlbum
                photos={
                  Object.keys(photos as Object).map((key) => {
                    return photos[key as keyof Object];
                  }) as unknown as Photo[]
                }
                layout="columns"
                renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
                  <div
                    className={addPlotCSS.photoCard}
                    style={{ position: "relative", ...wrapperStyle }}
                  >
                    {renderDefaultPhoto({ wrapped: false })}

                    {/* Photo actions */}
                    <div className={addPlotCSS.photoAction}>
                      <div
                        className={`${addPlotCSS.photoActionBtn} ${addPlotCSS.view}`}
                        onClick={() => {
                          // open photo in new window
                          setShowCurrentImage(true);
                        }}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </div>
                      <div style={{ width: "30px" }}></div>
                      <div
                        className={`${addPlotCSS.photoActionBtn} ${addPlotCSS.delete}`}
                        onClick={() => {
                          // temporarily storing photo
                          let temp = photos;

                          // deleting photo
                          delete temp[photo.key as keyof Object];

                          // updating photos
                          setPhotos({ ...temp });
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </div>
                    </div>

                    {/* Image viewer */}
                    {showCurrentImage && (
                      <div
                        className={addPlotCSS.imageModal}
                        onClick={() => setShowCurrentImage(false)}
                      >
                        <img
                          className={addPlotCSS.imageModalImage}
                          src={photo.src}
                          alt={photo.key}
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        <div className={`${addPlotCSS.saveBtnContainer} col-12`}>
          <input type="submit" className={addPlotCSS.save} value={"Save"} />
        </div>
      </div>
    </form>
  );
}

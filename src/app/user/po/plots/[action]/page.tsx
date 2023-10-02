/* eslint-disable @next/next/no-img-element */
"use client";
import addPlotCSS from "./add-plot.module.css";
import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import { Photo, PhotoAlbum } from "react-photo-album";
import { SearchBox } from "@mapbox/search-js-react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGV2ZWxvcGVyLWJtYmNvcnAiLCJhIjoiY2xscnRkMjg4MHZ3czNkdGhvZWZ2Z3FmdyJ9.08SvDDYJ4oInBba-ClOtAQ";

export default function COPlotsPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [zoom, setZoom] = useState(-1);
  const [successMessage, setSuccessMessage] = useState(false);
  const [locationObj, setLocationObj] = useState<Object | null>(null);
  const [photos, setPhotos] = useState<Object>({});
  const [mapObj, setMap] = useState<mapboxgl.Map | null>();
  const [showCurrentImage, setShowCurrentImage] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [oldPhotoIds, setOldPhotoIds] = useState<string[] | null>(null);

  // fetch plot data if is edit
  let getPlotData = async (mapObject: mapboxgl.Map) => {
    // getting plot id from url
    let plotId = new URL(window.location.href).searchParams.get("plotId");

    // fetch plot details
    await fetch("/api/plots/plot-details?plotId=" + plotId)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        // updating state
        let lat = response.data.plot_location.coordinates.latitude;
        let lng = response.data.plot_location.coordinates.longitude;
        setLatitude(lat);
        setLongitude(lng);
        let marker = new mapboxgl.Marker().setLngLat({
          lat: lat,
          lng: lng,
        });
        marker.addTo(mapObject);

        // re-centering map
        mapObject.setZoom(15);
        mapObject.setCenter({
          lat: lat,
          lng: lng,
        });

        // updating photos
        if ((response.data.photos as Array<string>).length !== 0) {
          let temp = {};
          (response.data.photos as Array<string>).forEach((url) => {
            let fileaname = new URL(url).pathname
              .split("%2F")
              .slice(-1)[0] as unknown as string;

            let key = fileaname;

            setOldPhotoIds([...(oldPhotoIds ?? []), key]);

            temp[key] = {
              src: url,
              width: 800,
              height: 600,
              key: key,
              file: "url",
            };
            
          });

          setPhotos({
            ...(photos || []),
            ...temp,
          });
        }

        // updating location obj
        setLocationObj(response.data["plot_location"]);

        setData(response.data);
        setOriginalData(response.data);
      })
      .then((error) => console.log(error));
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [latitude, longitude],
      zoom: zoom,
      focus: false,
    });

    setMap(map.current as mapboxgl.Map);

    // checking whether action is edit
    if (window.location.pathname.includes("edit-plot")) {
      // updating states
      setIsEdit(true);
      getPlotData(map.current);
    }
  }, [latitude, longitude, zoom]);

  return (
    <form
      id="add-plot-form"
      onSubmit={(event) => {
        if (locationObj === null) {
          event.preventDefault();
          alert("Location required");
          return;
        }
        event.preventDefault();

        // getting data from form
        let formData = new FormData(event.target as HTMLFormElement);
        let photoIds: Array<string> = [];
        let photoUrls: string[] = [];

        console.log({ ...photos });

        // Adding files to formData
        /**
         * If source is url, then it will be added to photo urls otherwise it will be added to photos
         */
        Object.keys(photos).forEach((photo) => {
          if (
            new URL(
              photos[photo as keyof Object][
                "src" as keyof Object
              ] as unknown as string
            ).origin === "null"
          ) {
            // data url found
            console.log(photos[photo as keyof Object]["file" as keyof Object]);
            let file = photos[photo as keyof Object][
              "file" as keyof Object
            ] as File;
            formData.append("files", file);
            photoIds.push(photo + "." + file.name.split(".").slice(-1));
          } else {
            //  url found
            photoUrls.push(
              photos[photo as keyof Object][
                "src" as keyof Object
              ] as unknown as string
            );
          }
        });

        // Adding photo urls
        formData.append("photoUrls", JSON.stringify(photoUrls));

        if (isEdit) {
          // adding plot id
          formData.append(
            "plotId",
            new URL(window.location.href).searchParams.get("plotId") as string
          );
        }

        // Adding photo ids to form data
        formData.append("photoIds", photoIds.toString());
        formData.append("location", JSON.stringify(locationObj));
        formData.append(
          "userId",
          JSON.parse(localStorage.getItem("useParknestStore") ?? "")["userId"]
        );

        // checking whether information changed
        /**
         * Initial assumption is that all fields are the same (not edited)
         */
        let updateStatus = {
          name: true,
          price: true,
          location: true,
          capacity: true,
          description: true,
          photos: true,
        };

        if (isEdit && originalData != null) {
          updateStatus["name"] =
            (formData.get("name") as string).trim() ===
            originalData["plot_name"];

          updateStatus["price"] =
            (formData.get("price") as string).trim() === originalData["price"];

          updateStatus["capacity"] =
            (formData.get("capacity") as string).trim() ===
            originalData["capacity"];

          updateStatus["description"] =
            (formData.get("description") as string).trim() ===
            originalData["description"];

          updateStatus["location"] =
            locationObj["coordinates" as keyof Object][
              "latitude" as keyof Object
            ] === originalData["plot_location"]["coordinates"]["latitude"] &&
            locationObj["coordinates" as keyof Object][
              "longitude" as keyof Object
            ] === originalData["plot_location"]["coordinates"]["longitude"];

          // photo ids to be deleted
          let photosToBeDeleted: string[] = oldPhotoIds?.filter(
            (id) => !Object.keys(photos).includes(id)
          ) as string[];
          formData.append(
            "photosToBeDeleted",
            JSON.stringify(photosToBeDeleted)
          );

          updateStatus["photos"] =
            (formData.getAll("files") as Blob[]).length == 0;
          updateStatus["photos"] =
            updateStatus["photos"] && photosToBeDeleted.length == 0;
          console.log(photoUrls);
          console.log(oldPhotoIds);
          console.log(photosToBeDeleted);
          console.log(formData.getAll("files") as Blob[]);
        }

        // setting one field to non if it's we are on the add plot page
        if (!isEdit) updateStatus['name'] = false;

        // Checking whether file is present or not
        if (
          ((formData.getAll("files") as Blob[]).length == 0 &&
          photoUrls.length == 0 &&
          isEdit) || Object.keys(photos).length === 0
        ) {
          alert("Please add at least one photo.");
          return;
        }

        /**
         * if false exist in updateStatus then one or more fields have been modified.
         * if no false, then all fields are the same... even if it's in add mode else will be executed
         */
        if (!Object.values(updateStatus).includes(false)) {
          // One or more fields have been modified
          alert("No fields updated!");
          return;
        } else {
          console.log("One or field modified");

          // Saving data
          fetch("/api/plots", {
            method: isEdit ? "PUT" : "POST",
            // headers: { 'Content-Type': 'multipart/form-data' },
            body: formData,
          })
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              if (response.acknowledged) {
                // Show plot added
                setSuccessMessage(true);

                if (!isEdit) {
                  // clear states
                  (
                    document.getElementById("add-plot-form") as HTMLFormElement
                  ).reset();
                  setLocationObj(null);
                  setLatitude(0);
                  setLongitude(0);
                  setZoom(-1);
                  setPhotos({});
                }

                // scroll up
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }
            })
            .catch((error) => console.log(error));
        }
      }}
    >
      {/* Top bar */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className={addPlotCSS.titleBar}>
              {window.location.pathname.split("/").includes("add-plot")
                ? "New plot"
                : "Edit details"}
            </div>
          </div>
        </div>
      </div>
      {/* Space */}
      <div style={{ height: "20px" }}></div>

      {successMessage && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>
                  Plot {isEdit ? "edited" : "added"} successfully!
                </strong>{" "}
                Go to <a href="/user/po/plots">plots</a> page to see plots.
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => {setSuccessMessage(false)}}
                ></button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  defaultValue={isEdit && data != null ? data["plot_name"] : ""}
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
                  defaultValue={isEdit && data != null ? data["price"] : ""}
                />
              </div>

              {/* Form field */}
              <div className="col-8">
                <label
                  htmlFor="plot-location"
                  className={`${addPlotCSS.labels} form-label small`}
                >
                  Plot location{" "}
                  <span className="small text-info">
                    Select location from dropdown
                  </span>
                </label>
                {/* <input
                  type="text"
                  id="plot-location"
                  className="form-control"
                  name="location"
                  required
                /> */}
                <SearchBox
                  accessToken="pk.eyJ1IjoiZGV2ZWxvcGVyLWJtYmNvcnAiLCJhIjoiY2xscnRkMjg4MHZ3czNkdGhvZWZ2Z3FmdyJ9.08SvDDYJ4oInBba-ClOtAQ"
                  options={{ country: "IN", language: "en" }}
                  placeholder="Enter plot location"
                  value={
                    isEdit && data != null ? data["plot_location"]["name"] : ""
                  }
                  marker={
                    new mapboxgl.Marker({
                      color: "#3D2857",
                    })
                  }
                  theme={{
                    variables: {
                      colorPrimary: "#3D2857",
                      boxShadow: "none",
                      border: "1px solid #E2E6ED",
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
                  defaultValue={isEdit && data != null ? data["capacity"] : ""}
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
                  defaultValue={
                    isEdit && data != null ? data["description"] : ""
                  }
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
          {isEdit && (
            <a href="/user/po/plots">
              <input
                style={{ marginRight: "20px", backgroundColor: "#bf2e2e" }}
                type="button"
                className={addPlotCSS.save}
                value={"Cancel"}
              />
            </a>
          )}

          <input
            type="submit"
            className={addPlotCSS.save}
            value={isEdit ? "Update" : "Save"}
          />
        </div>
      </div>
    </form>
  );
}

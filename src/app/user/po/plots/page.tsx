/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import plotCSS from "./plots.module.css";
import { FindCursor, WithId } from "mongodb";

export default function POPlotsPage() {
  // Variables for controlling delete warning pop up
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      ("/api/plots?userId=" +
        JSON.parse(localStorage.getItem("useParknestStore") as string)[
          "userId"
        ]) as string,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then(async (response) => {
        console.log(response);
        // setting data
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className={plotCSS.mainContainer}>
        {/* Top bar */}
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
              placeholder="Search"
            />
          </div>
          <a style={{ textDecoration: "none" }} href="plots/add-plot">
            <div className={plotCSS.addPlotBtn}>
              <i className="fa-solid fa-plus"></i> New plot
            </div>
          </a>
        </div>
        {/* Top bar ends */}
      </div>

      {/* Cards section */}
      <div className="container-fluid">
        <div className="row">
          {/* Plot card */}
          {data !== null &&
            data.map((plot) => {
              return (
                <>
                  <div key={plot["_id"]} className="col-lg-3">
                    <div className={plotCSS.card}>
                      <div className={plotCSS.photo}>
                        <a href={`/user/po/plots/plot-details?plotId=${plot['_id']}`}>
                        <img
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
                          {plot["description"]}
                        </div>
                        <div className={plotCSS.footer}>
                          <div className={plotCSS.price}>
                            ₹{plot["price"]} per hour
                          </div>
                          <div className={plotCSS.icons}>
                            <div className={plotCSS.edit}>
                              <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div
                              className={plotCSS.delete}
                              onClick={() => setShowDeleteWarning(true)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>

      {/* Delete plot pop up */}
      {showDeleteWarning && (
        <div className={plotCSS.transparentBg}>
          <div className={plotCSS.deleteContainer}>
            <div className="container-fluid">
              <div className="row">
                {/* Title bar */}
                <div className={`col-12 ${plotCSS.titleBar}`}>
                  <div>
                    <b>Confirm delete</b>
                  </div>
                </div>
                <hr />

                {/* Middle section */}
                <div className={plotCSS.warningText}>
                  Are you sure you want to delete Land title will be kept here.
                  This action is irreversible.
                </div>
                {/* Action buttons */}
                <div className={plotCSS.action}>
                  <div
                    className={plotCSS.cancel}
                    onClick={() => setShowDeleteWarning(false)}
                  >
                    Cancel
                  </div>
                  <div className={plotCSS.deleteBtn}>Delete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

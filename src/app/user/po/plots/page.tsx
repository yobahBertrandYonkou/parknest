"use client";
import { useState } from "react";
import plotCSS from "./plots.module.css";

export default function POPlotsPage() {
  // Variables for controlling delete warning pop up
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

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
          <a style={{ textDecoration: 'none' }} href="plots/add-plot">
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
          <div className="col-lg-3">
            <div className={plotCSS.card}>
              <div className={plotCSS.photo}></div>
              <div className={plotCSS.cardContent}>
                <div className={plotCSS.name}>Land title will be kept here</div>
                <div className={plotCSS.description}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div>
                <div className={plotCSS.footer}>
                  <div className={plotCSS.price}>₹50 per hour</div>
                  <div className={plotCSS.icons}>
                    <div className={plotCSS.edit}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className={plotCSS.delete} onClick={() => setShowDeleteWarning(true)}>
                      <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plot card */}
          <div className="col-lg-3">
            <div className={plotCSS.card}>
              <div className={plotCSS.photo}></div>
              <div className={plotCSS.cardContent}>
                <div className={plotCSS.name}>Land title will be kept here</div>
                <div className={plotCSS.description}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div>
                <div className={plotCSS.footer}>
                  <div className={plotCSS.price}>₹50 per hour</div>
                  <div className={plotCSS.icons}>
                    <div className={plotCSS.edit}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className={plotCSS.delete} onClick={() => setShowDeleteWarning(true)}>
                      <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plot card */}
          <div className="col-lg-3">
            <div className={plotCSS.card}>
              <div className={plotCSS.photo}></div>
              <div className={plotCSS.cardContent}>
                <div className={plotCSS.name}>Land title will be kept here</div>
                <div className={plotCSS.description}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div>
                <div className={plotCSS.footer}>
                  <div className={plotCSS.price}>₹50 per hour</div>
                  <div className={plotCSS.icons}>
                    <div className={plotCSS.edit}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className={plotCSS.delete} onClick={() => setShowDeleteWarning(true)}>
                      <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Plot card */}
          <div className="col-lg-3">
            <div className={plotCSS.card}>
              <div className={plotCSS.photo}></div>
              <div className={plotCSS.cardContent}>
                <div className={plotCSS.name}>Land title will be kept here</div>
                <div className={plotCSS.description}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div>
                <div className={plotCSS.footer}>
                  <div className={plotCSS.price}>₹50 per hour</div>
                  <div className={plotCSS.icons}>
                    <div className={plotCSS.edit}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className={plotCSS.delete} onClick={() => setShowDeleteWarning(true)}>
                      <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Plot card */}
          <div className="col-lg-3">
            <div className={plotCSS.card}>
              <div className={plotCSS.photo}></div>
              <div className={plotCSS.cardContent}>
                <div className={plotCSS.name}>Land title will be kept here</div>
                <div className={plotCSS.description}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div>
                <div className={plotCSS.footer}>
                  <div className={plotCSS.price}>₹50 per hour</div>
                  <div className={plotCSS.icons}>
                    <div className={plotCSS.edit}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className={plotCSS.delete} onClick={() => setShowDeleteWarning(true)}>
                      <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plot card */}
          <div className="col-lg-3">
            <div className={plotCSS.card}>
              <div className={plotCSS.photo}></div>
              <div className={plotCSS.cardContent}>
                <div className={plotCSS.name}>Land title will be kept here</div>
                <div className={plotCSS.description}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div>
                <div className={plotCSS.footer}>
                  <div className={plotCSS.price}>₹50 per hour</div>
                  <div className={plotCSS.icons}>
                    <div className={plotCSS.edit}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className={plotCSS.delete} onClick={() => setShowDeleteWarning(true)}>
                      <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  <div className={plotCSS.cancel} onClick={() => setShowDeleteWarning(false)}>
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

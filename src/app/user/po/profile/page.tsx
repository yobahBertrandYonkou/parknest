'use client';

import { useEffect, useState } from "react";
import profileCSS from "./profile.module.css";
import { useParknestStore } from "@/stores/mainStore";

export default function POProfilePage() {
  // Park nest store
  const store = useParknestStore();

  // reading from local storage
  const [localStore, setLocalStore] = useState({
    userType: "",
    currentPage: "",
  });



  useEffect(() => {
    // Fetching data from local store
    setLocalStore(
      JSON.parse(window.localStorage.getItem("useParknestStore") ?? "")
    );
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Profile information */}
          <div className="col-lg-3">
            <div className={profileCSS.profileInformation}>
              <div className={profileCSS.profileInfoTitle}>
                Profile Information
              </div>
              <div className={profileCSS.divider}></div>

              {/* Field info */}
              <div className={profileCSS.infoFieldTitle}>Name</div>
              <div className={profileCSS.infoFieldValue}>John Doe</div>
              <div className={profileCSS.divider}></div>

              {/* Field info */}
              <div className={profileCSS.infoFieldTitle}>Email</div>
              <div className={profileCSS.infoFieldValue}>
                john.doe@parknest.com
              </div>
              <div className={profileCSS.divider}></div>

              {/* Field info */}
              <div className={profileCSS.infoFieldTitle}>Phone</div>
              <div className={profileCSS.infoFieldValue}>7829073354</div>
              <div className={profileCSS.divider}></div>

              {/* Field info */}
              <div className={profileCSS.infoFieldTitle}>Identity</div>
              <div className={profileCSS.infoFieldValue}>Aadhar Card</div>
            </div>

            <div style={{ height: "20px" }}></div>

            {/* Account details for PO */}
            {localStore.userType == 'po' && <div className={profileCSS.profileInformation}>
              <div className={profileCSS.profileInfoTitle}>
                Account Information
              </div>
              <div className={profileCSS.divider}></div>

              {/* Field info */}
              <div className={profileCSS.infoFieldTitle}>Account number</div>
              <div className={profileCSS.infoFieldValue}>
                4232 2334 1212 3422 1231
              </div>
              <div className={profileCSS.divider}></div>

              {/* Field info */}
              <div className={profileCSS.infoFieldTitle}>Account name</div>
              <div className={profileCSS.infoFieldValue}>John Doe</div>
            </div>}
          </div>

          {/* Profile information form */}
          <div className="col-lg-9">
            <div className={profileCSS.profileForm}>
              <div className={profileCSS.profileFormTitle}>Edit profile</div>

              {/* Form fields */}
              <div className="row">
                {/* Form filed */}
                <div className="col-lg-6">
                  <label
                    htmlFor="first-name"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    First name
                  </label>
                  <input type="text" className="form-control" id="first-name" />
                </div>

                {/* Form filed */}
                <div className="col-lg-6">
                  <label
                    htmlFor="last-name"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    Last name
                  </label>
                  <input type="text" className="form-control" id="last-name" />
                </div>
                {/* Form filed */}
                <div className="col-lg-6">
                  <label
                    htmlFor="email"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>
                {/* Form filed */}
                <div className="col-lg-6">
                  <label
                    htmlFor="phone"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    Phone number
                  </label>
                  <input type="number" className="form-control" id="phone" />
                </div>
                {/* Form filed */}
                <div className="col-lg-6">
                  <label
                    htmlFor="account-number"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    Account number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="account-number"
                  />
                </div>
                {/* Form filed */}
                <div className="col-lg-6">
                  <label
                    htmlFor="account-name"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    Account name
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="account-name"
                  />
                </div>

                {/* Form filed */}
                <div className="col-lg-4">
                  <label
                    htmlFor="identity"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    Identity
                  </label>
                  <select className="form-select" id="identity">
                    <option value="aadhar">Aadhar Card</option>
                    <option value="license">Diving license</option>
                  </select>
                </div>

                <div className="col-lg-2">
                  <label
                    htmlFor="identity"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    Upload ID
                  </label>
                  <input
                    type="file"
                    name="identity"
                    id="identity"
                    className="form-control"
                  />
                </div>

                {/* Buttons */}
                <div className={`${profileCSS.actionContainer} col-12`}>
                  <div className={profileCSS.save}>Save</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

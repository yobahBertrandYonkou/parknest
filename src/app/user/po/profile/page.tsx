'use client';

import { useEffect, useState } from "react";
import profileCSS from "./profile.module.css";
import { useParknestStore } from "@/stores/mainStore";

export default function POProfilePage() {
  // Park nest store
  const store = useParknestStore();
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [idType, setIdType] = useState<string>("");
  const [idUrl, setIdUrl] = useState<string>("");

  // reading from local storage
  const [localStore, setLocalStore] = useState({
    userType: "",
    currentPage: "",
  });
  const[successMessage, setSuccessMessage] = useState<boolean>(false);
  const[editRequired, setEditRequired] = useState<boolean>(false);



  useEffect(() => {
    
    // Fetching data from local store
    setLocalStore(
      JSON.parse(window.localStorage.getItem("useParknestStore") ?? "")
    );
      
    // fetching user data
    fetch(
      "/api/user",
      {
        method: "POST",
        body: JSON.stringify({
          userId: JSON.parse(localStorage.getItem("useParknestStore") as string)["userId"]
        })
      }
    )
      .then((response) => response.json())
      .then(async (response) => {
        console.log("User");
        
        console.log(response);
        let data = response.data;

        // setting data
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhone(data.phone);
        setEmail(data.email);
        setAccountName(data.account_details.account_name);
        setAccountNumber(data.account_details.account_number);
        setIdType(data.identity.type);
        setIdUrl(data.identity.photo);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
        {editRequired && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>
                  Profile updated successfully!
                </strong>{" "}
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
        {successMessage && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>
                  Profile updated successfully!
                </strong>{" "}
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
        </div>
      </div>
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
              <div className={profileCSS.infoFieldValue}>{firstName + " " + lastName}</div>
              <div className={profileCSS.divider}></div>

              {/* Field info */}
              <div className={profileCSS.infoFieldTitle}>Email</div>
              <div className={profileCSS.infoFieldValue}>
                {email}
              </div>
              <div className={profileCSS.divider}></div>

              {/* Field info */}
              <div className={profileCSS.infoFieldTitle}>Phone</div>
              <div className={profileCSS.infoFieldValue}>{phone}</div>
              <div className={profileCSS.divider}></div>

              {/* Field info */}
              <div className={profileCSS.infoFieldTitle}>Identity</div>
              <div className={profileCSS.infoFieldValue}>{idType}</div>

              {/* Field info */}
              <div className={profileCSS.idImageView}>
                <img className={profileCSS.idImage} src={idUrl} alt="url" />
              </div>
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
                {accountNumber}
              </div>
              <div className={profileCSS.divider}></div>

              {/* Field info */}
              <div className={profileCSS.infoFieldTitle}>Account name</div>
              <div className={profileCSS.infoFieldValue}>{accountName}</div>
            </div>}
          </div>

          {/* Profile information form */}
          <div className="col-lg-9">
            <form className={profileCSS.profileForm} onSubmit={(event) => {
              event.preventDefault();
              console.log("in submit");

              let formData = new FormData(event.target as HTMLFormElement);
              formData.append('userId', JSON.parse(localStorage.getItem("useParknestStore") as string).userId)
              // adding file to form
              // formData.append('file', (document.getElementById('identity') as HTMLInputElement).files[0])
              fetch('/api/user',{
                method: 'PUT',
                body: formData
              }).then(response => response.json())
              .then(response => {
                console.log(response);
                setSuccessMessage(true);
                
              })
              .then(error => console.log(error));
              
            }}>
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
                  <input defaultValue={firstName} name="first_name" onChange={(event) => setFirstName(event.target.value.trim())} required type="text" className="form-control" id="first-name" />
                </div>

                {/* Form filed */}
                <div className="col-lg-6">
                  <label
                    htmlFor="last-name"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    Last name
                  </label>
                  <input defaultValue={lastName} name="last_name" onChange={(event) => setLastName(event.target.value.trim())} required type="text" className="form-control" id="last-name" />
                </div>
                {/* Form filed */}
                <div className="col-lg-6">
                  <label
                    htmlFor="email"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    Email
                  </label>
                  <input defaultValue={email} name="email" onChange={(event) => setEmail(event.target.value.trim())} required type="email" className="form-control" id="email" />
                </div>
                {/* Form filed */}
                <div className="col-lg-6">
                  <label
                    htmlFor="phone"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    Phone number
                  </label>
                  <input defaultValue={phone} name="phone" onChange={(event) => setPhone(event.target.value.trim())} required type="number" className="form-control" id="phone" />
                </div>
                {/* Form filed */}
                <div className="col-lg-6">
                  <label
                    htmlFor="account-number"
                    className={`${profileCSS.labels} form-label small`}
                  >
                    Account number
                  </label>
                  <input defaultValue={accountNumber} name="account_number" onChange={(event) => setAccountNumber(event.target.value.trim())} required
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
                  <input defaultValue={accountName} name="account_name" onChange={(event) => setAccountName(event.target.value.trim())} required
                    type="text"
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
                  <select defaultValue={idType} name="identity_type" onChange={(event) => setIdType(event.target.value.trim())} required className="form-select" id="identity_type">
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
                  <input required
                    type="file"
                    name="identity_file"
                    id="identity"
                    className="form-control"
                    accept="image/*"
                    onChange={(event) => {
                      let reader = new FileReader();

                      reader.onload = (event) => {
                        setIdUrl(event.target?.result as string);
                      }

                      reader.readAsDataURL(event.target.files[0]);
                    }}
                  />
                </div>

                {/* Buttons */}
                <div className={`${profileCSS.actionContainer} col-12`}>
                  <input type="submit" className={profileCSS.save} value={"Save"}/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useParknestStore } from "@/stores/mainStore";
import userCSS from "./layout.module.css";
import { useEffect, useState } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import NotLoggedInPopup from "./not-logged-in";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Park nest store
  const store = useParknestStore();

  // reading from local storage
  const [localStore, setLocalStore] = useState({
    userType: "",
    currentPage: "",
  });

  //   Loader
  const [isLoading, setIsLoading] = useState(true);

  // Holds current page name
  const [currentPage, setCurrentPage] = useState("");

//   Page name
const [pageName, setPageName] = useState('');

// login in required
const [isLoggedIn, setIsLoggedIn] = useState(true);


  useEffect(() => {
    // Fetching data from local store
    var storeData = window.localStorage.getItem("useParknestStore");
    console.log(storeData === null);
    

    if (storeData === null){
      // Tell user to log in first 
      setIsLoggedIn(false);

    }else{
      let data = JSON.parse(storeData);
      setLocalStore(data);

      // fetching user data and validating user profile
      console.log(data.userId);
      (async () => {
        await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: data.userId }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            
          })
          .catch((error) => console.log(error));
      })();
  
      // setting current page
      var temp = window.location.pathname.split("/").slice(-1)[0];
      setCurrentPage(temp.toString().includes("plot") ? "plots" : temp);
      setPageName(temp);
      console.log(currentPage);
  
      // Hide is loading
      setIsLoading(false);
    }
    
  }, []);

  function showMenuOptions(): import("react").ReactNode {
    return (
      <>

        {/* Menu option */}
        {localStore.userType == "po" && (
          <div
            className={
              currentPage == "dashboard"
                ? userCSS.optionBoxActive
                : userCSS.optionBoxInactive
            }
            onClick={() => {
              // redirect
              if (currentPage != "dashboard") {
                window.location.assign("/user/po/dashboard");
              }
            }}
          >
            <div className={userCSS.optionIcon}>
              <i className="fa-solid fa-gauge"></i>
            </div>
            <div className={userCSS.optionText}>Dashboard</div>
          </div>
        )}

        {/* Menu option */}
        {(localStore.userType == "po" || localStore.userType == "co") && (
          <div
            className={
              currentPage == "plots"
                ? userCSS.optionBoxActive
                : userCSS.optionBoxInactive
            }
            onClick={() => {
              // redirecting
              if (currentPage != "plots") {
                if (localStore.userType == "po") {
                  window.location.assign("/user/po/plots");
                } else {
                  window.location.assign("/user/co/plots");
                }
              }
            }}
          >
            <div className={userCSS.optionIcon}>
              <i className="fa-solid fa-car"></i>
            </div>
            <div className={userCSS.optionText}>Plots</div>
          </div>
        )}

        {/* Menu option */}
        {localStore.userType == "po" && (
          <div
            className={
              currentPage == "bookings"
                ? userCSS.optionBoxActive
                : userCSS.optionBoxInactive
            }
            onClick={() => {
              // redirect
              if (currentPage != "booking") {
                window.location.assign("/user/po/bookings");
              }
            }}
          >
            <div className={userCSS.optionIcon}>
              <i className="fa-solid fa-list"></i>
            </div>
            <div className={userCSS.optionText}>Bookings</div>
          </div>
        )}

        {/* Menu option */}
        {(localStore.userType == "po" || localStore.userType == "co") && (
          <div
            className={
              currentPage == "profile"
                ? userCSS.optionBoxActive
                : userCSS.optionBoxInactive
            }
            onClick={() => {
              // redirecting
              if (currentPage != "profile") {
                if (localStore.userType == "po") {
                  window.location.assign("/user/po/profile");
                } else {
                  window.location.assign("/user/co/profile");
                }
              }
            }}
          >
            <div className={userCSS.optionIcon}>
              <i className="fa-solid fa-user"></i>
            </div>
            <div className={userCSS.optionText}>Profile</div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className={userCSS.mainContainer} suppressHydrationWarning>
        <div className={userCSS.sidebarContainer}>
          {/* Side bar */}
          <div className={userCSS.sideBar}>
            {/* Logo, title and nav bar collapse */}
            <div className={userCSS.sideBarTop}>
              <div className={userCSS.logoTitle}>
                <div className={userCSS.logo}></div>
                <div className={userCSS.title}>PARKNEST</div>
              </div>
              <div className={userCSS.collapse}>
                <i className="fa-solid fa-bars"></i>
              </div>
            </div>

            {/* Divider one */}
            <div className={userCSS.divider}></div>

            {/* Menu name */}
            <div className={userCSS.menu}>MENU</div>

            {/* Divider two */}
            <div className={userCSS.divider}></div>

            {/* Menu options */}
            <div className={userCSS.options}>
              {/* Skeleton loaders */}
              {isLoading &&
                [1, 2, 3, 4].map((num) => {
                  return (
                    <div key={num}>
                      <SkeletonLoader height={50} background={"#ECDDFF"} />
                      <div style={{ height: "10px" }}></div>
                    </div>
                  );
                })}

              {!isLoading && showMenuOptions()}
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className={userCSS.contentSection}>
          {/* Top nav */}
          <div className={userCSS.topNav}>
            {!isLoading && <div className={userCSS.navTitle}>{(pageName[0].toUpperCase() + pageName.slice(1)).replace("-", " ")}</div>}
           {isLoading && <div><SkeletonLoader width={100} /></div>}

           {/* Sign out */}
           <div className={userCSS.signout} onClick={() => {
            // deleting useParnestStore from localhost
            window.localStorage.removeItem('useParknestStore');

            // redirecting user to login page
            window.location.replace('/auth/signin');

           }}><i className="fa-solid fa-right-from-bracket"></i></div>
          </div>

          {/* Login required */}
          {!isLoggedIn && <NotLoggedInPopup />}

          {/* Content box */}
          <div className={userCSS.content}>{children}</div>
        </div>
      </div>
    </>
  );
}

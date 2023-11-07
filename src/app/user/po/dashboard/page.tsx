"use client"
import dashboardCSS from "./dashboard.module.css";
import { BarChart, LineChart } from "./charts";
import { useEffect, useState } from "react";

export default function PODashboardPage() {
  const [data, setData] = useState<Object>();

  useEffect(() => {
    fetch('/api/stats?userId=' + JSON.parse(localStorage.getItem("useParknestStore") as string)["userId"])
    .then(response => response.json())
    .then(response => {
      console.log(response.data);
      setData(response.data);
      
    })
    .catch(error => console.log(error));
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Right side content section */}
          <div className="col-lg-9">
            {/* Graph card 1 */}
            <div className="col-lg-12">
              <div className={dashboardCSS.graphCard}>
                <div className={dashboardCSS.graphCardTitle}>Total Income per plot</div>

                {/* Line chart */}
                { data === undefined ? "" : BarChart((data['incomePerPlot' as keyof Object] as unknown as Object[]).map( element => {
                  return element.metadata[0].name as string
                }) as string[], (data['incomePerPlot' as keyof Object] as unknown as Object[]).map( element => {
                  return element.totalIncome as number
                }) as number[]) }

              </div>
            </div>
            {/* Graph card 1 end */}

            {/* Graph card 2 */}
            <div className="col-lg-12">
              <div className={dashboardCSS.graphCard}>
                <div className={dashboardCSS.graphCardTitle}>Number of booking per plot</div>

                {/* Line chart */}
                { data === undefined ? "" : BarChart((data['numberOfBookingsPerPlot' as keyof Object] as unknown as Object[]).map( element => {
                  return element.metadata[0].name as string
                }) as string[], (data['numberOfBookingsPerPlot' as keyof Object] as unknown as Object[]).map( element => {
                  return element.count as number
                }) as number[]) }

              </div>
            </div>
            {/* Graph card 2 end */}

            {/* Graph card 3 */}
            <div className="col-lg-12">
              <div className={dashboardCSS.graphCard}>
                <div className={dashboardCSS.graphCardTitle}>Income per plot for each month</div>

                {/* Bar chart */}
                {/* { BarChart() } */}
              </div>
            </div>
            {/* Graph card 3 end */}
          </div>

          {/* Left side content section */}
          <div className="col-lg-3">
            <div
              id={dashboardCSS.income}
              className={`${dashboardCSS.graphCard} ${dashboardCSS.leftCard}`}
            >
              <div className={dashboardCSS.cardValue}>₹{ data === undefined ? "0000" : (data.totalIncome === undefined ? 0 : data.totalIncome.toString() ).padStart(4, "0") }</div>
              <div className={dashboardCSS.cardSubtext}>Total income</div>
            </div>
            <div
              id={dashboardCSS.plots}
              className={`${dashboardCSS.graphCard} ${dashboardCSS.leftCard}`}
            >
              <div className={dashboardCSS.cardValue}>{ data === undefined ? "0000" : (data.totalPlots.toString()).padStart(4, "0") }</div>
              <div className={dashboardCSS.cardSubtext}>Total plots</div>
            </div>
            <div
              id={dashboardCSS.bookings}
              className={`${dashboardCSS.graphCard} ${dashboardCSS.leftCard}`}
            >
              <div className={dashboardCSS.cardValue}>{ data === undefined ? "0000" : (data.totalBookings.toString()).padStart(4, "0") }</div>
              <div className={dashboardCSS.cardSubtext}>Total Bookings</div>
            </div>

            {/* Notification section */}
            {/* <div
              className={`${dashboardCSS.graphCard} ${dashboardCSS.notificationCard}`}
            >
              <div className={dashboardCSS.graphCardTitle}>Notifications</div>

              <div className={dashboardCSS.notificationList}>
                <div className={dashboardCSS.notification}>
                  <div className={dashboardCSS.notificationIcon}></div>
                  <div className={dashboardCSS.notificationText}>
                    <div className={dashboardCSS.notificationTitle}>
                      Destination
                    </div>
                    <div className={dashboardCSS.notificationSubtext}>
                      Parking location
                    </div>
                  </div>
                </div>
                <div className={dashboardCSS.notification}>
                  <div className={dashboardCSS.notificationIcon}></div>
                  <div className={dashboardCSS.notificationText}>
                    <div className={dashboardCSS.notificationTitle}>
                      Destination
                    </div>
                    <div className={dashboardCSS.notificationSubtext}>
                      Parking location
                    </div>
                  </div>
                </div>

                <div className={dashboardCSS.notification}>
                  <div className={dashboardCSS.notificationIcon}></div>
                  <div className={dashboardCSS.notificationText}>
                    <div className={dashboardCSS.notificationTitle}>
                      Destination
                    </div>
                    <div className={dashboardCSS.notificationSubtext}>
                      Parking location
                    </div>
                  </div>
                </div>

                <div className={dashboardCSS.notification}>
                  <div className={dashboardCSS.notificationIcon}></div>
                  <div className={dashboardCSS.notificationText}>
                    <div className={dashboardCSS.notificationTitle}>
                      Destination
                    </div>
                    <div className={dashboardCSS.notificationSubtext}>
                      Parking location
                    </div>
                  </div>
                </div>

                <div className={dashboardCSS.notification}>
                  <div className={dashboardCSS.notificationIcon}></div>
                  <div className={dashboardCSS.notificationText}>
                    <div className={dashboardCSS.notificationTitle}>
                      Destination
                    </div>
                    <div className={dashboardCSS.notificationSubtext}>
                      Parking location
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

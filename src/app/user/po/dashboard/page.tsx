"use client"
import dashboardCSS from "./dashboard.module.css";
import { BarChart, LineChart } from "./charts";

export default function PODashboardPage() {
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
                { LineChart() }

              </div>
            </div>
            {/* Graph card 1 end */}

            {/* Graph card 2 */}
            <div className="col-lg-12">
              <div className={dashboardCSS.graphCard}>
                <div className={dashboardCSS.graphCardTitle}>Number of booking per plot</div>

                {/* Line chart */}
                { LineChart() }

              </div>
            </div>
            {/* Graph card 2 end */}

            {/* Graph card 3 */}
            <div className="col-lg-12">
              <div className={dashboardCSS.graphCard}>
                <div className={dashboardCSS.graphCardTitle}>Income per plot for each month</div>

                {/* Bar chart */}
                { BarChart() }
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
              <div className={dashboardCSS.cardValue}>₹1000</div>
              <div className={dashboardCSS.cardSubtext}>Total income</div>
            </div>
            <div
              id={dashboardCSS.plots}
              className={`${dashboardCSS.graphCard} ${dashboardCSS.leftCard}`}
            >
              <div className={dashboardCSS.cardValue}>₹1000</div>
              <div className={dashboardCSS.cardSubtext}>Total plots</div>
            </div>
            <div
              id={dashboardCSS.bookings}
              className={`${dashboardCSS.graphCard} ${dashboardCSS.leftCard}`}
            >
              <div className={dashboardCSS.cardValue}>₹1000</div>
              <div className={dashboardCSS.cardSubtext}>Total Bookings</div>
            </div>

            {/* Notification section */}
            <div
              className={`${dashboardCSS.graphCard} ${dashboardCSS.notificationCard}`}
            >
              <div className={dashboardCSS.graphCardTitle}>Notifications</div>

              <div className={dashboardCSS.notificationList}>
                {/* Notification card */}
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
                {/* Notification card */}
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

                {/* Notification card */}
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

                {/* Notification card */}
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

                {/* Notification card */}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

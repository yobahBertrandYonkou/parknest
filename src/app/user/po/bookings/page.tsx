'use client';

import { useEffect, useState } from "react";
import bookingCSS from "./bookings.module.css";
import DataTable, { createTheme } from "react-data-table-component";

export default function POBookingsPage() {
  const [data, setData] = useState<Object[] | null>(null);

  // Making table theme
  createTheme('parknest', {
    text: {
      primary: "#3D2857",
      secondary: "#F8F0FF",
    },
    
  });

  useEffect(() => {
    // Fetching plots
    fetch(
      ("/api/plots/booking?plotOwnerId=" +
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
      <div className={bookingCSS.mainContainer}>
        {/* Top bar */}
        <div className={bookingCSS.actionBar}>
          <div className={bookingCSS.searchContainer}>
            <div className={bookingCSS.searchIcon}>
              <div>
                <i className={`fa-solid fa-magnifying-glass`}></i>
              </div>
            </div>
            <input
              className={bookingCSS.search}
              type="search"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Top bar ends */}

        {/* Bookings table */}
        <div className={bookingCSS.tableContainer}>
          <DataTable
            columns={[
              { name: 'Date', selector: row => row.dateTime, sortable: true },
              { name: 'Plot', selector: row => row.plot, sortable: true },
              { name: 'Customer', selector: row => row.customer, sortable: true },
              { name: 'Duration', selector: row => row.duration, sortable: true },
              { name: 'Slots', selector: row => row.slots, sortable: true },
              { name: 'Total price', selector: row => row.totalPrice, sortable: true },
              { name: 'Status', selector: row => row.status, sortable: true }
            ]}

            data={data?.map( booking => {
              return { 
                dateTime: new Date(parseInt(booking.timestamp)).toDateString(),
                plot: booking.parking_location.name,
                customer: "booking.customer_name",
                duration: booking.duration == 1 ? `${booking.duration} hour` : `${booking.duration} hours`,
                slots: booking.number_of_spots == 1 ? `${booking.number_of_spots} hour` : `${booking.number_of_spots} hours`,
                totalPrice: `Rs. ${booking.total_price}`,
                status: "booking.status"
              };
            })}

            theme="parknest"
            
          />
        </div>
      </div>
    </>
  );
}

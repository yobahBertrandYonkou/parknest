'use client';

import bookingCSS from "./bookings.module.css";
import DataTable, { createTheme } from "react-data-table-component";

export default function POBookingsPage() {
  // Making table theme
  createTheme('parknest', {
    text: {
      primary: "#3D2857",
      secondary: "#F8F0FF",
    },
    
  })

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
          <div className={bookingCSS.actions}>
            <div className={bookingCSS.filterBtn}>
              <i className="fa-solid fa-plus"></i> Name
            </div>
            <div className={bookingCSS.filterBtn}>
              <i className="fa-solid fa-plus"></i> Status
            </div>
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

            data={[
              { 
                dateTime: new Date().toDateString(),
                plot: 'Plot Name',
                customer: 'Mark test',
                duration: '4 hours',
                slots: '4 slots',
                totalPrice: 'Rs. 500',
                status: 'Occupied'
              },
              { 
                dateTime: new Date().toDateString(),
                plot: 'Plot Name',
                customer: 'Mark test',
                duration: '4 hours',
                slots: '4 slots',
                totalPrice: 'Rs. 500',
                status: 'Occupied'
              },{ 
                dateTime: new Date().toDateString(),
                plot: 'Plot Name',
                customer: 'Mark test',
                duration: '4 hours',
                slots: '4 slots',
                totalPrice: 'Rs. 500',
                status: 'Occupied'
              },
              { 
                dateTime: new Date().toDateString(),
                plot: 'Plot Name',
                customer: 'Mark test',
                duration: '4 hours',
                slots: '4 slots',
                totalPrice: 'Rs. 500',
                status: 'Occupied'
              }
            ]}

            theme="parknest"
            
          />
        </div>
      </div>
    </>
  );
}

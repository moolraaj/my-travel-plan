import React from 'react';


function RecentBookings() {
  return (
    <div className="recent-bookings">
      <h2>Recent Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Package</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>Beach Holiday</td>
            <td>2023-07-01</td>
            <td>Confirmed</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>Mountain Trek</td>
            <td>2023-07-02</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RecentBookings;

import React from 'react';

export default function Notifications() {
  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '25px', color: '#2c3e50' }}>Notifications</h1>
      
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Notification</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
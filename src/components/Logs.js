import React from 'react';

export default function Logs() {
  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '25px', color: '#2c3e50' }}>Logs</h1>
      
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>LogID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Account</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
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
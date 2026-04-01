import React from 'react';

export default function Inventory() {
  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '25px', color: '#2c3e50' }}>Inventory</h1>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>ProductID</th>
              <th>Product Name</th>
              <th>Current Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
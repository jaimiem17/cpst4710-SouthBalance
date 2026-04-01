import React from 'react';

export default function ViewOrders({ navigateTo }) {
  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>View Orders</h1>
        <button className="primary-button" onClick={() => navigateTo('orders')}>
          &lt;- Back to Place Order
        </button>
      </div>
      
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>OrderID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>0</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
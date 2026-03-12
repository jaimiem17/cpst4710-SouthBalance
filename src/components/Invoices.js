import React from 'react';

export default function Invoices() {
  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '25px', color: '#2c3e50' }}>Invoices</h1>
      
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>InvoiceID</th>
              <th>Date</th>
              <th>Amount ($)</th>
              <th>Customer Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>0.00</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
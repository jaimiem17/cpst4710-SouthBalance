import React from 'react';

export default function Dashboard() {
  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '25px', color: '#2c3e50' }}>Dashboard</h1>

      <div className="card">
        <h2 style={{ marginTop: 0, color: '#0056b3' }}>Order Overview</h2>
        <p style={{ fontSize: '18px' }}>
          <strong>Total number of orders:</strong> <span className="badge" style={{ backgroundColor: '#eef2f6', color: '#0056b3' }}>0</span>
        </p>
        
        <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
          <p>To be Packaged: <span className="badge" style={{ backgroundColor: '#fff3cd', color: '#856404' }}>0</span></p>
          <p>To be Shipped: <span className="badge" style={{ backgroundColor: '#d4edda', color: '#155724' }}>0</span></p>
          <p>To be Invoiced: <span className="badge" style={{ backgroundColor: '#cce5ff', color: '#004085' }}>0</span></p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0, color: '#0056b3' }}>Inventory Details</h2>
        <p>
          <strong>Out of Stock items:</strong> <span className="badge" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>0</span>
        </p>
        <p>
          <strong>Low Stock Items:</strong> <span className="badge" style={{ backgroundColor: '#fff3cd', color: '#856404' }}>0</span>
        </p>
      </div>
    </div>
  );
}
import React from 'react';

export default function Dashboard({ navigateTo }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>South Balance Ordering & Inventory System</h1>
      
      {/* Navigation Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button style={{ fontWeight: 'bold' }}>Dashboard</button>
        <button onClick={() => navigateTo('inventory')}>Inventory</button>
      </div>

      <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
        <h2>Order Overview</h2>
        <p>Total number of orders: 0</p>
        <p>To be Packaged: 0 | To be Shipped: 0 | To be Invoiced: 0</p>
      </div>

      <div style={{ border: '1px solid black', padding: '10px' }}>
        <h2>Inventory Details</h2>
        <p>Out of Stock items: 0</p>
        <p>Low Stock Items: 0</p>
      </div>
    </div>
  );
}
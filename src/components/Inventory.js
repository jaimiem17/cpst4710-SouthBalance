import React from 'react';

export default function Inventory({ navigateTo }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>South Balance Inventory</h1>
      
      {/* Navigation Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => navigateTo('dashboard')}>Dashboard</button>
        <button style={{ fontWeight: 'bold' }}>Inventory</button>
      </div>

      <h2>All Products</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th>ProductID</th>
            <th>Product Name</th>
            <th>Current Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#P00001</td>
            <td>Widget A</td>
            <td>0</td>
          </tr>
          <tr>
            <td>#P00002</td>
            <td>Widget B</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
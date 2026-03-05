import React from 'react';

export default function Login({ onLogin }) {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>South Balance</h1>
      <h2>Order & Inventory</h2>
      
      <div style={{ margin: '20px' }}>
        <input type="text" placeholder="Enter Credentials" style={{ padding: '10px' }} />
      </div>
      
      <button onClick={onLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Sign in
      </button>
    </div>
  );
}
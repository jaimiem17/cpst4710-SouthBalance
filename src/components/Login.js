import React from 'react';

export default function Login({ onLogin }) {
  return (
    <div className="login-container">
      <div className="card" style={{ textAlign: 'center', width: '350px' }}>
        <h1 style={{ color: '#0056b3', marginBottom: '5px' }}>South Balance</h1>
        <h3 style={{ color: '#666', marginTop: '0', marginBottom: '30px' }}>Order & Inventory</h3>
        
        {/* Username Field */}
        <div style={{ marginBottom: '15px' }}>
          <input 
            className="input-field" 
            type="text" 
            placeholder="Username" 
            style={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%' }}
          />
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '25px' }}>
          <input 
            className="input-field" 
            type="password" 
            placeholder="Password" 
            style={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%' }}
          />
        </div>
        
        <button className="primary-button" onClick={onLogin} style={{ width: '100%' }}>
          Sign in
        </button>
      </div>
    </div>
  );
}
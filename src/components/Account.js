import React from 'react';

export default function Account({ navigateTo }) {
  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '25px', color: '#2c3e50' }}>Account</h1>
      
      {/* Account Overview Section */}
      <div className="card">
        <h2 style={{ marginTop: 0, color: '#0056b3' }}>Account Overview</h2>
        <p><strong>Account Name:</strong> -</p>
        <p><strong>Account ID:</strong> -</p>
      </div>

      {/* Account Actions Section */}
      <div className="card">
        <h2 style={{ marginTop: 0, color: '#0056b3' }}>Account Actions</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            className="primary-button" 
            onClick={() => navigateTo('login')}
          >
            &lt;- Log Out
          </button>
          <button className="primary-button">
            Switch Account -&gt;
          </button>
        </div>
      </div>
    </div>
  );
}
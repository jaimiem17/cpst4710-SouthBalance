import React from 'react';

export default function Orders({ navigateTo }) {
  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>Place Order</h1>
        {/* This is the button to go view the table! */}
        <button className="primary-button" onClick={() => navigateTo('view-orders')}>
          View All Orders -&gt;
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Product Selection List */}
        <div className="card" style={{ flex: 2, minWidth: '300px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Cost</th>
                <th>Purchase? Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Placeholder 1</td>
                <td>$19.99</td>
                <td><input className="input-field" type="number" defaultValue="0" style={{ width: '70px', padding: '8px' }} /></td>
              </tr>
              <tr>
                <td>Placeholder 2</td>
                <td>$25.99</td>
                <td><input className="input-field" type="number" defaultValue="0" style={{ width: '70px', padding: '8px' }} /></td>
              </tr>
              <tr>
                <td>Placeholder 3</td>
                <td>$41.99</td>
                <td><input className="input-field" type="number" defaultValue="0" style={{ width: '70px', padding: '8px' }} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Order Overview / Checkout Box */}
        <div className="card" style={{ flex: 1, minWidth: '250px', height: 'fit-content' }}>
          <h2 style={{ marginTop: 0, color: '#0056b3' }}>Order Overview</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Product 1</span>
            <span>-</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Product 2</span>
            <span>-</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Product 3</span>
            <span>-</span>
          </div>
          
          <hr style={{ borderTop: '2px solid #e0e6ed', margin: '15px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', marginBottom: '20px' }}>
            <span>Total</span>
            <span>$0.00</span>
          </div>
          
          <button className="primary-button" style={{ width: '100%' }}>
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
}
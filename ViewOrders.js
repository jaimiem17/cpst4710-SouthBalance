import React, { useEffect, useState } from 'react';

export default function ViewOrders({ navigateTo }) {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch('http://localhost:8000/orders-summary');
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.detail || 'Could not load orders.');
          return;
        }

        setOrders(data);
      } catch (error) {
        setMessage('Could not connect to the backend server.');
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>View Orders</h1>
        <button className="primary-button" onClick={() => navigateTo('orders')}>
          &lt;- Back to Place Order
        </button>
      </div>

      {message && (
        <div className="card" style={{ marginBottom: '20px', color: 'red' }}>
          {message}
        </div>
      )}

      <div className="card">
        {isLoading ? (
          <p>Loading orders...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>OrderID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Distribution Center</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                    <td>{order.username}</td>
                    <td>{order.distribution_center}</td>
                    <td>{order.quantity}</td>
                    <td>{order.status}</td>
                    <td>${Number(order.total_cost).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
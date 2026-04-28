import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const ordersResponse = await fetch('http://localhost:8000/orders-summary');
        const ordersData = await ordersResponse.json();

        const inventoryResponse = await fetch('http://localhost:8000/order-form-data');
        const inventoryData = await inventoryResponse.json();

        if (!ordersResponse.ok || !inventoryResponse.ok) {
          setMessage('Could not load dashboard data.');
          return;
        }

        setOrders(ordersData || []);
        setInventory(inventoryData.inventory || []);
      } catch (error) {
        setMessage('Could not connect to the backend server.');
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const totalOrders = orders.length;

  const toBePackaged = orders.filter((order) => order.status === 'Pending').length;
  const toBeShipped = orders.filter((order) => order.status === 'Packaged').length;
  const toBeInvoiced = orders.filter((order) => order.status === 'Shipped').length;

  const outOfStockItems = inventory.filter((item) => item.quantity_available === 0).length;
  const lowStockItems = inventory.filter(
    (item) => item.quantity_available > 0 && item.quantity_available <= 5
  ).length;



  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '25px', color: '#2c3e50' }}>Dashboard</h1>

      {message && (
        <div className="card" style={{ marginBottom: '20px', color: 'red' }}>
          {message}
        </div>
      )}

      {isLoading ? (
        <div className="card">Loading dashboard data...</div>
      ) : (
        <>
          <div className="card">
            <h2 style={{ marginTop: 0, color: '#0056b3' }}>Order Overview</h2>

            <p style={{ fontSize: '18px' }}>
              <strong>Total number of orders:</strong>{' '}
              <span className="badge" style={{ backgroundColor: '#eef2f6', color: '#0056b3' }}>
                {totalOrders}
              </span>
            </p>

            <div style={{ display: 'flex', gap: '20px', marginTop: '15px', flexWrap: 'wrap' }}>
              <p>
                To be Packaged:{' '}
                <span className="badge" style={{ backgroundColor: '#fff3cd', color: '#856404' }}>
                  {toBePackaged}
                </span>
              </p>

              <p>
                To be Shipped:{' '}
                <span className="badge" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                  {toBeShipped}
                </span>
              </p>

              <p>
                To be Invoiced:{' '}
                <span className="badge" style={{ backgroundColor: '#cce5ff', color: '#004085' }}>
                  {toBeInvoiced}
                </span>
              </p>
            </div>
          </div>

          <div className="card">
            <h2 style={{ marginTop: 0, color: '#0056b3' }}>Inventory Details</h2>

            

            <p>
              <strong>Out of Stock items:</strong>{' '}
              <span className="badge" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
                {outOfStockItems}
              </span>
            </p>

            <p>
              <strong>Low Stock Items:</strong>{' '}
              <span className="badge" style={{ backgroundColor: '#fff3cd', color: '#856404' }}>
                {lowStockItems}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
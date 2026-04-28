import React, { useEffect, useState } from 'react';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [adjustments, setAdjustments] = useState({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function loadInventory() {
    try {
      const response = await fetch('http://localhost:8000/order-form-data');
      const data = await response.json();

      setInventory(data.inventory || []);
    } catch (error) {
      setMessage('Could not load inventory.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadInventory();
  }, []);

  function updateAdjustment(stockId, value) {
    setAdjustments({
      ...adjustments,
      [stockId]: Number(value),
    });
  }

  async function adjustInventory(stockId, direction) {
    setMessage('');

    const amount = adjustments[stockId];

    if (!amount || amount <= 0) {
      setMessage('Please enter a positive quantity to adjust.');
      return;
    }

    const quantityChange = direction === 'add' ? amount : -amount;

    try {
      const response = await fetch(`http://localhost:8000/inventory/${stockId}/adjust`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity_change: quantityChange,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || 'Inventory could not be updated.');
        return;
      }

      setMessage('Inventory updated successfully.');
      setAdjustments({
        ...adjustments,
        [stockId]: '',
      });

      loadInventory();
    } catch (error) {
      setMessage('Could not connect to the backend server.');
    }
  }

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '25px', color: '#2c3e50' }}>Inventory Management</h1>

      {message && (
        <div
          className="card"
          style={{
            marginBottom: '20px',
            color: message.includes('successfully') ? 'green' : 'red',
          }}
        >
          {message}
        </div>
      )}

      <div className="card">
        {isLoading ? (
          <p>Loading inventory...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>StockID</th>
                <th>Product Name</th>
                <th>Color</th>
                <th>Cost</th>
                <th>Current Quantity</th>
                <th>Adjust By</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan="7">No inventory found.</td>
                </tr>
              ) : (
                inventory.map((item) => (
                  <tr key={item.stock_id}>
                    <td>{item.stock_id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.color_name}</td>
                    <td>${Number(item.base_cost).toFixed(2)}</td>
                    <td>{item.quantity_available}</td>
                    <td>
                      <input
                        className="input-field"
                        type="number"
                        min="1"
                        value={adjustments[item.stock_id] || ''}
                        onChange={(event) => updateAdjustment(item.stock_id, event.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <button
                        className="primary-button"
                        onClick={() => adjustInventory(item.stock_id, 'add')}
                        style={{ marginRight: '8px' }}
                      >
                        Add
                      </button>

                      <button
                        className="secondary-button"
                        onClick={() => adjustInventory(item.stock_id, 'remove')}
                      >
                        Remove
                      </button>
                    </td>
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
import React, { useState } from 'react';
import './App.css'; 
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import ViewOrders from './components/ViewOrders';
import Notifications from './components/Notifications';
import Invoices from './components/Invoices';
import Logs from './components/Logs';
import Account from './components/Account';


function App() {
  const [currentPage, setCurrentPage] = useState('login');

  let PageToDisplay;
  if (currentPage === 'login') {
    PageToDisplay = <Login onLogin={() => setCurrentPage('dashboard')} />;
  } else if (currentPage === 'dashboard') {
    PageToDisplay = <Dashboard navigateTo={setCurrentPage} />;
  } else if (currentPage === 'inventory') {
    PageToDisplay = <Inventory navigateTo={setCurrentPage} />;
  } else if (currentPage === 'orders') {
    PageToDisplay = <Orders navigateTo={setCurrentPage} />;
  } else if (currentPage === 'view-orders') {
    PageToDisplay = <ViewOrders navigateTo={setCurrentPage} />;
  } else if (currentPage === 'notifications') {
    PageToDisplay = <Notifications navigateTo={setCurrentPage} />;
  } else if (currentPage === 'invoices') {
    PageToDisplay = <Invoices navigateTo={setCurrentPage} />;
  } else if (currentPage === 'logs') {
    PageToDisplay = <Logs navigateTo={setCurrentPage} />;
  } else if (currentPage === 'account') {
    PageToDisplay = <Account navigateTo={setCurrentPage} />;
  }

  return (
    <div>
      {currentPage !== 'login' && (
        <div className="navbar">
          <button className="nav-button" onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
          <button className="nav-button" onClick={() => setCurrentPage('orders')}>Orders</button>
          <button className="nav-button" onClick={() => setCurrentPage('inventory')}>Inventory</button>
          <button className="nav-button" onClick={() => setCurrentPage('notifications')}>Notifications</button>
          <button className="nav-button" onClick={() => setCurrentPage('invoices')}>Invoices</button>
          <button className="nav-button" onClick={() => setCurrentPage('logs')}>View Logs</button>
          <button className="nav-button" onClick={() => setCurrentPage('account')}>Account</button>
        </div>
      )}
      {PageToDisplay}
    </div>
  );
}

export default App;
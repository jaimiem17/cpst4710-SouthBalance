import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';

function App() {
  // This state keeps track of which page we are currently looking at
  const [currentPage, setCurrentPage] = useState('login');

  // This renders the correct component based on the state above
  let PageToDisplay;
  if (currentPage === 'login') {
    PageToDisplay = <Login onLogin={() => setCurrentPage('dashboard')} />;
  } else if (currentPage === 'dashboard') {
    PageToDisplay = <Dashboard navigateTo={setCurrentPage} />;
  } else if (currentPage === 'inventory') {
    PageToDisplay = <Inventory navigateTo={setCurrentPage} />;
  }

  return (
    <div>
      {PageToDisplay}
    </div>
  );
}

export default App;
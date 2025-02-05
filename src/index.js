import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { ShipmentProvider } from './context/ShipmentContext';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container); // Create a root

// Render the app
root.render(
  <ShipmentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
 </ShipmentProvider>
);
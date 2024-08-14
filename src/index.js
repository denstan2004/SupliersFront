// index.js or main.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import AppRouter from './appRouter'; // Import your router

// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app using the new API
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

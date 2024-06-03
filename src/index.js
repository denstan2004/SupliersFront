// index.js або main.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './appRouter'; // Імпорт маршрутизатора

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

    import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App'; // Головний компонент
import SuplierProducts from './Suplier/SuplierProducts';
import ExcelImportPage from './ExcelImport/ExcelImportPage'
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/suplier/pruducts" element={<SuplierProducts />} />
        <Route path="/import" element={<ExcelImportPage />} />

      </Routes>
    </Router>
  );
}

export default AppRouter;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import SuplierProducts from './Suplier/Products/SuplierProducts';
import SuplierRequests from './Suplier/Products/ProductRequestsHistory/Requests/SuplierRequests';
import ExcelImportPage from './Suplier/Products/ExcelImport/ExcelImportPage';
import Requests from './Manager/Requests/ProductRequests/Requests';
import ChoosePage from './ChoosePage/ChoosePage';
import AllProducts from './Suplier/Discounts/Discount/AllProducts';
import ManagerChoosePage from './ChoosePage/ManagerChoosePage';
import DiscountRequests from './Manager/Requests/DiscountRequests/DiscountRequests';
import SuplierDiscountRequests from './Suplier/Discounts/Discount/DiscountRequests/SuplierDiscountRequests';

const AppRouter = () => {
  const prefix = "vopak/uzhorod";

  return (
    <Router>
      <Routes>
        <Route path={`${prefix}/suplier/discounts`} element={<AllProducts />} />
        <Route path={`${prefix}/manager/requests`} element={<Requests />} />
        <Route path={`${prefix}/manager/requests/discounts`} element={<DiscountRequests />} />
        <Route path={`${prefix}/suplier/discount/requests`} element={<SuplierDiscountRequests />} />
        <Route path={`${prefix}/suplier/products`} element={<SuplierProducts />} />
        <Route path={`${prefix}/import`} element={<ExcelImportPage />} />
        <Route path={`${prefix}/suplier/requests`} element={<SuplierRequests />} />
        <Route path={`${prefix}/choose`} element={<ChoosePage />} />
        <Route path={`${prefix}/manager/choose`} element={<ManagerChoosePage />} />

        {/* Default route to App component */}
        <Route path={`${prefix}/`} element={<App />} />
        
        {/* Redirect to default route if no match is found */}
        <Route path="*" element={<Navigate to={`${prefix}/`} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

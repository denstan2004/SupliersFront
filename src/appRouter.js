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
import Reports from './ZNP-reports/reports';
const AppRouter = () => {

  return (
    <Router>
      <Routes>
        <Route path={`/suplier/discounts`} element={<AllProducts />} />
        <Route path={`/manager/requests`} element={<Requests />} />
        <Route path={`/manager/requests/discounts`} element={<DiscountRequests />} />
        <Route path={`/suplier/discount/requests`} element={<SuplierDiscountRequests />} />
        <Route path={`/suplier/products`} element={<SuplierProducts />} />
        <Route path={`/import`} element={<ExcelImportPage />} />
        <Route path={`/suplier/requests`} element={<SuplierRequests />} />
        <Route path={`/choose`} element={<ChoosePage />} />
        <Route path={`/manager/choose`} element={<ManagerChoosePage />} />
        <Route path={`/reports`} element={<Reports />} />
        {/* Default route to App component */}
        <Route path={`/`} element={<App />} />
        
        {/* Redirect to default route if no match is found */}
      </Routes>
    </Router>
  );
};

export default AppRouter;

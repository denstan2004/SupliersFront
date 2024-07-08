    import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App'; // Головний компонент
import SuplierProducts from './Suplier/SuplierProducts';
import SuplierRequests from './Requests/SuplierRequests';
import ExcelImportPage from './ExcelImport/ExcelImportPage'
import Requests from './Manager/Requests/Requests';
import ChoosePage from './ChoosePage/ChoosePage';
import AllProducts from './Discount/AllProducts'
import ManagerChoosePage from './ChoosePage/ManagerChoosePage';
import DiscountRequests from './Manager/Requests/Discount/DiscountRequests';
import SuplierDiscountRequests from './Discount/DiscountRequests/SuplierDiscountRequests';
///suplier/discount/requests
const AppRouter = () => {
  return (
    <Router>
      <Routes>
     
      <Route path="/suplier/discounts" element={<AllProducts/>}/>
        <Route path="/manager/requests" element={<Requests/>}/>
        <Route path="/manager/requests/discounts" element={<DiscountRequests/>}/>
        <Route path="/suplier/discount/requests" element={<SuplierDiscountRequests/>}/>
        <Route path="/" element={<App />} />
        <Route path="/suplier/pruducts" element={<SuplierProducts />} />
        <Route path="/import" element={<ExcelImportPage />} />
        <Route path="/suplier/requests" element={<SuplierRequests />} />
        <Route path="/choose" element={<ChoosePage />} />
        <Route path="/manager/choose" element={<ManagerChoosePage />} />

      </Routes>
    </Router>
  );
}

export default AppRouter;

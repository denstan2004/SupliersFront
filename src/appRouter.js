    import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App'; // Головний компонент
import SuplierProducts from './Suplier/Products/SuplierProducts';
import SuplierRequests from './Suplier/Products/ProductRequestsHistory/Requests/SuplierRequests';    ///Requests/SuplierRequests
import ExcelImportPage from './Suplier/Products/ExcelImport/ExcelImportPage'
import Requests from './Manager/Requests/ProductRequests/Requests'; //./Manager/Requests/Requests
import ChoosePage from './ChoosePage/ChoosePage';
import AllProducts from './Suplier/Discounts/Discount/AllProducts' ///Suplier/Discount/AllProducts
import ManagerChoosePage from './ChoosePage/ManagerChoosePage';
import DiscountRequests from './Manager/Requests/DiscountRequests/DiscountRequests'; //./Manager/Requests/Discount/DiscountRequests
import SuplierDiscountRequests from './Suplier/Discounts/Discount/DiscountRequests/SuplierDiscountRequests'; //./Discount/DiscountRequests/SuplierDiscountRequests
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

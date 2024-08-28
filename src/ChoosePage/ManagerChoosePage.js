import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import "./ChoosePage.css"

function ManagerChoosePage(){
    const navigate = useNavigate();

    const HandleNavigateUpdate = () => {
        navigate(`/manager/requests/discounts`);
    }

    const HandleNavigateDiscount = () => {
        navigate(`/manager/requests`);
    }
     const HandleNavigateReports = () => {
        navigate(`/reports`);
    }

    return(
        <div className="choose-page-container">
            <button onClick={HandleNavigateUpdate} className="choose-page-button">
            Запити знижки   
            </button>
            <button onClick={HandleNavigateDiscount} className="choose-page-button">
            Запити зміни ціни 
            </button>
            <button onClick={HandleNavigateReports} className="choose-page-button">
            Звіти
            </button>
        </div>
    )
}

export default ManagerChoosePage;

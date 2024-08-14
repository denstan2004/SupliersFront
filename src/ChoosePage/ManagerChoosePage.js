import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import "./ChoosePage.css"

function ManagerChoosePage(){
    const navigate = useNavigate();
    const prefix = localStorage.getItem("front-prefix") || '';

    const HandleNavigateUpdate = () => {
        navigate(`/manager/requests/discounts`);
    }

    const HandleNavigateDiscount = () => {
        navigate(`/manager/requests`);
    }

    return(
        <div className="choose-page-container">
            <button onClick={HandleNavigateUpdate} className="choose-page-button">
                        запити знижки   

            </button>
            <button onClick={HandleNavigateDiscount} className="choose-page-button">
            запити зміни ціни 
            </button>
        </div>
    )
}

export default ManagerChoosePage;

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import "./ChoosePage.css"

function ChoosePage(){
    const navigate = useNavigate();


const HandleNavigateUpdate = () => {
    navigate(`/suplier/products`);
}

const HandleNavigateDiscount = () => {
    navigate(`/suplier/discounts`);
}
const HandleNavigateReports = () => {
    navigate(`/reports`);
}
    return(
        <div className="choose-page-container">
            <button onClick={HandleNavigateUpdate} className="choose-page-button">
                Оновити ціну    
            </button>
            <button onClick={HandleNavigateDiscount} className="choose-page-button">
                Додати акцію
            </button>
            <button onClick={HandleNavigateReports} className="choose-page-button">
            Звіти
            </button>
            
        </div>
    )
}

export default ChoosePage;

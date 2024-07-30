import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import "./ChoosePage.css"

function ChoosePage(){
    const navigate = useNavigate();

    const prefix = localStorage.getItem("front-prefix") || '';

const HandleNavigateUpdate = () => {
    navigate(`/${prefix}/suplier/products`);
}

const HandleNavigateDiscount = () => {
    navigate(`/${prefix}/suplier/discounts`);
}

    return(
        <div className="choose-page-container">
            <button onClick={HandleNavigateUpdate} className="choose-page-button">
                Оновити ціну    
            </button>
            <button onClick={HandleNavigateDiscount} className="choose-page-button">
                Додати акцію
            </button>
        </div>
    )
}

export default ChoosePage;

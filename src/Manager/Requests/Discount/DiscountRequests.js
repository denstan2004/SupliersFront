import axios from "axios";
import { useEffect, useState } from "react";
import './DiscountRequests.css';
import DiscountRequestCard from "./DiscountRequest/DiscountRequestCard"
function DiscountRequests() {
    const [requests, setRequests] = useState([]);
    const [selectedTrademark, setSelectedTrademark] = useState('all');
    const [uniqueTrademarks, setUniqueTrademarks] = useState([]);
    const removeRequest = (codeWares, number) => {
        setRequests(prevRequests => prevRequests.filter(request => request.suplierPostition.codeWares !== codeWares || request.adressModel.number !== number));
    };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7184/api/Discount/GetAll/Discount/Request/', {
                withCredentials: true
            });

            if (response.status === 200) {
                console.log(response.data);
                setRequests(response.data);
                extractUniqueTrademarks(response.data);
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const extractUniqueTrademarks = (requests) => {
        const trademarks = requests.map(request => request.suplierPostition.nameBrand);
        const uniqueTrademarks = ['all', ...new Set(trademarks)];
        setUniqueTrademarks(uniqueTrademarks);
    };

    const handleTrademarkChange = (event) => {
        setSelectedTrademark(event.target.value);
    };

    const filteredRequests = selectedTrademark === 'all' 
        ? requests 
        : requests.filter(request => request.suplierPostition.nameBrand === selectedTrademark);

    return (
        <div className="discount-requests-container">
            <div className="discount-requests-filters">
                <select className="discount-requests-select" value={selectedTrademark} onChange={handleTrademarkChange}>
                    {uniqueTrademarks.map(trademark => (
                        <option key={trademark} value={trademark}>{trademark}</option>
                    ))}
                </select>
            </div>
            <div className='suplier-product-list-container'>
                <div className="discount-request-list-name">Назва</div>
                <div className="discount-request-list-name">Назва Групи</div>
                <div className="discount-request-list-trademark">Торгова марка</div>
                <div className="discount-request-list-adress">Назва точки</div>
                <div className="discount-request-list-adress-comment">Коментарій</div>
                <div className="discount-request-list-price">Акційна ціна</div>
                <div className="discount-request-list-price">Акційна вхідна ціна</div>
                <div className="discount-request-list-price">Сума компенсації</div>
                <div className="discount-request-list-price">Планові продажі</div>
                <div className="discount-request-list-date">Період</div>
                <div className="discount-request-list-comment">Коментарій</div>






            </div>
            <div className="discount-requests-list">
                {filteredRequests.map((request, index) => (
                   <DiscountRequestCard key={index} request={request} removeRequest={removeRequest} />
                ))}
            </div>
        </div>
    );
}

export default DiscountRequests;

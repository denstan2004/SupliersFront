import axios from "axios";
import { useEffect, useState } from "react";
import './DiscountRequests.css';
import DiscountRequestCard from "./DiscountRequest/DiscountRequestCard";
import NotificationMessage from "./../../../Helpers/NotificationMessage";

function DiscountRequests() {
    const [requests, setRequests] = useState([]);
    const [selectedTrademark, setSelectedTrademark] = useState('all');
    const [uniqueTrademarks, setUniqueTrademarks] = useState([]);
    const [loading, setLoading] = useState(true); // Додаємо стан для завантаження
    const [Message, setMessage] = useState('');
    const [messageVisibility, setMessageVisibility] = useState(false);

    const removeRequest = (codeWares, number) => {
        setRequests(prevRequests => prevRequests.filter(request => request.suplierPostition.codeWares !== codeWares || request.adressModel.number !== number));
    };

    const CloseMessage = () => {
        setMessageVisibility(false);
        setMessage('');
        console.log(Message);
    }

    useEffect(() => {
        if (Message !== '') setMessageVisibility(true);
    }, [Message]);

    const setmessagefunc = (message) => {
        console.log(message);
        setMessage(message);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("back-prefix")}/Discount/GetAllRequest/Manager`, {
                withCredentials: true
            });

            if (response.status === 200) {
                console.log(response.data);
                setRequests(response.data);
                extractUniqueTrademarks(response.data);
            }
        } catch (error) {
            console.error('There was an error!', error);
        } finally {
            setLoading(false); // Завершуємо завантаження
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
            {messageVisibility && (
                <NotificationMessage Close={CloseMessage} message={Message} />
            )}
            {loading ? (
                <div className="loading-spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <>
                    <div className="discount-requests-filters">
                        <select className="discount-requests-select" value={selectedTrademark} onChange={handleTrademarkChange}>
                            {uniqueTrademarks.map(trademark => (
                                <option key={trademark} value={trademark}>{trademark}</option>
                            ))}
                        </select>
                    </div>
                    <div className='discount-product-list-container'>
                        <div className="discount-request-list-name">Назва</div>
                        <div className="discount-request-list-groupname">Назва Групи</div>
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
                            <DiscountRequestCard key={index} request={request} setmessagefunc={setmessagefunc} removeRequest={removeRequest} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default DiscountRequests;

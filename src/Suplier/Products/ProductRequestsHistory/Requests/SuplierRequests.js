import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Reliability, Time, Delete }  from '@carbon/pictograms-react';// Використовуй іконки з цієї бібліотеки
import './SuplierRequests.css';

function SuplierRequests() {
    const [requests, setRequests] = useState([]);
    const [uniqueTrademarks, setUniqueTrademarks] = useState([]);
    const [selectedTrademark, setSelectedTrademark] = useState('all');
    const location = useLocation();
    const { products } = location.state || {};
    
    useEffect(() => {
        fetchProducts();
        extractUniqueTrademarks(requests);
    }, []);
    const extractUniqueTrademarks = (requests) => {
        console.log(requests)
        const trademarks = requests.map(request => request.nameBrand);
        const uniqueTrademarks = ['all', ...new Set(trademarks)];
        setUniqueTrademarks(uniqueTrademarks);
    };

    const fetchProducts = async () => {
        setRequests(products.filter((req) => req.updatedPrice !== 0));

    };
    const handleTrademarkChange = (event) => {
        setSelectedTrademark(event.target.value);
    };

    useEffect(() => {
        console.log(requests);
    }, [requests]);
    const filteredProducts = selectedTrademark === 'all' ? requests : requests.filter(request => request.nameBrand === selectedTrademark);

    return (
        <div>
            <select className="suplier-select" value={selectedTrademark} onChange={handleTrademarkChange}>
                        {uniqueTrademarks.map(trademark => (
                            <option key={trademark} value={trademark}>{trademark}</option>
                        ))}
                    </select>
            <div className='suplier-product-list-container'>
                <div className='suplier-request-list-name'>Назва</div>
                <div className='suplier-request-list-text'>Код</div>
                <div className='suplier-request-list-text'>Торгова марка</div>
                <div className='suplier-request-list-text'>Дата початку</div>
                <div className='suplier-request-list-text'>Ціна</div>
                <div className='suplier-request-list-text'>Оновлена Ціна</div>
                <div className='suplier-request-list-text'>Штрихкод</div>
                <div className='suplier-request-list-status-comment'>Статус/Коментар</div>
            </div>
            {requests.length > 0 ?
                <div>
                    {filteredProducts.map((request, index) => (
                        <RequestCard key={index} request={request} />
                    ))}
                </div>
                :
                <div>
                    {/* Render something else when requests array is empty */}
                </div>
            }
        </div>
    );
}

export default SuplierRequests;

function RequestCard({ request }) {
    const [showMessage, setShowMessage] = useState(false);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const onShowHandle = () => {
        setShowMessage(true);
    };

    const onCloseHandle = () => {
        setShowMessage(false);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Accepted":
                return  <Reliability className="suplier-history-request-card-status-green" />; 
            case "Pennding":
                return <Time  className="suplier-history-request-card-status-orange" />; 
            case "Rejected":
                return <Delete  className="suplier-history-request-card-status-red" />;
            default:
                return null;
        }
    };

    return (
        <div className="suplier-request-card">
            <div className="suplier-request-card-name">{request.nameWares}</div>
            <div className="suplier-request-card-item">{request.codeWares}</div>
            <div className="suplier-request-card-item">{request.nameBrand}</div>
            <div className="suplier-request-card-item">{formatDate(request.dateStart)}</div>
            <div className="suplier-request-card-item">{request.price}</div>
            <div className="suplier-request-card-item">{request.updatedPrice}</div>
            <div className="product-item">
                {request.barCodes.length > 1 ? (
                    <select className="suplier-request-card-item-option">
                        {request.barCodes.map((code, index) => (
                            <option  key={index} value={code}>
                                {code}
                            </option>
                        ))}
                    </select>
                ) : (
                    <div className="suplier-request-card-item-barcode">{request.barCode}</div>
                )}
            </div>
            <div>
                {getStatusIcon(request.status)}
            </div>
            <button className="suplier-request-card-item-comment" onClick={onShowHandle}>Show Comment</button>
            {showMessage && <Message message={request.commentSpec} onClose={onCloseHandle} />}
        </div>
    );
}

function Message({ message, onClose }) {
    return (
        <div className="message-conainer">
            <div className="message-text">{message}</div>
            <button className="message-button" onClick={onClose}>Close</button>
        </div>
    );
}

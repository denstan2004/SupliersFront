import axios from "axios";
import { useEffect, useState } from "react";
import RequestCard from "./Request/RequestCard";
import './Requests.css';

function Requests() {
    const [requests, setRequests] = useState([]);
    const [uniqueTrademarks, setUniqueTrademarks] = useState([]);
    const [selectedTrademark, setSelectedTrademark] = useState('all');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('https://localhost:7184/api/Request/GetAll', {
                withCredentials: true
            });

            if (response.status === 200) {
                console.log(response.data);
                setRequests(response.data);
                extractUniqueTrademarks(response.data);
            }
        } catch (error) {
            console.error('There was an error!',error);
        }
    };

    const extractUniqueTrademarks = (requests) => {
        const trademarks = requests.map(request => request.nameBrand);
        const uniqueTrademarks = ['all', ...new Set(trademarks)];
        setUniqueTrademarks(uniqueTrademarks);
    };

    const handleTrademarkChange = (event) => {
        setSelectedTrademark(event.target.value);
    };

    const removeRequest = (codeWares, codeFirm) => {
        setRequests(prevRequests => prevRequests.filter(request => request.codeWares !== codeWares || request.codeFirm !== codeFirm));
    };

    const handleApproveAll = async () => {
        for (const request of filteredRequests) {
            await handleApproveOrDecline(request, 'Accepted');
        }
    };

    const handleDeclineAll = async () => {
        for (const request of filteredRequests) {
            await handleApproveOrDecline(request, 'Rejected');
        }
    };

    const handleApproveOrDecline = async (request, status) => {
        const requestPayload = {
            status: status,
            commentspec: "", // Add any comment if needed
            codewares: request.codeWares,
            codefirm: request.codeFirm
        };

        try {
            const response = await axios.post('https://localhost:7184/api/Request/Update', requestPayload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('Price change request processed successfully');
                removeRequest(request.codeWares, request.codeFirm);
            }
        } catch (error) {
            console.error('There was an error processing the price change request', error);
        }
    };

    const filteredRequests = selectedTrademark === 'all' ? requests : requests.filter(request => request.nameBrand === selectedTrademark);

    return (
        <div className="requests-container">
            <div className="requests-filters">
                <select className="requests-select" value={selectedTrademark} onChange={handleTrademarkChange}>
                    {uniqueTrademarks.map(trademark => (
                        <option key={trademark} value={trademark}>{trademark}</option>
                    ))}
                </select>
                <div className="requests-buttons">
                    <button className="requests-button-approve-all" onClick={handleApproveAll}>
                        Прийняти всі
                    </button>
                    <button className="requests-button-reject-all" onClick={handleDeclineAll}>
                        Відхилити всі
                    </button>
                </div>
            </div>
            <div className='suplier-product-list-container'>
                <div className='manager-request-list-name'>Назва</div>
                <div className='manager-request-list-text'>Назва Групи</div>
                <div className='manager-request-list-text'>Торгова марка</div>
                <div className='manager-request-list-text'>Ціна</div>
                <div className='manager-request-list-text'>Оновлена Ціна</div>
                <div className='manager-request-list-text'>Процент зростання</div>
                <div className='manager-request-list-text'>Дата</div>
                <div className='manager-request-list-text'>Коментар</div>
            </div>
            <div className="requests-list">
                {filteredRequests.map((request, index) => (
                    <RequestCard key={index} request={request} removeRequest={removeRequest} />
                ))}
            </div>
        </div>
    );
}

export default Requests;

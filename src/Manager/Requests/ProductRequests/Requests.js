import axios from "axios";
import { useEffect, useState } from "react";
import RequestCard from "./Request/RequestCard";
import './Requests.css';
import NotificationMessage from './../../../Helpers/NotificationMessage'

function Requests() {
    const [requests, setRequests] = useState([]);
    const [uniqueTrademarks, setUniqueTrademarks] = useState([]);
    const [selectedTrademark, setSelectedTrademark] = useState('all');

    //-----------------message----------------------
    const [Message, setMessage] = useState('');
    const [messageVisibility, setMessageVisibility] = useState(false);

    const CloseMessage = () => {
        setMessageVisibility(false);
        setMessage('');
    }

    useEffect(() => {
        if (Message !== '') setMessageVisibility(true);
    }, [Message]);

    const setmessagefunc = (message) => {
        console.log(message);
        setMessage(message);
    }
    //--------------------------------------------------

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("back-prefix")}/Supplyer/Request/GetAll`, {
                withCredentials: true
            });

            if (response.status === 200) {
                if (response.data.status === true) {
                    console.log(response.data);
                    setRequests(response.data.data);
                    extractUniqueTrademarks(response.data.data);
                } else {
                    console.log(response.data.textState);
                    setMessage("Помилка неможливо дістати запити");
                }
            }
        } catch (error) {
            console.error('There was an error!', error);
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
            commentspec: "",
            codewares: request.codeWares,
            codefirm: request.codeFirm
        };

        try {
            const response = await axios.post(`${localStorage.getItem("back-prefix")}/Supplyer/Request/Update`, requestPayload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log(response.data);
                if (response.data.status === true) {
                    removeRequest(request.codeWares, request.codeFirm);
                    setMessage("Відповідь відправлена");
                } else {
                    console.log(response.data.textState);
                    setMessage("Відповідь не відправлена");
                }
            }
        } catch (error) {
            console.error('There was an error processing the price change request', error);
        }
    };

    const filteredRequests = selectedTrademark === 'all' ? requests : requests.filter(request => request.nameBrand === selectedTrademark);

    return (
        <div className="requests-container">
            {messageVisibility && (
                <NotificationMessage Close={CloseMessage} message={Message} />
            )}
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
                <div className='manager-request-list-comment'>Коментар</div>
            </div>
            <div className="requests-list">
                {filteredRequests.map((request, index) => (
                    <RequestCard 
                        key={index} 
                        request={request} 
                        removeRequest={removeRequest} 
                        setmessagefunc={setmessagefunc} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Requests;

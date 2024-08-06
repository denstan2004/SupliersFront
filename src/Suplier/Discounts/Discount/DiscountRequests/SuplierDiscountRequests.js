import axios from "axios";
import { useEffect, useState } from "react";
import SuplierDiscountRequest from "./DiscountRequest/SuplierDiscountRequest";
import NotificationMessage from "./../../../../Helpers/NotificationMessage";
import "./SuplierDiscountRequests.css";

function SuplierDiscountRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // Стан для контролю завантаження
    const [Message, setMessage] = useState('');
    const [messageVisibility, setMessageVisibility] = useState(false);
    const [tempRequests, setTempRequests] = useState([]);
    const [trademarks, setTrademarks] = useState(["all"]);
    const [names, setNames] = useState(["all"]);
    const [selectedTrademark, setSelectedTrademark] = useState("all");
    const [selectedName, setSelectedName] = useState("all");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("back-prefix")}/Discount/GetAllRequests/Suplier`, {
                withCredentials: true
            });
            console.log(response);
            if (response.status === 200) {
                setRequests(response.data);
                console.log(response.data);
                const newTrademarks = response.data.map((request) => request.suplierPostition.nameBrand);
                setTrademarks((prevTrademarks) => {
                    const uniqueTrademarks = [...prevTrademarks];
                    newTrademarks.forEach((trademark) => {
                        if (!uniqueTrademarks.includes(trademark)) {
                            uniqueTrademarks.push(trademark);
                        }
                    });
                    return uniqueTrademarks;
                });
                const newNames = response.data.map((request) => request.discountPeriods.comment);
                setNames((prevNames) => {
                    const uniqueNames = [...prevNames];
                    newNames.forEach((name) => {
                        if (!uniqueNames.includes(name)) {
                            uniqueNames.push(name);
                        }
                    });
                    return uniqueNames;
                });
            }
        } catch (error) {
            setMessage('Неможливо загрузити запити');
            console.error('There was an error!', error);
        } finally {
            setLoading(false); // Завершення завантаження
        }
    };

    useEffect(() => {
        console.log(names);
    }, [names]);

    const handleTrademarkChange = (event) => {
        setSelectedTrademark(event.target.value);
    };

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    };

    const CloseMessage = () => {
        setMessageVisibility(false);
        setMessage('');
    };

    useEffect(() => {
        if (Message !== '') setMessageVisibility(true);
    }, [Message]);

    const setmessagefunc = (message) => {
        console.log(message);
        setMessage(message);
    };

    return (
        <div>
            {messageVisibility && (
                <NotificationMessage Close={CloseMessage} message={Message} />
            )}
            {loading ? (
                <div className="loading-spinner"></div> // Використання CSS-спінера
            ) : (
                <>
                    <div className="filters">
                        <select className="fillter" value={selectedTrademark} onChange={handleTrademarkChange}>
                            {trademarks.map((trademark, index) => (
                                <option key={index} value={trademark}>
                                    {trademark}
                                </option>
                            ))}
                        </select>
                        <select value={selectedName} onChange={handleNameChange}>
                            {names.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='suplier-product-list-container'>
                        <div className="suplier-discount-request-list-name">Назва</div>
                        <div className="suplier-discount-request-list-name">Назва Групи</div>
                        <div className="suplier-discount-request-list-trademark">Торгова марка</div>
                        <div className="suplier-discount-request-list-adress">Назва точки</div>
                        <div className="suplier-discount-request-list-adresscomment">Коментарій</div>
                        <div className="suplier-discount-request-list-price">Акційна ціна</div>
                        <div className="suplier-discount-request-list-price">Акційна вхідна ціна</div>
                        <div className="suplier-discount-request-list-price">Сума компенсації</div>
                        <div className="suplier-discount-request-list-price">Планові продажі</div>
                        <div className="suplier-discount-request-list-date">Період</div>
                        <div className="suplier-discount-request-list-comment">Коментарій</div>
                        <div className="suplier-discount-request-list-status">Статус</div>
                    </div>
                    {!loading && requests
                        .filter((request) => (selectedTrademark === "all" || request.suplierPostition.nameBrand === selectedTrademark) &&
                                             (selectedName === "all" || request.discountPeriods.comment === selectedName))
                        .map((request, index) => (
                            <SuplierDiscountRequest key={index} request={request} />
                        ))}
                </>
            )}
        </div>
    );
}

export default SuplierDiscountRequests;

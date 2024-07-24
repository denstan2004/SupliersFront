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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://localhost:7184/api/Discount/GetAllRequests/Suplier", {
                withCredentials: true
            });
            console.log(response);
            if (response.status === 200) {
                setRequests(response.data);
                console.log(response.data);
            }
        } catch (error) {
            setMessage('Неможливо загрузити запити');
            console.error('There was an error!', error);
        } finally {
            setLoading(false); // Завершення завантаження
        }
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
            )}
            {!loading && requests.map((request, index) => (
                <SuplierDiscountRequest key={index} request={request} />
            ))}
        </div>
    );
}

export default SuplierDiscountRequests;

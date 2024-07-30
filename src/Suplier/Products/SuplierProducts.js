import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SuplierProducts.css';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../Products/ProductCard';
import NotificationMessage from '../../Helpers/NotificationMessage';

function SupplierProducts() {
    const [products, setProducts] = useState([]);
    const [uniqueTrademarks, setUniqueTrademarks] = useState([]);
    const [selectedTrademark, setSelectedTrademark] = useState('all');
    const [selectedDate, setSelectedDate] = useState('');
    const [Message, setMessage] = useState('');
    const [messageVisibility, setMessageVisibility] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        axios.get(`${localStorage.getItem("back-prefix")}/Supplyer/Positions/GetAll`, {
            withCredentials: true 
        })
        .then(response => {
            if (response.status === 200) {
                console.log(response.data.data);
                if (response.data.data != null) {
                    setProducts(response.data.data);
                    extractUniqueTrademarks(response.data.data);
                    localStorage.setItem("suplierProducts", JSON.stringify(response.data.data));
                } else {
                    setMessage(response.data.textState);
                }
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    useEffect(() => {
        if (Message !== '') setMessageVisibility(true);
    }, [Message]);

    const extractUniqueTrademarks = (products) => {
        const trademarks = products.map(product => product.nameBrand);
        const uniqueTrademarks = ['all', ...new Set(trademarks)];
        setUniqueTrademarks(uniqueTrademarks);
    };

    const handleTrademarkChange = (event) => {
        setSelectedTrademark(event.target.value);
    };

    const handlePriceChange = (productbarCode, newPrice) => {
        console.log(productbarCode, newPrice);
        setProducts(prevProducts => prevProducts.map(product => 
            product.barCode === productbarCode ? { ...product, newPrice } : product
        ));
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        console.log(selectedDate);
    };

    const prefix = localStorage.getItem("front-prefix") || '';

    const handleNavigate = () => {
        navigate(`/${prefix}/import`, { state: { products } });
    };

    const handleNavigateRequest = () => {
        navigate(`/${prefix}/suplier/requests`, { state: { products } });
    };

    const handleSubmit = async () => {
        const updatedProducts = products.filter(product => product.newPrice != null && product.newPrice != 0);

        const requestPayload = {
            Supliers: updatedProducts,
            ProductUpdateDate: selectedDate
        };
        console.log(selectedDate);
        const currentDate = new Date();
        const datePlusWeek = new Date(currentDate);
        datePlusWeek.setDate(currentDate.getDate() + 7);

        const selectedDateObject = new Date(selectedDate);
        console.log(selectedDateObject);
        if (selectedDateObject == 'Invalid Date') {
            setMessage("Оберіть дату початку ");
            return;
        }

        if (selectedDateObject <= datePlusWeek) {
            setMessage("Дата початку має бути мінімум через тиждень від сьогоднішнього дня");
            return;
        }
        try {
            const response = await axios.post(`${localStorage.getItem("back-prefix")}/Supplyer/Positions/Create/Changes`, requestPayload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('Price change request submitted successfully');
                setMessage("Ціну оновлено");
                setResetTrigger(!resetTrigger);
            } else {
                setMessage("Ціну не оновлено");
            }
        } catch (error) {
            console.error('There was an error submitting the price change request', error);
        }
    };

    const CloseError = () => {
        setMessageVisibility(false);
    };

    useEffect(() => { console.log(products) }, [products]);

    const filteredProducts = selectedTrademark === 'all' ? products : products.filter(product => product.nameBrand === selectedTrademark);

    return (
        <div className="suplier-container">
            {messageVisibility ?
                <NotificationMessage Close={CloseError} message={Message} /> :
                <div></div>
            }
            <div className="suplier-position-container">
                <div className="suplier-position-text">Продукція</div>
                <div className="suplier-choose-container">
                    <button className='suplier-navigate-button' onClick={handleNavigate}>Загрузити таблицю</button>
                    <button className='suplier-navigate-button2' onClick={handleNavigateRequest}> Переглянути попередні оновлення</button>
                    <button className='suplier-submit-button' onClick={handleSubmit}>Оновити ціни продуктів</button>
                    <input value={selectedDate || ''} type="date" id="date-picker" onChange={handleDateChange} />
                    <select className="suplier-select" value={selectedTrademark} onChange={handleTrademarkChange}>
                        {uniqueTrademarks.map(trademark => (
                            <option key={trademark} value={trademark}>{trademark}</option>
                        ))}
                    </select>
                </div>
                <div className="suplier-product-list-container">
                    <div className='suplier-product-list-name'>Назва</div>
                    <div className='suplier-product-list-text'>Торгова марка</div>
                    <div className='suplier-product-list-text'>Код</div>
                    <div className='suplier-product-list-text'>Артикул</div>
                    <div className='suplier-product-list-text'>Ціна</div>
                    <div className='suplier-product-list-status'>Статус</div>

                    <div className='suplier-product-list-newprice'>Оновлена Ціна</div>
                </div>
                <div className="supier-product-list">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} resetTrigger={resetTrigger} onPriceChange={handlePriceChange} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SupplierProducts;

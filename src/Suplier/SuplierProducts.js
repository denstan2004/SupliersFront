import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SuplierProducts.css';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';

function SupplierProducts() {
    const [products, setProducts] = useState([]);
    const [uniqueTrademarks, setUniqueTrademarks] = useState([]);
    const [selectedTrademark, setSelectedTrademark] = useState('all');
    const [selectedDate, setSelectedDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        axios.get('https://localhost:7184/api/Positions/GetAll', {
            withCredentials: true 
        })
        .then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setProducts(response.data);
                extractUniqueTrademarks(response.data);
                localStorage.setItem("suplierProducts", JSON.stringify(response.data));
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

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

    const handleNavigate = () => {
        navigate('/import', { state: { products } });
    };

    const handleSubmit = async () => {
        const updatedProducts = products.filter(product => product.newPrice != null);

        const requestPayload = {
            Supliers: updatedProducts,
            Comment: "Updated prices",
            CreationDate: new Date(),
            ProductUpdateDate:selectedDate
        };

        try {
            const response = await axios.post('https://localhost:7184/Create/Changes', requestPayload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('Price change request submitted successfully');
                // Додаткова логіка після успішного відправлення
            }
        } catch (error) {
            console.error('There was an error submitting the price change request', error);
        }
    };

    useEffect(() => { console.log(products) }, [products]);

    const filteredProducts = selectedTrademark === 'all' ? products : products.filter(product => product.nameBrand === selectedTrademark);

    return (
        <div className="suplier-container">
            <div className="suplier-position-container">
                <div className="suplier-position-text">Продукція</div>
                <div className="suplier-choose-container">
                    <button className='suplier-navigate-button' onClick={handleNavigate}>Загрузити таблицю</button>
                    <button className='suplier-submit-button' onClick={handleSubmit}>Оновити ціни продуктів</button>
                    <input value={selectedDate || ''} type="date" id="date-picker" onChange={handleDateChange} />
                    <select className="suplier-select" value={selectedTrademark} onChange={handleTrademarkChange}>
                        {uniqueTrademarks.map(trademark => (
                            <option key={trademark} value={trademark}>{trademark}</option>
                        ))}
                    </select>
                </div>
                <div className="supier-product-list">
                    <div className='suplier-product-list-container'>
                        <div className='suplier-product-list-name'>Назва</div>
                        <div className='suplier-product-list-text'>Торгова марка</div>
                        <div className='suplier-product-list-text'>Код</div>
                        <div className='suplier-product-list-text'>Артикул</div>
                        <div className='suplier-product-list-text'>Ціна</div>
                        <div className='suplier-product-list-text'>Оновлена Ціна</div>
                    </div>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onPriceChange={handlePriceChange} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SupplierProducts;

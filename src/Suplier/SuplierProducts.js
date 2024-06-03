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
        const trademarks = products.map(product => product.trademark);
        const uniqueTrademarks = ['all', ...new Set(trademarks)];
        setUniqueTrademarks(uniqueTrademarks);
    };

    const handleTrademarkChange = (event) => {
        setSelectedTrademark(event.target.value);
    };

    const handlePriceChange = (productId, newPrice) => {
        setProducts(prevProducts => prevProducts.map(product => 
            product.id === productId ? { ...product, newPrice } : product
        ));
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        console.log (selectedDate);
    };

    const handleNavigate = () => {
        navigate('/import', { state: { products } });
    };
    
    const filteredProducts = selectedTrademark === 'all' ? products : products.filter(product => product.trademark === selectedTrademark);

    return (
        <div className="suplier-container">
            <div className="suplier-position-container">
                <div className="suplier-position-text">Продукція</div>
                <div className="suplier-choose-container">
                    <button className='suplier-submit-button' onClick={handleNavigate}>Перейти до цільової сторінки</button>
                    <input value={selectedDate || ''} type="date" id="date-picker" onChange={handleDateChange}></input>
                    <select className="suplier-select" value={selectedTrademark} onChange={handleTrademarkChange}>
                        {uniqueTrademarks.map(trademark => (
                            <option key={trademark} value={trademark}>{trademark}</option>
                        ))}
                    </select>
                </div>
                <div className="supier-product-list">
                    <div className='suplier-product-list-text'>
                        <div>Назва</div>                      
                        <div>Торгова марка</div>
                        <div>Код</div>
                        <div>Артикул</div>
                        <div>Ціна</div>
                        <div>Оновлена Ціна</div>
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

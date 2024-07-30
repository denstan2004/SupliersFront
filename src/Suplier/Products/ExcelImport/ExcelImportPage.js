import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useLocation } from 'react-router-dom';
import ProductCardExcel from './../../../Products/ProductCardExel';
import ProductCardNotFound from './../../../Products/ProductCardNotFound';
import AprovePage from './Aprove/AprovePage';
import './ExcelImportPage.css';
import axios from 'axios';
import ExcelExample from './ExcelExample/ExcelExample';
import NotificationMessage from './../../../Helpers/NotificationMessage';

function ExcelParser() {
    const [data, setData] = useState([]);
    const [dataMatched, setDataMatched] = useState([]);
    const [dataUnmatched, setDataUnmatched] = useState([]);
    const [allMatched, setAllMatched] = useState(true);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isExampleVisible, setExampleVisible] = useState(false);
    const location = useLocation();
    const [aproveText, setAproveText] = useState("Відправити оновлення?");
    const { products: locationProducts } = location.state || {};
    const [products, setProducts] = useState(locationProducts || JSON.parse(localStorage.getItem("suplierProducts")) || []);
    const [selectedDate, setSelectedDate] = useState('');
    const [Message, setMessage] = useState('');
    const [messageVisibility, setMessageVisibility] = useState(false);

    const CloseMessage = () => {
        setMessageVisibility(false);
        setMessage('');
    };

    useEffect(() => {
        if (!products || products.length === 0) {
            fetchProducts();
        }
    }, [products]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://localhost:7184/api/Positions/GetAll', {
                withCredentials: true 
            });

            if (response.status === 200 && response.data.data) {
                setProducts(response.data.data);
                localStorage.setItem("suplierProducts", JSON.stringify(response.data.data));
            } else {
                setMessage(response.data.textState || 'No products found');
            }
        } catch (error) {
            console.error('There was an error!', error);
            setMessage('Failed to fetch products');
        }
    };

    useEffect(() => {
        if (Message !== '') setMessageVisibility(true);
    }, [Message]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const filteredData = parsedData
                .filter(row => row.length > 0 && row[0] !== undefined)
                .map(row => ({
                    barcode: row[0],
                    name: row[1],
                    price: row[2]
                }));

            setData(filteredData);
        };

        reader.readAsBinaryString(file);
    };

    useEffect(() => {
        if (data.length > 0 && products) {
            let matched = [];
            let unmatched = [];
            let isUnmatched = false;
            setAproveText("Відправити оновлення?");
            data.forEach(row => {
                let isPresent = false;

                products.forEach(product => {
                    if (product.barCode === row.barcode) {
                        isPresent = true;
                        product.newPrice = row.price;
                        matched.push(product);
                    }
                });

                if (!isPresent) {
                    unmatched.push(row);
                    isUnmatched = true;
                }
            });

            if (isUnmatched) {
                setAproveText("Співпадіння по всім товарам не знайдено. Відправити позиції що співпали на оновлення?");
                setAllMatched(false);
            }

            setDataMatched(matched);
            setDataUnmatched(unmatched);
        }
    }, [data, products]);

    useEffect(() => {
        console.log(dataMatched, "datamatched");
    }, [dataMatched]);

    useEffect(() => {
        console.log(dataUnmatched, "dataUnmatched");
    }, [dataUnmatched]);

    const onFormSubmit = () => {
        setIsPopupVisible(true);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        console.log(selectedDate);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const handleCloseExample = () => {
        setExampleVisible(false);
    };

    const handleOpenExample = () => {
        setExampleVisible(true);
    };

    const handleSubmit = async () => {
        const requestPayload = {
            Supliers: dataMatched,
            ProductUpdateDate: selectedDate
        };
        const currentDate = new Date();
        const datePlusWeek = new Date(currentDate);
        datePlusWeek.setDate(currentDate.getDate() + 7);

        const selectedDateObject = new Date(selectedDate);
        if (selectedDate === null || selectedDate === '') {
            setMessage('оберіть дату');
            return;
        }
        if (selectedDateObject <= datePlusWeek) {
            setMessage("Дата початку має бути мінімум через тиждень від сьогоднішнього дня");
            return;
        }
        console.log(123)
        try {
            const response = await axios.post(`${localStorage.getItem("back-prefix")}/Supplyer/Positions/Create/Changes`, requestPayload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                setMessage(response.data.textState);
                // Додаткова логіка після успішного відправлення
            }
        } catch (error) {
            console.error('There was an error submitting the price change request', error);
        }

        setIsPopupVisible(false);
    };

    return (
        <div>
            {messageVisibility && (
                <NotificationMessage Close={CloseMessage} message={Message} />
            )}
            <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
            <div onClick={handleOpenExample} className="allproducts-info-icon">
                ?
            </div>
            <button onClick={onFormSubmit} className='excel-submit-button'>Оновити ціни продуктів</button>
            {isPopupVisible && <AprovePage className="aprove" onSubmit={handleSubmit} text={aproveText} onClose={handleClosePopup} />}
            <input value={selectedDate || ''} type="date" id="date-picker" onChange={handleDateChange} />
            {isExampleVisible && <ExcelExample handleCloseExample={handleCloseExample} />}
            <div className="supier-product-list">
                <div className='suplier-excel-product-list-container'>
                    <div className='suplier-excel-product-list-name'>Назва</div>
                    <div className='suplier-excel-product-list-text'>Торгова марка</div>
                    <div className='suplier-excel-product-list-text'>Код</div>
                    <div className='suplier-excel-product-list-text'>Артикул</div>
                    <div className='suplier-excel-product-list-text'>Ціна</div>
                    <div className='suplier-excel-product-list-status'>Статус</div>
                    <div className='suplier-excel-product-list-newprice'>Оновлена Ціна</div>
                </div>
                {dataMatched.map(product => (
                    <ProductCardExcel key={product.id} product={product} />
                ))}
                {dataUnmatched.map(product => (
                    <ProductCardNotFound key={product.barcode} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ExcelParser;

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useLocation } from 'react-router-dom';
import ProductCardExcel from './../Products/ProductCardExel'
import ProductCardNotFound from '../Products/ProductCardNotFound';
import AprovePage from './Aprove/AprovePage'
import './ExcelImportPage.css'
import axios from 'axios';
function ExcelParser() {
    const [data, setData] = useState([]);
    const [dataMatched, setDataMatched] = useState([]);
    const [dataUnmatched, setDataUnmatched] = useState([]);
    const [allMatched, setAllMatched]= useState(true);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const location = useLocation();
    const [aproveText, setAproveText]=useState("Відправити оновлення?")
    const { products } = location.state || {};
    const [selectedDate, setSelectedDate] = useState('');

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
            let IsUnmatched=false;
            setAproveText("Відправити оновлення?")

            data.forEach(row => {
                let isPresent = false;
                let temp;
                
                products.forEach(product => {
                    console.log (product.barCode)
                    if (product.barCode === row.barcode) {
                       
                        isPresent = true;
                        product.newPrice=row.price;
                        matched.push(product);
                    }
                });
                if (!isPresent) {
                    unmatched.push(row);
                    IsUnmatched=true;
                }
            });
            if(IsUnmatched){
            
            setAproveText("Співпадіння по всім товарам не знайдено. Відправити позиції що співпали на оновлення?")
                setAllMatched(false);
            }
            setDataMatched(matched);
            setDataUnmatched(unmatched);
        }
    }, [data]);

    useEffect(() => {
        console.log(dataMatched, "datamatched");
    }, [dataMatched]);

    useEffect(() => {
        console.log(dataUnmatched, "dataUnmatched");
    }, [dataUnmatched]);
    const onFormSubmit =()=>{
        setIsPopupVisible(true);

    }
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        console.log(selectedDate);
    };
    const handleClosePopup = () => {
        setIsPopupVisible(false);
      };
      const handleSubmit = async () => {
        const requestPayload = {
            Supliers: dataMatched,
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
        setIsPopupVisible(false);
      };

    return (
        <div>
             <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
            <button onClick={onFormSubmit} className='excel-submit-button'>Оновити ціни продуктів</button> 
            {isPopupVisible && <AprovePage  className="aprove" onSubmit={handleSubmit} text={aproveText} onClose={handleClosePopup} />}
            <input value={selectedDate || ''} type="date" id="date-picker" onChange={handleDateChange} />
            <div className="supier-product-list">
                    <div className='suplier-product-list-container'>
                        <div className='suplier-product-list-name'>Назва</div>
                        <div className='suplier-product-list-text'>Торгова марка</div>
                        <div className='suplier-product-list-text'>Код</div>
                        <div className='suplier-product-list-text'>Артикул</div>
                        <div className='suplier-product-list-text'>Ціна</div>
                        <div className='suplier-product-list-text'>Оновлена Ціна</div>
                    </div>
                    {dataMatched.map(product => (
                        <ProductCardExcel key={product.id} product={product}  />
                    ))}
                    {dataUnmatched.map(product =>(
                        <ProductCardNotFound key={product.barcode} product={product}/>
                    ))}
                </div>
        </div>
    );
}

export default ExcelParser;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  './AllProducts.css';
import { useNavigate } from 'react-router-dom';
import ProductCardDiscount from './ProductCardDiscount/ProductCardDiscount';
import NotificationMessage from './../../../Helpers/NotificationMessage'
function AllProducts() {
    const [products, setProducts] = useState([]);
    const [uniqueTrademarks, setUniqueTrademarks] = useState([]);
    const [selectedTrademark, setSelectedTrademark] = useState('all');
    const [selectedDiscountPeriod, setSelectedDiscountPeriod] = useState('');
    const [discountPeriods, setDiscountPeriods] = useState([]);
    const [updatedProducts, setUpdatedProducts] = useState([]);
    const [allDiscountsAdresses, setAllDiscountsAdresses] = useState([]);
    const [discountsAdresses, setDiscountsAdresses] = useState([]);
    const [resetTrigger, setResetTrigger] = useState(false);
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

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        fetchDiscountPeriods();
        fetchDiscountAdresses();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("back-prefix")}/Supplyer/Positions/GetAll`, {
                withCredentials: true
            });
            if (response.status === 200) {
                if(response.data.status===true)
                {
                setProducts(response.data.data);
                console.log(response.data)
                extractUniqueTrademarks(response.data.data);
                localStorage.setItem("suplierProducts", JSON.stringify(response.data.data));
                }
                else{
                    setMessage('Неможливо загрузити позиції')
                }
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const fetchDiscountPeriods = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("back-prefix")}/Discount/GetAll/Time`, {
                withCredentials: true
            });
            if (response.status === 200) {
                if(response.data.status===true)
                    {
                        setDiscountPeriods(response.data.data);
                    }
                else{
                        setMessage("Неможливо загрузити періоди");
            }
                console.log(response.data)
            }
        } catch (error) {
            console.error('There was an error fetching discount periods!', error);
        }
    };

    const fetchDiscountAdresses = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("back-prefix")}/Discount/GetAll/Adress`, {
                withCredentials: true
            });
            if (response.status === 200) {
                if(response.data.status===true)
                {
                setAllDiscountsAdresses(response.data.data);
                }
                else{
                        setMessage("Неможливо загрузити адреси");
                }
                console.log(response.data)
                
            }
        } catch (error) {
            console.error('There was an error fetching discount periods!', error);
        }
    };

    const extractUniqueTrademarks = (products) => {
        const trademarks = products.map(product => product.nameBrand);
        const uniqueTrademarks = ['all', ...new Set(trademarks)];
        setUniqueTrademarks(uniqueTrademarks);
    };

    const handleTrademarkChange = (event) => {
        setSelectedTrademark(event.target.value);
    };

    const handleDiscountPeriodChange = (event) => {
        setSelectedDiscountPeriod(event.target.value);
        const newAdresses = [];
        allDiscountsAdresses.forEach(adress => {
            if (adress.number === event.target.value) {
                if (adress.adress !== null || adress.name)
                    newAdresses.push(adress);
            }
        });
        console.log(allDiscountsAdresses)
        setDiscountsAdresses(newAdresses);
    };

    const updateProduct = (updatedProduct) => {
        setProducts(products.map(product =>
            product.barCode === updatedProduct.barCode ? { ...product, ...updatedProduct } : product
        ));

        setUpdatedProducts(prev => {
            const existingProduct = prev.find(product => product.barCode === updatedProduct.barCode);

            if (existingProduct) {
                const updatedFields = { ...existingProduct, ...updatedProduct };
                const isEmpty = Object.keys(updatedFields).every(key => updatedFields[key] === '' || updatedFields[key] === null || updatedFields[key] === undefined);

                if (isEmpty) {
                    return prev.filter(product => product.barCode !== updatedProduct.barCode);
                } else {
                    return prev.map(product =>
                        product.barCode === updatedProduct.barCode ? updatedFields : product
                    );
                }
            } else {
                return [...prev, updatedProduct];
            }
        });
    };

    const handleAddDiscounts = async () => {
        const selectedPeriod = discountPeriods.find(period => period.number === selectedDiscountPeriod);

        if (!selectedPeriod) {
            console.error('Selected discount period not found!');
            setMessage("Виберіть період акції")
            return;
        }

        const DiscountNumber = selectedPeriod.number;
        console.log(selectedPeriod.number);

        const discountPositions = updatedProducts.map(product => ({
            discountInitPrice: product.discountEntryPrice,
            compensationAmount: product.compensationSum,
            planedSales: product.plannedSales,
            discountPrice: product.discountPrice,
            codewares: product.codeWares
        }));

        console.log(discountPositions);

        const payload = {
            DiscountNumber,
            discountPositions
        };
        try {   
            const response = await axios.post(`${localStorage.getItem("back-prefix")}/Discount/Create/Suplier`, payload, {
                withCredentials: true
            });
            if (response.status === 200) {
                if(response.data.status===true)
                {
                console.log('Discounts added successfully:', response.data);
                setMessage("знижку додано")

                setResetTrigger(!resetTrigger);
                }
                else{
                    setMessage("Невдалося додати знижку")
                }
            }
            else{
                
            }
        } catch (error) {
            setMessage("Невдалося додати знижку")
            console.error('There was an error adding discounts!', error);
        }
    };

    const formatAdressTooltip = (adresses) => {
        console.log(adresses); // Додане логування для перевірки вмісту адрес
        return adresses.map(adress => `${adress.name}, ${adress.adress}`).join('\n');
    };

    

    const handleDiscountRequestNavigate = () => {
        navigate(`/suplier/discount/requests`);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    };

    const filteredProducts = selectedTrademark === 'all' ? products : products.filter(product => product.nameBrand === selectedTrademark);

    return (
        <div className="allproducts-container">
             {messageVisibility && (
                <NotificationMessage Close={CloseMessage} message={Message} />
            )}
            <div className="allproducts-position-container">
                <div className='allproducts-position-header'>
                    <div className="allproducts-position-text">Продукція</div>
                    <div className="allproducts-choose-container">
                          <div className="allproducts-select-group">
                            <select className="allproducts-select" value={selectedTrademark} onChange={handleTrademarkChange}>
                               {uniqueTrademarks.map(trademark => (
                                  <option key={trademark} value={trademark}>{trademark}</option>
                              ))}
                           </select>
                         <select className="allproducts-select" value={selectedDiscountPeriod} onChange={handleDiscountPeriodChange}>
                                <option value="">Виберіть період акції</option>
                                {discountPeriods.map((period, index) => (
                                     <option key={index} value={period.number}>
                                       {` (${period.comment}) ${formatDate(period.dateStart)} - ${formatDate(period.dateEnd)}`}
                                      </option>
                                 ))}
                           </select>
                          <div className="allproducts-info-icon" title={formatAdressTooltip(discountsAdresses)}>
                              ?
                           </div>
                     </div>
                     <button className="allproducts-submit-button" onClick={handleDiscountRequestNavigate}>
                            Подані акції
                     </button>
                     <button className="allproducts-submit-button" onClick={handleAddDiscounts}>
                        Додати акцію
                     </button>
                 </div>
               
                <div className="allproducts-product-list">
                    <div className='allproducts-product-list-container'>
                        <div className='allproducts-discount-list-name'>Назва</div>
                        <div className='allproducts-product-list-text'>Торгова марка</div>
                        <div className='allproducts-product-list-text'>Код</div>
                        <div className='allproducts-product-list-text'>Артикул</div>
                        <div className='allproducts-product-list-price'>Ціна</div>
                        <div className='allproducts-product-list-text-discount'>Акційна ціна</div>
                        <div className='allproducts-product-list-text-discount'>Акційна вхідна ціна</div>
                        <div className='allproducts-product-list-text-compensation-sum'>Сума компенсації шт/кг</div>
                        <div className='allproducts-product-list-text-discount'>Планові продажі</div>
                    </div>
                    </div>
                    {filteredProducts.map(product => (
                        <ProductCardDiscount
                            key={product.barCode}
                            product={product}
                            updateProduct={updateProduct}
                            resetTrigger={resetTrigger}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllProducts;






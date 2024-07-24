import React, { useState, useEffect } from 'react';
import './ProductCardDiscount.css';

function ProductCardDiscount({ product, updateProduct, resetTrigger }) {
    const [discountPrice, setDiscountPrice] = useState(product.discountPrice || '');
    const [discountEntryPrice, setDiscountEntryPrice] = useState(product.discountEntryPrice || '');
    const [compensationSum, setCompensationSum] = useState(product.compensationSum || '');
    const [plannedSales, setPlannedSales] = useState(product.plannedSales || '');
    const [error, setError] = useState('');

    useEffect(() => {
        setDiscountPrice('');
        setDiscountEntryPrice('');
        setCompensationSum('');
        setPlannedSales('');
    }, [resetTrigger]);

    const handleInputChange = (e, setter, name) => {
        const { value } = e.target;
        setter(value);
        const updatedProduct = { ...product, [name]: value };
        updateProduct(updatedProduct);

        if (name === 'discountPrice' && value === '') {
            setDiscountEntryPrice('');
            setCompensationSum('');
            setPlannedSales('');
            updateProduct({ ...product, discountPrice: '', discountEntryPrice: '', compensationSum: '', plannedSales: '' });
        }

        if (name === 'discountPrice' && value !== '') {
            setError('');
        }
    };

    return (
        <div className="product-container">
            <div className="productcard-name-discount">{product.nameWares}</div>
            <div className="productcard-item">{product.nameBrand}</div>
            <div className="productcard-item">
                {product.barCodes.length > 1 ? (
                    <select>
                        {product.barCodes.map((code, index) => (
                            <option key={index} value={code}>
                                {code}
                            </option>
                        ))}
                    </select>
                ) : (
                    <div>{product.barCode}</div>
                )}
            </div>
            <div className="productcard-item">{product.aritcle}</div>
            <div className="productcard-price">{product.price}</div>
            <div className="productcard-item">
                <input
                    type="text"
                    name="discountPrice"
                    value={discountPrice}
                    onChange={(e) => handleInputChange(e, setDiscountPrice, 'discountPrice')}
                    placeholder="Акційна ціна"
                    className="productcard-input"
                />
            </div>
            <div className="productcard-item">
                <input
                    type="text"
                    name="discountEntryPrice"
                    value={discountEntryPrice}
                    onChange={(e) => handleInputChange(e, setDiscountEntryPrice, 'discountEntryPrice')}
                    placeholder="Акційна вхідна ціна"
                    className="productcard-input"
                    disabled={!discountPrice}
                />
            </div>
            <div className="productcard-item-compensation">
                <input
                    type="text"
                    name="compensationSum"
                    value={compensationSum}
                    onChange={(e) => handleInputChange(e, setCompensationSum, 'compensationSum')}
                    placeholder="Сума компенсації"
                    className="productcard-input"
                    disabled={!discountPrice}
                />
            </div>
            <div className="productcard-item">
                <input
                    type="text"
                    name="plannedSales"
                    value={plannedSales}
                    onChange={(e) => handleInputChange(e, setPlannedSales, 'plannedSales')}
                    placeholder="Планові продажі"
                    className="productcard-input"
                    disabled={!discountPrice}
                />
            </div>
            {error && <div className="productcard-input-error">{error}</div>}
        </div>
    );
}

export default ProductCardDiscount;

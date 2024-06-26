import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onPriceChange }) {
    const handleChange = (event) => {
        onPriceChange(product.barCode, event.target.value);
    };

    return (
        <div className="product-container">
            <div className="product-name">{product.nameWares}</div>
            <div className="product-item">{product.nameBrand}</div>
            <div className="product-item">
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
            <div className="product-item">{product.aritcle}</div>
            <div className="product-item">{product.price}</div>
            <input 
                placeholder='Оновлена ціна'
                value={product.newPrice || ''}
                onChange={handleChange}
            />
        </div>
    );
}

export default ProductCard;

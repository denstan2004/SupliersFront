import React from 'react';
import { useEffect } from 'react';
import './ProductCard.css';

function ProductCard({ product, onPriceChange,resetTrigger }) {
    const handleChange = (event) => {
        onPriceChange(product.barCode, event.target.value);
    };
    useEffect(() => {
     product.newPrice='';
    }, [resetTrigger]);

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
            {product.isExpired===false ?
              <div className={
                product.status === "Pennding" 
                ? "suplier-request-card-status-orange" 
                : product.status === "Accepted"
                ? "suplier-request-card-status-green"
                : "suplier-request-card-status-red"
            }>
                {product.status}
            </div >  
            :
             <div className="suplier-request-card-status-orange" />
            }
            <input className="suplier-product-card-input"
                placeholder='Оновлена ціна'
                value={product.newPrice || ''}
                onChange={handleChange}
            />
        </div>
    );
}

export default ProductCard;

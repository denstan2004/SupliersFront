import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onPriceChange }) {
    const handleChange = (event) => {
        onPriceChange(product.id, event.target.value);
    };

    return (
        <div className="product-item">
            <div>{product.positionName}</div>
            <div>{product.trademark}</div>
            <div>{product.positionCode}</div>
            <div>{product.aritcle}</div>
            <div>{product.price}</div>
            <input
                placeholder='Оновлена ціна'
                value={product.newPrice || ''}
                onChange={handleChange}
            />
        </div>
    );
}

export default ProductCard;

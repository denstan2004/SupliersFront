import React from 'react';
import './ProductCardNotFound.css'
function ProductCardNotFound ({ product }) {
  

    return (
        <div className="product-item">
            <div className="not-found-text">{product.barcode}</div>
            <div className="not-found-text">{product.name}</div>  
            <div className="not-found-text">{product.price}</div>
            <div className="not-found">Збігів не знайдено</div>
         
        </div>
    );
}

export default ProductCardNotFound;

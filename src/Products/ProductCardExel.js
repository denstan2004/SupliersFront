import React from 'react';
import './ProductCard.css';

function ProductCardExcel({ product }) {
  

    return (
        <div className="product-item">
            <div>{product.positionName}</div>
            <div>{product.trademark}</div>
            <div>{product.positionCode}</div>
            <div>{product.aritcle}</div>
            <div>{product.price}</div>
            <div>{product.newPrice}</div>
        </div>
    );
}

export default ProductCardExcel;

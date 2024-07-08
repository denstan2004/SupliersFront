import React from 'react';
import './ProductCard.css';

function ProductCardExcel({ product }) {
  

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
                : product.status === "Approved"
                ? "suplier-request-card-status-green"
                : "suplier-request-card-status-red"
            }>
                {product.status}
            </div>  
            :
             <div className="suplier-request-card-status-orange" />
            }
            <div className="product-item">{product.newPrice}</div>

            
        </div>
    );
}

export default ProductCardExcel;

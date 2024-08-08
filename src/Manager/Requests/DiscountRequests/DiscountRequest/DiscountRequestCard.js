import React, { useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import './DiscountRequest.css'

function DiscountRequestCard ({request,removeRequest,setmessagefunc}){

    const [comment, setComment] = useState("");

    const handleApprove = async () => {
        const requestPayload = {
            status: "Accepted",
            comment: comment,
            codewares: request.suplierPostition.codeWares,
            number: request.discountPeriods.number
        };
        try {
            console.log(requestPayload)
            const response = await axios.post(`${localStorage.getItem("back-prefix")}/Discount/Update/status/Manager`, requestPayload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                if(response.data.status===true)
                    {
                        console.log('Price change request submitted successfully');
                        setmessagefunc("Відповідь відправлена")
                        setComment("");
                        removeRequest(request.suplierPostition.codeWares, request.adressModel.number); // Видалення запиту після успішного оновлення
                   

                    }
                    else{
                        console.log(response.data.textState)
                        setmessagefunc("Відповідь не відправлена")
                    }

            }
        } catch (error) {
            console.error('There was an error submitting the price change request', error);
        }
    };

    const handleDecline = async () => {
        console.log(request);
        const requestPayload = {
            status: "Rejected",
            comment: comment,
            codewares: request.suplierPostition.codeWares,
            number: request.discountPeriods.number
        };

        try {
            const response = await axios.post(`${localStorage.getItem("back-prefix")}/Discount/Update/status/Manager`, requestPayload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                if(response.data.status===true)
                    {
                        console.log('Price change request submitted successfully');
                       // Видалення запиту після успішного оновлення
                        setmessagefunc("Відповідь  відправлена")
                        setComment("");
                        removeRequest(request.suplierPostition.codeWares, request.adressModel.number); 

                    }
                    else{
                        console.log(response.data.textState)
                        setmessagefunc("Відповідь не відправлена")
                    }


            }
        } catch (error) {
            console.error('There was an error submitting the price change request', error);
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    };
//  <div className="discount-card-name">{request.suplierPostition.groupName}</div>  

    return(
        <div className="product-container">
            <div className="discount-card-name" >{request.suplierPostition.nameWares}</div>
            <div className="discount-card-group-name">{request.suplierPostition.groupName}</div>
            <div className="discount-card-trademark">{request.suplierPostition.nameBrand}</div>
    
            <div className="suplier-discount-card-adress">
                {request.adressModel.map((adress, index) => (
                   <div key={index}>{adress.name}</div>
                ))}
            </div>  
            <div className="discount-card-adress-comment">{request.discountPeriods.comment}</div>
            <div className="discount-card-price">{request.discountPrice}</div>
            <div className="discount-card-price">{request.discountInitPrice}</div>
            <div className="discount-card-price" >{request.compensationAmount}</div>
            <div className="discount-card-price">{request.plannedSales}</div>
            <div className="discount-card-date"> 
                <div>
                {formatDate(request.discountPeriods.dateStart)}
                                </div>
                <div>
                {formatDate(request.discountPeriods.dateEnd)
                }                </div>
                </div>       
            <div className="manager-request-buttons-container">
                <input  className="manager-request-comment"value={comment} onChange={handleCommentChange} />
                <button className="manager-button-approve" onClick={handleApprove}>
                    <FaCheck className="check" />
                </button>
                <button className="manager-button-reject" onClick={handleDecline}>
                    <FaTimes className="check" />
                </button>
            </div>
        </div>
    )

}
export default DiscountRequestCard
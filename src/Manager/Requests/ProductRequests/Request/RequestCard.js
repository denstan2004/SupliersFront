import React, { useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import './RequestCard.css'
function RequestCard({ request, removeRequest, setmessagefunc}) {
    const [comment, setComment] = useState("");

    const handleApprove = async () => {
        const requestPayload = {
            status: "Accepted",
            commentspec: comment,
            codewares: request.codeWares,
            codefirm: request.codeFirm
        };

        try {
            const response = await axios.post(`${localStorage.getItem("back-prefix")}/Supplyer/Request/Update`, requestPayload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log(response.data)

              
                if(response.data.status===true)
                    {
                        setmessagefunc("Відповідь відправлена")
                        removeRequest(request.codeWares, request.codeFirm);
                       
                        setComment("");
                        
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
        const requestPayload = {
            status: "Rejected",
            commentspec: comment,
            codewares: request.codeWares,
            codefirm: request.codeFirm
        };

        try {
            const response = await axios.post('https://localhost:7184/api/Request/Update', requestPayload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log(response.data)

                if(response.data.status===true)
                    {
                        setmessagefunc("Відповідь відправлена")
                        removeRequest(request.codeWares, request.codeFirm);
                       
                        setComment("");

                    }
                    else{
                        console.log(response.data.textState)
                        setmessagefunc("Відповідь не відправлена")
                    }

            }
        } 
        catch (error) {
            console.error('There was an error submitting the price change request', error);
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <div className="product-container">
            <div className="manager-request-item-name">{request.nameWares}</div>
            <div className="manager-request-item">{request.groupName}</div>
            <div className="manager-request-item">{request.nameBrand}</div>
        
            <div className="manager-request-item">{request.price}</div>
            <div className="manager-request-item">{request.updatedPrice}</div>
            <div className={request.changePercent > 10 || request.changePercent < 0 ? "percent-line" : "manager-request-item"}>{request.changePercent}%</div>
            <div className="manager-request-item">{new Date(request.dateStart).toLocaleDateString()}</div>
            <div></div>
            <div className="manager-request-buttons-container">
                <input placeholder='залиште коментар' className="manager-request-comment"value={comment} onChange={handleCommentChange} />
                <button className="manager-button-approve" onClick={handleApprove}>
                    <FaCheck className="check" />
                </button>
                <button className="manager-button-reject" onClick={handleDecline}>
                    <FaTimes className="check" />
                </button>
            </div>
        </div>
    );
}

export default RequestCard;

import axios from "axios";
import { useEffect, useState } from "react"
import SuplierDiscountRequest from "./DiscountRequest/SuplierDiscountRequest"
function SuplierDiscountRequests(){

    const [requests,setRequests] = useState([]);
    useEffect(()=>{
        fetchData();
    },[])
    const  fetchData= async ()=>{
       
        try {
            const response = await axios.get("https://localhost:7184/api/Discount/GetAllRequests/Suplier", {
                withCredentials: true
            });
            if (response.status === 200) {
                setRequests(response.data);
                console.log(response.data)
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    }
    return(
        <div>
            <div className='suplier-product-list-container'>
                <div className="discount-request-list-name">Назва</div>
                <div className="discount-request-list-name">Назва Групи</div>
                <div className="discount-request-list-trademark">Торгова марка</div>
                <div className="discount-request-list-adress">Назва точки</div>
                <div className="discount-request-list-adress">Коментарій</div>
                <div className="discount-request-list-price">Акційна ціна</div>
                <div className="discount-request-list-price">Акційна вхідна ціна</div>
                <div className="discount-request-list-price">Сума компенсації</div>
                <div className="discount-request-list-price">Планові продажі</div>
                <div className="discount-request-list-date">Період</div>
                <div className="discount-request-list-comment">Коментарій</div>

                <div className="discount-request-list-status">Статус</div>






            </div>
              {requests.map((request,index) => (
                <SuplierDiscountRequest key={index} request={request}  />
            ))}
        </div>
    );
}
export default SuplierDiscountRequests
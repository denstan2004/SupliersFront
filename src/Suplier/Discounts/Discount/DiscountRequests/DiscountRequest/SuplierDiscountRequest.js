import './SuplierDiscountRequest.css';
import { Reliability, Time, Delete }  from '@carbon/pictograms-react';// Використовуй іконки з цієї бібліотеки

function SuplierDiscountRequest({ request }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 0:
                return "status-pending";
            case 1:
                return "status-rejected";
            case 2:
                return "status-accepted";
            default:
                return "";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
           
                case 2:
                    return  <Reliability className="suplier-discount-card-status-green" />; 
                case 0:
                    return <Time  className="suplier-discount-card-status-orange" />; 
                case 1:
                    return <Delete  className="suplier-discount-card-status-red" />;
                default:
                    return null;
        }
    };

    return (
        <div className="product-container">
    <div className="suplier-discount-card-name">{request.suplierPostition.nameWares}</div>
    <div className="suplier-discount-card-name">{request.suplierPostition.groupName}</div>
    <div className="suplier-discount-card-trademark">{request.suplierPostition.nameBrand}</div>
    <div className="suplier-discount-card-adress">
        {request.adressModel.map((adress, index) => (
            <div key={index}>{adress.name}</div>
        ))}
    </div>
    <div className="suplier-discount-card-adresscomment">{request.discountPeriods.comment}</div>
    <div className="suplier-discount-card-price">{request.discountPrice}</div>
    <div className="suplier-discount-card-price">{request.discountInitPrice}</div>
    <div className="suplier-discount-card-price">{request.compensationAmount}</div>
    <div className="suplier-discount-card-price">{request.plannedSales}</div>
    <div className="suplier-discount-card-date">
        {formatDate(request.discountPeriods.dateStart)} - {formatDate(request.discountPeriods.dateEnd)}
    </div>
    {request.discountComment === '' ? (
        <div className="suplier-discount-card-comment">{request.discountComment}</div>
    ) : (
        <div className="suplier-discount-card-comment">очікується...</div>
    )}
    <div className={getStatusClass(request.status)}>{getStatusText(request.status)}</div>
</div>
    );
}

export default SuplierDiscountRequest;

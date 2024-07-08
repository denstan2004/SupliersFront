import './SuplierDiscountRequest.css';

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
            case 0:
                return "очікується";
            case 1:
                return "відхилено";
            case 2:
                return "прийнято";
            default:
                return "";
        }
    };

    return (
        <div className="product-container">
            <div className="discount-card-name">{request.suplierPostition.nameWares}</div>
            <div className="discount-card-name">{request.suplierPostition.groupName}</div>
            <div className="discount-card-trademark">{request.suplierPostition.nameBrand}</div>
            <div className="discount-card-adress">{request.adressModel.name}</div>
            <div className="discount-card-adress">{request.discountPeriods.comment}</div>
            <div className="discount-card-price">{request.discountPrice}</div>
            <div className="discount-card-price">{request.discountInitPrice}</div>
            <div className="discount-card-price">{request.compensationAmount}</div>
            <div className="discount-card-price">{request.plannedSales}</div>
            <div className="discount-card-date">{formatDate(request.discountPeriods.dateStart)} - {formatDate(request.discountPeriods.dateEnd)}</div>
            <div className="discount-card-comment">{request.discountComment}</div>
            <div className={`discount-card-status ${getStatusClass(request.status)}`}>{getStatusText(request.status)}</div>
        </div>
    );
}

export default SuplierDiscountRequest;

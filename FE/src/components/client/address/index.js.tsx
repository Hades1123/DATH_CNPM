import default_order from "@/assets/seller/default_order.webp";
import {useNavigate} from "react-router";

export const AddressClientComponent = () => {
    const navigate = useNavigate();
    return (
        <div className="client-order__list">
            <div className="client-order__item">
                <div className="client-order__product-info">
                    <div className="client-order__img-container">
                        <img className="client-order__img" src={default_order} alt='order_img' />
                    </div>
                    <div className="client-order__details">
                        <div className="client-order__name">Tên sản phẩm dài để test responsive</div>
                        <div className="client-order__category">Loại sản phẩm: USB China</div>
                        <div className="client-order__quantity">Số lượng: 12</div>
                    </div>
                </div>
                <div className="client-order__price-status">
                    <div className="client-order__price">Giá: 2,000,000đ</div>
                    <div className="client-order__status">Chờ xác nhận</div>
                    <button onClick={() => navigate('/client/order/1')} className="client-order__detail-link">Chi tiết đơn hàng</button>
                </div>
            </div>
        </div>
    )
}
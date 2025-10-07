import ViewOrderDetail from "./ViewOrderDetail";
import TrackOrder from "./TrackOrder";
import { get } from "../../_Services/apiService";
import { API_URL } from "../../_Services/apiUrl";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

const OrderProductDetail = (props) => {
    const { item, onProductDetail, trackModalId, modalId, onCancel, onReturn } = props;
    const [trackOrder, setTrackOrder] = useState();
    const [orderDetail, setOrderDetail] = useState([]);
    const [orderId, setOrderId] = useState();

    // Group by product_id and sum qty properly
    const groupedProducts = item?.details?.reduce((acc, curr) => {
        const productId = curr?.product_id;

        if (!acc[productId]) {
            // take the first product entry and set total_qty = qty
            acc[productId] = { ...curr, total_qty: curr?.qty || 0 };
        } else {
            // just sum qty (ignore API's total_qty field completely)
            acc[productId].total_qty += curr?.qty || 0;
        }

        return acc;
    }, {});

    // Convert object to array
    const uniqueProducts = Object.values(groupedProducts);

    const OrderDetailById = useCallback(async () => {
        if (!orderId) return;

        try {
            const response = await get(API_URL.orderDetailById, {
                order_id: orderId,
            });

            const data = response?.data;

            if (Array.isArray(data) && data.length > 0) {
                setOrderDetail(data);

            } else {
                setOrderDetail(null);
            }
        } catch {
            setOrderDetail(null);
        }
    }, [orderId]);

    useEffect(() => {
        OrderDetailById();
    }, [OrderDetailById]);

    const TrackOrderData = useCallback(async () => {
        if (!orderId) return;

        try {

            const response = await get(API_URL.trackOrder, {
                order_id: orderId,
            });

            if (response?.status) {
                setTrackOrder(response?.data);
            }

        } catch {
            return null;
        }
    }, [orderId]);

    useEffect(() => {
        TrackOrderData();
    }, [TrackOrderData]);

    return (
        <div className="order_product_detail_inner d-sm-flex justify-content-between">
            <div className="col-sm-9 col-12">
                {uniqueProducts?.map((element, j) => {

                    const headerImage = element?.product?.thumbnail;

                    const imagePath = headerImage ? headerImage : './images/product-img-stone.png';

                    return (
                        <div className="order_product_detail_content" key={j}>
                            <div className="order_product_image cursor-pointer" onClick={() => onProductDetail(element)}>
                                <img src={imagePath} alt="Product" />
                                <div className="product_order_name">
                                    <div className="order_product_detail_price">
                                        <h5 className="order_product_name">{element?.product?.name}</h5>
                                        <div className="order_product_detail_price_unitPrice">
                                            <p className="unitPrice">₹{element?.price}</p>
                                            <p className="order_quantity">QTY :</p>
                                            <p className="order_quantity">{element?.total_qty}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div className="order_product_detail_btns">
                    {(item?.order_status !== "Canceled") && (
                        item?.order_status === 'pending' || item?.order_status === 'ongoing' ? (
                            <button className="CANCEL_ORDER" onClick={() => onCancel(item?.id)}>{'CANCEL ORDER'}</button>
                        ) : (
                            <button className="CANCEL_ORDER" onClick={() => onReturn(item?.id)}>{'Return/Exchange'}</button>
                        )
                    )}

                    {/* {(item?.order_status === "Canceled") && (
                        <button disabled className="CANCEL_ORDER" style={{ cursor: 'not-allowed' }}>CANCELLED</button>
                    )}  */}

                    {(item?.order_status !== "Canceled") && (
                        <button className="TrackOrder" onMouseEnter={() => setOrderId(item?.id)} type="button" data-bs-toggle="modal" data-bs-target={`#${trackModalId}`}>TRACK ORDER</button>
                    )}
                </div>
            </div>

            <div className="order_head_order_id">
                <p className="order_head_answr">OrderNo : {item?.id}</p>
                {item?.order_status === "success" || item?.order_status === "pending" || item?.order_status === "ongoing" && (
                    <div onMouseEnter={() => setOrderId(item?.id)} className="" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                        <button className="hover-effect px-0" >
                            View Order Details
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <div className="modal-wrapper">
                <div
                    className="modal fade"
                    id={modalId}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <button
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                className="close-btn"
                            >
                                {/* Close Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <g clipPath="url(#clip0_0_5940)">
                                        <path d="M19.7625 18.6159L11.1466 9.99998L19.7624 1.38418C20.0791 1.06758 20.0791 0.554181 19.7624 0.237541C19.4458 -0.079099 18.9324 -0.079099 18.6158 0.237541L10 8.85334L1.38412 0.237541C1.06752 -0.079099 0.55412 -0.079099 0.23748 0.237541C-0.07916 0.554142 -0.07916 1.06754 0.23748 1.38418L8.85332 9.99998L0.23748 18.6159C-0.07916 18.9325 -0.07916 19.4459 0.23748 19.7625C0.554081 20.0791 1.06748 20.0791 1.38412 19.7625L10 11.1466L18.6159 19.7625C18.9325 20.0791 19.4459 20.0791 19.7625 19.7625C20.0792 19.4459 20.0792 18.9325 19.7625 18.6159Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_0_5940">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <div>
                                <ViewOrderDetail item={item} orderDetail={orderDetail} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div className="modal-wrapper">
                <div
                    className="modal fade"
                    id={trackModalId}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <button
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                className="close-btn"
                            >
                                {/* Close Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <g clipPath="url(#clip0_0_5940)">
                                        <path d="M19.7625 18.6159L11.1466 9.99998L19.7624 1.38418C20.0791 1.06758 20.0791 0.554181 19.7624 0.237541C19.4458 -0.079099 18.9324 -0.079099 18.6158 0.237541L10 8.85334L1.38412 0.237541C1.06752 -0.079099 0.55412 -0.079099 0.23748 0.237541C-0.07916 0.554142 -0.07916 1.06754 0.23748 1.38418L8.85332 9.99998L0.23748 18.6159C-0.07916 18.9325 -0.07916 19.4459 0.23748 19.7625C0.554081 20.0791 1.06748 20.0791 1.38412 19.7625L10 11.1466L18.6159 19.7625C18.9325 20.0791 19.4459 20.0791 19.7625 19.7625C20.0792 19.4459 20.0792 18.9325 19.7625 18.6159Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_0_5940">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <div>
                                <TrackOrder trackOrder={trackOrder} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OrderProductDetail;
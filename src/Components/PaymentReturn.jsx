import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { post } from "../_Services/apiService";
import { API_URL } from "../_Services/apiUrl";
import Layout from "./Shared/Layout";

import "@/ComponentsCss/PaymentReturn.css";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const PaymentReturn = () => {
    const [paymentResponse, setPaymentResponse] = useState(0);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const orderId = params?.id;
    const {
        cartItemId,
        fetchCart
    } = useContext(ShopContext);

    useEffect(() => {
        fetchCart();
        // run only once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const GetPaymentStatus = async () => {
            if (orderId === 'cash_on_delivery') {
                return;
            }
            setLoading(true);
            try {

                const response = await post(API_URL.update_payment_status, {
                    razorpay_order_id: orderId,
                    cart_item_id: cartItemId
                });

                if (response?.isSuccess === 1) {
                    setPaymentResponse(1);
                    fetchCart();
                } else {
                    setPaymentResponse(0);
                }

            } catch {
                setPaymentResponse(0);
            } finally {
                setLoading(false);
            }
        }

        GetPaymentStatus();
    }, [orderId, cartItemId, fetchCart]);

    return (
        <Layout>
            <div className="payment_return_main">
                <div className="payment_return_inner container">
                    {loading ? (
                        <div class="page-loader">
                            <div class="spinner1"></div>
                        </div>
                    ) : (
                        <div className="payment_return_content ">
                            {paymentResponse === 1 && orderId !== 'cash_on_delivery' && (
                                <div className="payment_return_text_container text-center">
                                    <div className="return_success_gif_main">
                                        <div className="success_order_gif mb-3">
                                            <img src="../images/done.gif" alt="" />
                                        </div>
                                    </div>
                                    <div className="order_placed_title">Order Placed Successfully!</div>
                                    <p className="mt-2"><b>OrderId:</b> {orderId}</p>
                                    <div className="mt-4">
                                        <Link to='/' className="continue_shopping_btn">CONTINUE SHOPPING</Link>
                                    </div>
                                </div>
                            )}
                            {paymentResponse === 0 && orderId !== 'cash_on_delivery' && (
                                <div className="payment_return_text_container text-center">
                                    <div className="return_failed_order_main">
                                        <div className="failed_order_gif mb-3">
                                            <img src="../images/pyment-filead.gif" alt="" />
                                        </div>
                                    </div>
                                    <div className="order_placed_title_failed">Order Failed!</div>
                                    <p className="mt-2"><b>OrderId:</b> {orderId}</p>
                                    <div className="mt-4">
                                        <Link to='/' className="continue_shopping_btn">CONTINUE SHOPPING</Link>
                                    </div>
                                </div>
                            )}

                            {orderId === 'cash_on_delivery' && (
                                <div className="payment_return_text_container text-center">
                                    <div className="return_success_gif_main">
                                        <div className="success_order_gif mb-3">
                                            <img src="../images/done.gif" alt="" />
                                        </div>
                                    </div>
                                    <div className="order_placed_title">Order Placed Successfully!</div>
                                    {/* <p className="mt-2"><b>OrderId:</b> {orderId}</p> */}
                                    <div className="mt-4">
                                        <Link to='/' className="continue_shopping_btn">CONTINUE SHOPPING</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default PaymentReturn;
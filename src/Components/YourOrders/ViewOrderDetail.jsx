import '@/ComponentsCss/ViewOrderDetail.css';

const ViewOrderDetail = (props) => {
    const { orderDetail } = props;

    const Subtotal = orderDetail?.reduce((acc, item) => acc + (item?.price || 0) * (item?.qty || 0), 0);

    const TotalDiscount = orderDetail?.reduce((acc, item) => acc + (item?.discount || 0), 0);

    // const totalAmount = Subtotal - TotalDiscount + Math.round(orderDetail[0]?.tax) + orderDetail[0]?.order?.shipping_cost;

    return (
        <div className="order_detail_main">
            {orderDetail ? (
                <div className="order_detail_wrapper">
                    <div className="d-sm-flex">
                        {Array.isArray(orderDetail) && orderDetail.length > 0 && (
                            <div className="col-sm-5 col-12">
                                <strong>Ordered on </strong>
                                <span>
                                    {orderDetail[0]?.created_at
                                        ? new Date(orderDetail[0]?.created_at).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })
                                        : null}
                                </span>
                            </div>
                        )}
                        <div className="col-sm-5 col-12 mt-sm-0 mt-2">
                            <strong>OrderNo : </strong>
                            <span>{orderDetail[0]?.order_id}</span>
                        </div>
                    </div>
                    {Array.isArray(orderDetail) && orderDetail.length > 0 && (
                        <div className="order_all_detail_wrapper mt-3">
                            <div className="d-md-flex">
                                <div className="row col-md-8 col-12 justifu-content-between">
                                    <div className="col-sm-5 col-12">
                                        <h6>Shipping Address</h6>
                                        <p>{orderDetail[0]?.order?.billing_address_data?.address}, {orderDetail[0]?.order?.billing_address_data?.city}, {orderDetail[0]?.order?.billing_address_data?.state}, {orderDetail[0]?.order?.billing_address_data?.country}, {orderDetail[0]?.order?.billing_address_data?.zip}</p>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <h6>Payment Methods</h6>
                                        <p>{orderDetail[0]?.order?.payment_method}</p>
                                    </div>
                                </div>
                                <div className="order_summary col-md-4 col-12 mt-md-0 mt-3">
                                    <h6 className='mb-4'>Order Summary</h6>
                                    <div className="order_summary_detail">
                                        <span className="heading_order">Item(s) Subtotal:</span>
                                        <span className="answ_order">₹{Math.round(Subtotal)}</span>
                                    </div>
                                    <div className='detail_summary_devider'></div>
                                    <div className="order_summary_detail">
                                        <span className="heading_order">Discount</span>
                                        <span className="answ_order">- ₹{Math.round(TotalDiscount)}</span>
                                    </div>
                                    <div className='detail_summary_devider'></div>
                                    <div className="order_summary_detail">
                                        <span className="heading_order">Coupon Discount</span>
                                        <span className="answ_order">- ₹{Math.round(orderDetail[0]?.order?.discount_amount)}</span>
                                    </div>
                                    <div className='detail_summary_devider'></div>
                                    <div className="order_summary_detail">
                                        <span className="heading_order">Shipping</span>
                                        <span className="answ_order">Free</span>
                                    </div>
                                    <div className='detail_summary_devider'></div>
                                    <div className="order_summary_detail mt-3">
                                        <span className="heading_order"><b>Grand Total:</b></span>
                                        <span className="answ_order"><b>₹{Math.round(orderDetail[0]?.order?.order_amount)}/-</b></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>No order details found.</p>
            )}
        </div>
    )
}

export default ViewOrderDetail;
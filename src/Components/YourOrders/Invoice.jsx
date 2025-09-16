import '@/ComponentsCss/invoice.css';
const Invoice = (props) => {
    const { pdfRef, orderDetail } = props;

    // Group by product_id and sum qty properly
    const groupedProducts = orderDetail?.reduce((acc, curr) => {
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

    const subTotal = orderDetail?.reduce((acc, item) => acc + (item?.price || 0) * (item?.qty || 0), 0);

    const TotalDiscount = orderDetail?.reduce((acc, item) => acc + (item?.discount || 0), 0);

    return (
        <div className='invoice-section'>
            <div ref={pdfRef} className='invoice-wrapper-main' >
                <div className="invoice-wrapper">
                    <div className="invoice-header">
                        <img src="../images/lifefooter-logo-black.svg" alt="Logo" className="invoice-logo" />
                        <h2>Order Invoice</h2>
                    </div>

                    {Array.isArray(orderDetail) && orderDetail.length > 0 && (
                        <div className="invoice-info">
                            <div className="invoice-info-left d-flex justify-content-between align-items-center w-100">
                                <p><strong>Invoice :</strong> #{orderDetail[0]?.order_id}</p>
                                <p><strong>Order Date : </strong>
                                    {orderDetail[0]?.created_at
                                        ? (() => {
                                            const date = new Date(orderDetail[0].created_at);
                                            const day = String(date.getDate()).padStart(2, '0');
                                            const month = String(date.getMonth() + 1).padStart(2, '0');
                                            const year = date.getFullYear(); // Full 4-digit year
                                            return `${day}/${month}/${year}`;
                                        })()
                                        : null}
                                </p>
                            </div>
                        </div>
                    )}

                    {Array.isArray(orderDetail) && orderDetail.length > 0 && (
                        <div className="invoice-addresses">
                            <div className='text-start'>
                                <h5>Shipping To : </h5>
                                <p>{orderDetail[0]?.order?.billing_address_data?.contact_person_name}</p>
                                <p>{orderDetail[0]?.order?.billing_address_data?.email}</p>
                                <p>{orderDetail[0]?.order?.billing_address_data?.phone}</p>
                                <p>{orderDetail[0]?.order?.billing_address_data?.address}</p>
                                <p>{orderDetail[0]?.order?.billing_address_data?.city}, {orderDetail[0]?.order?.billing_address_data?.state}, {orderDetail[0]?.order?.billing_address_data?.country}</p>
                                <p>{orderDetail[0]?.order?.billing_address_data?.zip}</p>
                            </div>
                            <div className='text-end'>
                                <h5>Billing Address : </h5>
                                <p>{orderDetail[0]?.order?.billing_address_data?.contact_person_name}</p>
                                <p>{orderDetail[0]?.order?.billing_address_data?.email}</p>
                                <p>{orderDetail[0]?.order?.billing_address_data?.phone}</p>
                                <p>{orderDetail[0]?.order?.billing_address_data?.address}</p>
                                <p>{orderDetail[0]?.order?.billing_address_data?.city}, {orderDetail[0]?.order?.billing_address_data?.state}, {orderDetail[0]?.order?.billing_address_data?.country}</p>
                                <p>{orderDetail[0]?.order?.billing_address_data?.zip}</p>
                            </div>
                        </div>
                    )}

                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Item</th>
                                <th>Unit Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uniqueProducts?.map((e, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{e?.product_details?.name}</td>
                                    <td>&#8377;{e?.price}</td>
                                    <td>{e?.total_qty}</td>
                                    <td>&#8377;{e?.price * e?.total_qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="invoice-summary">
                        <div>
                            <h5>Payment Details</h5>
                            <p className='payment_mathod_name mb-2'>{orderDetail[0]?.order?.payment_method}</p>
                            <p> {orderDetail[0]?.created_at
                                ? (() => {
                                    const date = new Date(orderDetail[0].created_at);
                                    const day = String(date.getDate()).padStart(2, '0');
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const year = date.getFullYear(); // Full 4-digit year
                                    return `${day}/${month}/${year}`;
                                })()
                                : null}
                            </p>
                        </div>
                        <div className="totals">
                            <p><span>Items(s) Subtotal : </span><span>&#8377;{subTotal}</span></p>
                            <p><span>Tax : </span><span>+ &#8377;{Math.round(orderDetail[0]?.tax)}</span></p>
                            <p><span>Discount : </span><span>- ₹{TotalDiscount}</span></p>
                             <p><span>Coupon Discount : </span><span>- ₹{Math.round(orderDetail[0]?.order?.discount_amount)}</span></p>
                            <p><span>Shipping & Handling : </span><span>+ &#8377;{orderDetail[0]?.order?.shipping_cost}</span></p>
                            <hr />
                            <p className="total"><strong>Grand Total:</strong><strong>&#8377;{Math.round(orderDetail[0]?.order?.order_amount)}</strong></p>
                        </div>
                    </div>

                    <div className="invoice-footer">
                        <p>If you have any questions or feedback, please email us at</p>
                        <a href="mailto:life@lifecode.co.in">life@lifecode.co.in</a>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Invoice
const OrderHead = (props) => {
    const { item, setOrderId, handleDownloadInvoice } = props;

    return (
        <div className="my_order_head">
            <div className="order_head_inner d-sm-flex"> <div className="divder_Oderhed"></div>
                <div className="order_head_content col-xl-8 col-sm-7 col-12">
                    <div className='order_head_placed'>
                        {/* <p className="order_head_placed_name mb-0 order_head_title">Order placed</p> */}
                        <div className="order_head_placed_detail">
                            <p>
                                <span>Order placed:</span>
                                {item?.created_at
                                    ? new Date(item?.created_at).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })
                                    : null}
                            </p>
                            <div className="onlyhover"><span>Ship to : </span>
                                {item?.billing_address_data?.contact_person_name} <img src="../images/dropDawnAroow.svg" alt="" />
                                <div className="order_head_shipping_address_wepper">
                                    <div className="order_head_shipping_address_detail">
                                        <h6 className="order_head_user_name mb-0">{item?.billing_address_data?.contact_person_name}</h6>
                                        <p className='mb-0'>{item?.billing_address_data?.address}, {item?.billing_address_data?.city}, {item?.billing_address_data?.state}, {item?.billing_address_data?.country}, {item?.billing_address_data?.zip}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {item?.order_status === "success" || item?.order_status === "pending" && (
                    <div className='col-xl-4 col-sm-5 col-12 order_head_order_number_sec'>
                        <div className="dawnload_invoice hover-effect" onClick={() => setOrderId(item?.id)}>
                            <button type="button" className="" data-bs-toggle="modal" data-bs-target="#exampleModal">Download Invoice <img src="../images/dawnload.svg" alt="" /></button>
                        </div>
                    </div>
                )}
            </div>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <button type="button" className="btn_cancel" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={handleDownloadInvoice} type="button" className="btn_download">Download</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderHead;
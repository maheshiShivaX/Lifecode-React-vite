const CheckoutSummary = (props) => {
    const {
        ProceedtoBuy,
        total,
        couponCode,
        setCouponCode,
        applyCoupon,
        discountAmount,
        appliedCoupon,
        removeCoupon,
        totalPayable,
        cartItem,
        RemoveCartItem,
        onProductDetail,
        totalDiscount,
        isCodModel,
        paymentMethod,
        selectPaymentMethod,
        shippingCharge,
        onCodOrder,
        closeCodeModel,
        isCoupon,
        onPopUpOrder,
        incQty,
        decQty
    } = props;

    return (
        <>
            {totalPayable > 0 && (
                <div className="cart-summary_main col-md-6 col-xxl-6 col-xl-6 col-lg-6 col-sm-12 checkout-summary_main">
                    <div className="cart-summary-inner">
                        <div className="cart-summary-content">
                            {(Array.isArray(cartItem) ? cartItem : [cartItem])?.map((item, index) => (
                                <div className="order_summary_img_data" key={index}>
                                    <img onClick={() => onProductDetail(item)} style={{ cursor: "pointer" }} src={item?.thumbnail} alt="" className="check_p_img" />
                                    <div className="w-100">
                                        <h3 onClick={() => onProductDetail(item)} style={{ cursor: "pointer" }}>{item?.name}</h3>
                                        <p>₹ {item?.price}</p>
                                        <div className="cart_detail_buttons_wrapper mt-sm-3 mt-2">
                                            <div className="product_quantity ">
                                                <p className="mb-0 qty_heading">Qty : {item?.quantity}</p>
                                                <div className="checkout_inc_denc">
                                                    <p onClick={() => incQty(item)} style={{ cursor: "pointer" }}>
                                                        {/* <img src="../images/uparrow.svg" alt="Increase" /> */}
                                                        ▲
                                                    </p>
                                                    <p onClick={() => decQty(item)} style={{ cursor: "pointer" }}>
                                                        {/* <img src="../images/downarrow.svg" alt="Decrease" /> */}
                                                        ▼
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="cart_remove_item_btn_inner" onClick={() => RemoveCartItem(item)}>
                                                <button>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <h4 className="cart-summary-heading mb-4">Order Summary</h4>
                            <div className="cart-summary-details">
                                <p className="cart-summary-text mb-2"><span>Total MRP</span> <span>₹ {`${Math.round(total)}.00`}</span></p>
                                <p className="cart-summary-text mb-2"><span>Discount</span> <span>- ₹ {`${totalDiscount}.00`}</span></p>
                                <p className="cart-summary-text mb-2"><span>Coupon Discount</span> <span>- ₹ {`${Math.round(discountAmount)}.00`}</span></p>
                                <p className="cart-summary-text mb-2"><span>Shipping Charge</span> <span>+ ₹ {`${Math.round(shippingCharge)}.00`}</span></p>
                                <img className="w-100 summaryLine" src="./images/summaryLine.svg" alt="" />
                                <p className="cart-summary-text-total"><span><b>Total Payable</b></span> <span><b>₹ {`${Math.round(totalPayable)}.00/-`}</b></span></p>
                                {isCoupon && (
                                    <div className="coupon_code_sec">
                                        {appliedCoupon ? (
                                            <div className='d-flex gap-4 applied_coupon_code'>
                                                <p className="applied_coupon_code_text">Coupon code applied! ₹{Math.round(discountAmount)}.00</p>
                                                <p onClick={removeCoupon} className="applied_coupon_code_cancel_icon">
                                                    <img src="../images/Cancel.png" alt="" />
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="d-flex coupon_code_input">
                                                <img src="./images/Discount.svg" alt="" />
                                                <input
                                                    type="text"
                                                    placeholder="Enter Coupon Code"
                                                    value={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                />
                                                <button
                                                    onClick={applyCoupon}
                                                >
                                                    APPLY
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {/* )} */}
                                {/* <div className="referral_code_sec">
                                    {referrelApplied ? (
                                        <div className='d-flex'>
                                            <p>Referrel Code Applied: {referralCode}</p>
                                            <p onClick={removeReferralCode}>*</p>
                                        </div>
                                    ) : (
                                        <div className="d-flex referral_code_input">
                                            <img src="./images/Discount.svg" alt="" />
                                            <input
                                                type="text"
                                                placeholder="Enter Referral Code"
                                                value={referralCode}
                                                onChange={(e) => { setReferralCode(e.target.value); }}
                                                name="referralCode"
                                            />

                                            <button
                                                onClick={applyReferralCode}
                                            >
                                                APPLY
                                            </button>
                                        </div>
                                    )}
                                </div> */}
                                <div className="payment_method my-4 pt-2">
                                    <div className="payment_method_content d-sm-flex justify-content-between">

                                        <div className="online p_method">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    checked={paymentMethod === "razorpay"}
                                                    onChange={() => selectPaymentMethod("razorpay")}
                                                />
                                                Pay Now</label>
                                        </div>

                                        <div className="cash_on_delivery p_method mt-sm-auto mt-3">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    checked={paymentMethod === "cash_on_delivery"}
                                                    onChange={() => selectPaymentMethod("cash_on_delivery")}
                                                />
                                                Cash on delivery
                                            </label>
                                            <p className="mt-2">Extra 100 will be charged on COD</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="checkout_procced_btn" onClick={() => ProceedtoBuy("razorpay")}>
                                    <button>Proceed to Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isCodModel && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered login_form_model" style={{ zIndex: 9999 }}>
                        <div className="modal-content" style={{ background: "#F0F0F0", borderRadius: "15px" }}>
                            <button type="button" className="btn-close cod_model_close" onClick={closeCodeModel}></button>
                            <div className="modal-body">
                                <section className="login-container">
                                    <div className='container-fluid d-flex justify-content-center'>
                                        <div className="cart-summary-content">
                                            <div className="cod_popup_heading text-center">
                                                <h2>Get ₹100 Off Instantly!</h2>
                                                <p>₹100.00 extra for COD. Prepay and save.</p>
                                            </div>
                                            <h4 className="cart-summary-heading mb-4">Order Summary</h4>
                                            <div className="cart-summary-details">
                                                <p className="cart-summary-text1"><span>Total MRP</span> <span>₹ {`${Math.round(total)}.00`}</span></p>
                                                <p className="cart-summary-text1"><span>Discount</span> <span>- ₹ {`${totalDiscount}.00`}</span></p>
                                                <p className="cart-summary-text1"><span>Coupon Discount</span> <span>- ₹ {`${Math.round(discountAmount)}.00`}</span></p>
                                                <p className="cart-summary-text1"><span>Shipping Charge</span> <span>+ ₹ {`${Math.round(shippingCharge)}.00`}</span></p>
                                                <img className="w-100 summaryLine" src="./images/summaryLine.svg" alt="" />
                                                <p className="cart-summary-text1-total"><span><b>Total Payable</b></span> <span><b>₹ {`${Math.round(totalPayable)}.00/-`}</b></span></p>
                                                <div className="checkout_procced_btn_cod mt-4 pt-2" onClick={onCodOrder}>
                                                    <button>Proceed with COD</button>
                                                </div>
                                                <div className="checkout_procced_btn mt-3" onClick={onPopUpOrder}>
                                                    <button>Pay Now and save ₹100 Instantly</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                </section>
                            </div>
                        </div>
                    </div>
                    {/* Backdrop */}
                    <div className="modal-backdrop fade show"></div>
                </div>
            )}
        </>
    )
}

export default CheckoutSummary;
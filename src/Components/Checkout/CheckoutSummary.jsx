const CheckoutSummary = (props) => {
    const {
        referralCode,
        referrelApplied,
        applyReferralCode,
        ProceedtoBuy,
        total,
        removeReferralCode,
        setReferralCode,
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
        totalDiscount
    } = props;

    return (
        <>
            {totalPayable > 0 && (
                <div className="cart-summary_main col-md-6 col-xxl-6 col-xl-6 col-lg-6 col-sm-12 checkout-summary_main">
                    <div className="cart-summary-inner">
                        <div className="cart-summary-content">
                            {(Array.isArray(cartItem) ? cartItem : [cartItem])?.map((item, index) => (
                                <div className="order_summary_img_data" key={index}>
                                    <img onClick={()=>onProductDetail(item)}  style={{ cursor: "pointer" }} src={item?.thumbnail} alt="" />
                                    <div className="w-100">
                                        <h3 onClick={()=>onProductDetail(item)}  style={{ cursor: "pointer" }}>{item?.name}</h3>
                                        <p>₹ {item?.price}</p>
                                        <div className="cart_detail_buttons_wrapper">
                                            <div className="product_quantity ">
                                                <p className="mb-0">Qty : {item?.quantity}</p>
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
                                <p className="cart-summary-text mb-2"><span>Shipping Charge</span> <span>Free</span></p>
                                <img className="w-100 summaryLine" src="./images/summaryLine.svg" alt="" />
                                <p className="cart-summary-text-total"><span><b>Total Payable</b></span> <span><b>₹ {`${Math.round(totalPayable)}.00/-`}</b></span></p>
                                {/* {couponInput && ( */}
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
                                {/* )} */}
                                <div className="referral_code_sec">
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
                                </div>
                                <div className="checkout_procced_btn" onClick={ProceedtoBuy}>
                                    <button>Proceed to Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CheckoutSummary;
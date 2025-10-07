const CartSummary = (props) => {
    const { total, totalDiscount, finalTotal, ProceedtoBuy } = props;

    return (
        <>
            <div className="cart-summary_main text-white">
                <div className="cart-summary-inner">
                    <div className="cart-summary-content">
                        <p className="cart-summar-Secure"> <img src="../images/Secure.png" alt="" /> 100% Secure Transaction</p>
                        <h4 className="cart-summary-heading">Cart Summary</h4>
                        <div className="cart-summary-details">
                            <p className="cart-summary-text"><span>Total MRP</span> <span>₹ {`${Math.round(total)}.00`}</span></p>
                            {/* <p className="cart-summary-text"><span><b>Bag Discount</b></span> <span><b>₹ {totalAmount}.00</b></span></p> */}
                            <p className="cart-summary-text"><span><b>Discount</b></span> <span><b>-₹ {`${Math.round(totalDiscount)}.00`}</b></span></p>
                            <p className="cart-summary-text"><span><b>Shipping Charge</b></span> <span className="freeText"><b>Free</b></span></p>
                            <div className="divder_dot"></div>
                            <p className="cart-summary-text"><span><b>Total Payable</b></span> <span className="freeText"><b>₹ {`${Math.round(finalTotal)}.00/-`}</b></span></p>
                            <div className="pyment_method">
                                {/* <div className="pyment_method_inner">
                                    <img src="../images/PaymentHeand.png" alt="" />
                                    <p>CASH ON
                                        DELIVERY</p>
                                </div> 
                                <div className="pyment_method_divider"></div>*/}
                                <div className="pyment_method_inner">
                                    <img src="../images/Freedelivery.png" alt="" />
                                    <p>FREE
                                        SHIPPING</p>
                                </div>
                                <div className="pyment_method_divider"></div>
                                <div className="pyment_method_inner">
                                    <img src="../images/Return.png" alt="" />
                                    <p>EASY
                                        RETURN</p>
                                </div>
                            </div>
                            {/* <div className="shop_main text-center"> */}
                                {/* <p><img src="../images/Shoppingbag.png" alt="" />Shop for ₹99 more, and get ₹500 OFF</p> */}
                                {/* <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <g clipPath="url(#clip0_419_489)">
                                        <path d="M13.9375 7.03735H9.07422V2.17407C9.07422 1.44596 8.48397 0.855713 7.75586 0.855713C7.02774 0.855713 6.4375 1.44596 6.4375 2.17407V7.03735H1.57422C0.846103 7.03735 0.255859 7.6276 0.255859 8.35571C0.255859 9.08383 0.846103 9.67407 1.57422 9.67407H6.4375V14.5374C6.4375 15.2655 7.02774 15.8557 7.75586 15.8557C8.48397 15.8557 9.07422 15.2655 9.07422 14.5374V9.67407H13.9375C14.6656 9.67407 15.2559 9.08383 15.2559 8.35571C15.2559 7.6276 14.6656 7.03735 13.9375 7.03735Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_419_489">
                                            <rect width="15" height="15" fill="white" transform="translate(0.255859 0.855713)" />
                                        </clipPath>
                                    </defs>
                                </svg>Shop more</button> */}
                            {/* </div> */}
                            <div className="cart_procced_btn">
                                <div>
                                    <span>₹{`${Math.round(finalTotal)}.00/-`}</span>
                                    <p>Total Payable</p>
                                </div>
                                <button onClick={ProceedtoBuy}>Proceed to Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartSummary;
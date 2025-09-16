const CartDetailSection = (props) => {
    const { cart, incQty, decQty, RemoveCartItem, onProductDetail } = props;

    return (
        <>
            <div className="cart_detail_main text-white">
                {cart?.map((item, i) => {
                    return (
                        <div className="cart_detail_inner" key={i}>
                            <div className="cart_detail_wrapper">
                                <div className='cart_product_image'>
                                    <img
                                        src={item?.thumbnail}
                                        alt="Product" />
                                </div>
                                <div className="cart_detail_content">
                                    <h2 className="cart_product_name" onClick={() => onProductDetail(item)}>{item?.name}</h2>
                                    {/* <p className='cart_product_description'>
                                        {item?.shortDesc?.substring(0, 100)}{item?.shortDesc?.length > 35 ? '...' : ''}
                                    </p> */}
                                    <div className="cart_unit_price">
                                        <p className="cart_unit_price_inner">₹{`${item?.price}.00`}</p>
                                        <p className="cart_mrp"><del>Rs.{Math.round(item?.product?.mrp)}</del></p>
                                        {/* <span className="cart_price_off">
                                            Rs. {Math.round(item?.discount)}
                                        </span> */}
                                    </div>

                                    <div className="cart_detail_buttons_wrapper">
                                        <div className="product_quantity ">
                                            <p className="mb-0">Qty : {item?.quantity}</p>
                                            <div>
                                                <p onClick={() => incQty(item)} style={{ cursor: "pointer" }}>
                                                    <img src="../images/uparrow.svg" alt="Increase" />
                                                </p>
                                                <p onClick={() => decQty(item)} style={{ cursor: "pointer" }}>
                                                    <img src="../images/downarrow.svg" alt="Decrease" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="cart_remove_item_btn_inner">
                                            <button onClick={() => RemoveCartItem(item)}>Remove</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="hrdider" />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CartDetailSection;
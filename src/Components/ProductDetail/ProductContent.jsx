import RatingDurabilityDetail from "./RatingDurabilityDetail";

const ProductContent = (props) => {
    const { productBySlug, handleWishlistToggle, addToCart, setQuantity, quantity, isWishlisted, buyNow, isLoggedIn } = props;

    const incQty = () => {
        setQuantity((prev) => prev + 1);
    };

    const decQty = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div className="product_detail_content_main">
            <div className="product_detail_content">
                <div className="product_detail_content_inner">
                    <div className="">
                        <h2 className="product_detail_name">{productBySlug?.name}</h2>
                        <p className="product_short_description">{productBySlug?.sort_dec}</p>
                    </div>
                    <div className="product_price">
                        <p className="product_sale_price">Rs. {productBySlug?.unit_price}</p>
                    </div>
                    <RatingDurabilityDetail productBySlug={productBySlug} />
                    <p className="product_short_description">{productBySlug?.sort_dec}</p>
                    <div className="product_detail_buttons">
                        <div className="product_add_cart_btn d-flex align-items-center gap-3">
                            <div className="product_quantity d-flex align-items-center justify-content-center gap-3">
                                <p className="mb-0">Qty : {quantity}</p>
                                <div>
                                    <p onClick={incQty} style={{ cursor: "pointer" }}>
                                        <img src="../images/uparrow.svg" alt="Increase" />
                                    </p>
                                    <p onClick={decQty} style={{ cursor: "pointer" }}>
                                        <img src="../images/downarrow.svg" alt="Decrease" />
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => addToCart(productBySlug)}>Add To Cart</button>
                        </div>
                        <div className="product_buy_now_btn d-flex align-items-center gap-3">
                            <button onClick={handleWishlistToggle} className="wishlist">
                                {isWishlisted && isLoggedIn ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 21 21" fill="none">
                                        <g clip-path="url(#clip0_172_190)">
                                            <path d="M18.6356 3.047C17.6003 1.9241 16.1797 1.30566 14.6352 1.30566C13.4807 1.30566 12.4234 1.67065 11.4926 2.39041C11.0229 2.75372 10.5974 3.19821 10.2222 3.71701C9.84711 3.19836 9.42139 2.75372 8.95157 2.39041C8.02094 1.67065 6.96365 1.30566 5.80917 1.30566C4.26468 1.30566 2.84393 1.9241 1.80862 3.047C0.785675 4.15677 0.222168 5.67288 0.222168 7.31625C0.222168 9.00769 0.852509 10.556 2.20581 12.189C3.41644 13.6497 5.1564 15.1326 7.17133 16.8496C7.85934 17.436 8.63922 18.1007 9.44901 18.8087C9.66293 18.9961 9.93744 19.0992 10.2222 19.0992C10.5067 19.0992 10.7814 18.9961 10.995 18.809C11.8048 18.1009 12.5851 17.4359 13.2735 16.8492C15.2881 15.1324 17.028 13.6497 18.2387 12.1888C19.592 10.556 20.2222 9.00769 20.2222 7.3161C20.2222 5.67288 19.6587 4.15677 18.6356 3.047Z" fill="#FF4A4F" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_172_190">
                                                <rect width="20" height="20" fill="white" transform="translate(0.222168 0.211914)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                ) : (
                                    <img src="../../images/Heart.svg" alt="" />
                                )}
                            </button>
                            <button onClick={() => buyNow(productBySlug)} className="buy_now">Buy Now</button>
                        </div>
                    </div>
                    {/* <div className="specification">
                        {productDataById?.productSpecificationDtos?.map((item, i) => (
                            <div className="d-sm-flex w-100 justify-content-center mb-3" key={i}>
                                <p className="col-sm-4 col-12 mb-sm-auto mb-0"><strong>{item?.specificationDisplayName} :</strong> </p>
                                <p className="col-sm-8 col-12">{item?.description}</p>
                            </div>
                        ))}
                    </div> */}
                    {/* <div className="">
                        <div
                            className="display_description"
                            dangerouslySetInnerHTML={{ __html: productBySlug?.details }}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ProductContent;
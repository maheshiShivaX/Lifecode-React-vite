import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import '../ComponentsCss/WishlistDrawer.css';
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "../utils/CountdownTimer";

const WishListDrawer = () => {
    const { wishlistDrawer, closeWishlistDrawer, wishlist, removeFromWishlist, updateCart, openCartDrawer, addCart, cart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState({});
    const navigate = useNavigate();

    const incQty = (item) => {
        const id = item.id;
        setQuantity((prev) => ({
            ...prev,
            [id]: (prev[id] || 1) + 1,
        }));
    };

    const decQty = (item) => {
        const id = item.id;
        setQuantity((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) - 1, 1),
        }));
    }

    const RemoveWishlist = (item) => {
        removeFromWishlist(item?.product_id);
        if (wishlist.length === 1) {
            closeWishlistDrawer();
        }
    }

    const addToCart = async (item) => {
        const itemId = item.id;
        const itemQty = quantity[itemId] || 1; // Get quantity for specific item

        const existingCartItem = cart.find(cartItem => Number(cartItem.product_id) === Number(item.product_id));
        const currentQty = existingCartItem ? Number(existingCartItem.quantity || 0) : 0;
        const newQty = currentQty + itemQty;

        if (existingCartItem) {
            const res = await updateCart(existingCartItem, newQty);

            if (res.status === 0) {
                toast('Product Out Of Stock');
                return;
            }
            toast.success("Item updated in cart");
        } else {
            const res = await addCart(item, itemQty);

            if (res.status === 0) {
                toast('Product Out Of Stock');
                return;
            }
            toast.success("Item added to cart");

        }

        // Optionally reset quantity for this item
        setQuantity(prev => ({ ...prev, [itemId]: 1 }));

        closeWishlistDrawer();
        openCartDrawer();
    };

    const onProductDetail = (item) => {
        navigate(`/${item?.slug}`);
        closeWishlistDrawer();
    }

    return (
        <>
            {/* WisList Right Side */}

            <div className="WisList_Right_wepper">
                {wishlistDrawer && <div className="cart_overlay" onClick={closeWishlistDrawer}></div>}
                <div className={`side-panel ${wishlistDrawer ? "open" : ""}`}>
                    <div className="panel-content">
                        <div className="side-panel-header cart_header">
                            <div className="Filters_header_text">
                                <h5>Wishlist {`(${wishlist?.length})`} </h5>
                            </div>

                            <div className="close_button" onClick={closeWishlistDrawer}>
                                <span ><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                    <g clipPath="url(#clip0_172_3682)">
                                        <path d="M20.4061 19.0468L11.7902 10.431L20.406 1.81516C20.7226 1.49856 20.7226 0.985158 20.406 0.668518C20.0894 0.351878 19.576 0.351878 19.2594 0.668518L10.6436 9.28432L2.02767 0.668518C1.71107 0.351878 1.19767 0.351878 0.881035 0.668518C0.564395 0.985119 0.564395 1.49852 0.881035 1.81516L9.49688 10.431L0.881035 19.0468C0.564395 19.3635 0.564395 19.8768 0.881035 20.1935C1.19764 20.5101 1.71103 20.5101 2.02767 20.1935L10.6436 11.5776L19.2594 20.1935C19.576 20.5101 20.0894 20.5101 20.4061 20.1935C20.7227 19.8768 20.7227 19.3635 20.4061 19.0468Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_172_3682">
                                            <rect width="20" height="20" fill="white" transform="translate(0.643555 0.430969)" />
                                        </clipPath>
                                    </defs>
                                </svg></span>
                            </div>
                        </div>
                        <div className="cart_header_sale">
                            <CountdownTimer />
                        </div>

                        {wishlist?.length > 0 ? (
                            wishlist?.map((item, index) => (
                                <div className="cart_detail_inner cart_main" key={index}>
                                    <div className="cart_detail_wrapper">
                                        <div className="cart_product_image">
                                            <img
                                                alt="Product"
                                                src={item?.product_full_info?.thumbnail ? item?.product_full_info?.thumbnail : item?.product_full_info?.images[0]}
                                            />
                                        </div>

                                        <div className="cart_detail_content">
                                            <h2 onClick={() => onProductDetail(item?.product_full_info)} className="cart_product_name">{item?.product_full_info?.name}</h2>
                                            <div className="cart_unit_price">
                                                <p className="cart_unit_price_inner mb-0">₹ {`${item?.product_full_info?.unit_price}.00`}</p>
                                                <p className="cart_mrp mb-0">
                                                    <del>Rs. {item?.product_full_info?.mrp}</del>
                                                </p>
                                                {/* <span className="cart_price_off">Rs. 257 OFF</span> */}
                                            </div>

                                            <div className="cart_detail_buttons_wrapper">
                                                <div className="product_quantity">
                                                    <p className="mb-0">{`QTY : ${quantity[item.id] || 1}`}</p>
                                                    <div>
                                                        <p style={{ cursor: "pointer" }} onClick={() => incQty(item)}>
                                                            <img alt="Increase" src="/images/uparrow.svg" />
                                                        </p>
                                                        <p style={{ cursor: "pointer" }} onClick={() => decQty(item)}>
                                                            <img alt="Decrease" src="/images/downarrow.svg" />
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* <div className="cart_remove_item_btn_inner">
                                                <button>Remove</button>
                                            </div> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="button-container cart_remove_item_btn_inner text-center mt-3">
                                        <button onClick={() => RemoveWishlist(item)}>Remove from Wishlist</button>
                                        <button>
                                            <span className="cart-icon" onClick={() => addToCart(item)}>
                                                Add to Cart
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center py-5">Wishlist is empty</p>
                        )}
                        {/* <div className="secure_transaction_hedding">
                            <p><img src="./images/Securedark.png" alt="" />100% Secure Transaction</p>
                            <div className='LiveVibrantly_divder'></div>
                        </div>
                        <div className="Order_summary_heddimg">
                            <p>Order Summary</p>
                            <div className="Total_mrp_inner">
                                <span>Total MRP</span>
                                <span>₹ 1,500.00</span>
                            </div>
                            <div className="Total_mrp_inner">
                                <span>Bag Discount</span>
                                <span>-₹ 800.00</span>
                            </div>
                            <div className="Total_mrp_inner">
                                <span>Coupon Discount</span>
                                <span>₹ 0.00</span>
                            </div>
                            <div className="Total_mrp_inner">
                                <span>Shipping Charge</span>
                                <span><strong>Free</strong></span>
                            </div>
                        </div> */}
                    </div>
                </div>

            </div>
            {/* WisList Right Side End */}
        </>
    )
}

export default WishListDrawer;
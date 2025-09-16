import { useNavigate } from 'react-router-dom';
import CartDetailSection from './Cart/CartDetailSection';
import CartSummary from './Cart/CartSummary';

import "@/ComponentsCss/Cart.css";
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { CountdownTimer } from '../utils/CountdownTimer';

const CartDrawer = () => {
    const { cartDrawer,
        closeCartDrawer,
        cart,
        removeFromCart,
        updateCart,
        onPreviousUrl,
        isLoggedIn,
        setProductId
    } = useContext(ShopContext);
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => {
        const subTotal = sum + item.price * item.quantity;
        return subTotal
    }, 0);

    const totalDiscount = cart.reduce((sum, item) => {
        return sum + item.discount;
    }, 0);

    const finalTotal = total - totalDiscount;

    const incQty = (item) => {
        updateCart(item, item?.quantity + 1);
    };

    const decQty = (item) => {
        updateCart(item, item?.quantity - 1);
        if (item?.quantity === 1) {
            removeFromCart(item);
        }
    };

    const RemoveCartItem = (item) => {
        removeFromCart(item);
        if (cart.length === 1) {
            closeCartDrawer();
            navigate('/products')
        }
    }

    const ProceedtoBuy = () => {
        if (isLoggedIn) {
            // Navigate to checkout page
            navigate('/checkout');
        } else {
            // Redirect to login page
            navigate('/login');
            onPreviousUrl(`/checkout`);
        }
        closeCartDrawer();
        localStorage.removeItem('product_id');
        setProductId("")
    }

    const onProductDetail = (item) => {
        navigate(`/${item?.slug}`);
        closeCartDrawer();
    }

    return (
        <section className='cart_wepper_main'>
               {cartDrawer && <div className="cart_overlay" onClick={closeCartDrawer}></div>}
            <div className={`cart ${cartDrawer ? "open" : ""}`} >
                <div className='cart_header'>
                    <h5>Shopping Cart {`(${cart?.length})`}</h5>
                    <button onClick={closeCartDrawer}> <img src="../images/Cancel.png" alt="" /></button>
                </div>
                <div className='cart_header_sale'>
                    <CountdownTimer />
                </div>
                <div className='cart_main'>
                    <div className='cart_inner'>
                        <div className='cart_content'>
                            {cart?.length > 0 ? (
                                <div className='cart_product_detail'>
                                    <CartDetailSection
                                        cart={cart}
                                        incQty={incQty}
                                        decQty={decQty}
                                        RemoveCartItem={RemoveCartItem}
                                        onProductDetail={onProductDetail}
                                    />
                                    <CartSummary total={total} totalDiscount={totalDiscount} finalTotal={finalTotal} ProceedtoBuy={ProceedtoBuy} />
                                </div>
                            ) : (
                                <p className='cart_empty_text'>Cart is empty</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartDrawer;
import { useNavigate } from "react-router-dom";

const AddressSummary = (props) => {
    const { totalAmount, finalAmount,userAddress } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        if (userAddress?.length > 0) {
            navigate('/checkout');
        } else {
            alert('Please Add Address for Shipping');
        }
    }

    return (
        <div className="cart-summary_main text-white">
            <div className="cart-summary-inner">
                <div className="cart-summary-content">
                    <h4 className="cart-summary-heading">Order Summary</h4>
                    <div className="cart-summary-details">
                        <p className="cart-summary-text"><span>Sub Total</span> <span>₹ {totalAmount}.00</span></p>
                        {/* <p className="cart-summary-text"><span>Delivery & Handling</span> <span>₹ {deliveryCharge}.00</span></p> */}
                        <p className="cart-summary-text"><span><b>Total Amount</b></span> <span><b>₹ {finalAmount}.00</b></span></p>
                        <div className="cart_procced_btn">
                            <button onClick={handleClick}>Proceed to Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressSummary;
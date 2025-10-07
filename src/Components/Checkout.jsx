
import "@/ComponentsCss/Checkout.css";
import Layout from "./Shared/Layout";
import { useEffect, useState, useContext, useCallback } from 'react';
import { toast } from "react-toastify";
import CheckoutAddress from "./Checkout/CheckoutAddress";
import CheckoutSummary from "./Checkout/CheckoutSummary";
import AddressForm from "./Checkout/AddressForm";
import { ShopContext } from "../Context/ShopContext";
// import { useNavigate } from "react-router-dom";
import { get, post, put } from "../_Services/apiService";
import { API_URL } from "../_Services/apiUrl";
import { ReferralCode } from "../_Services/apiFunctions";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
    const product_id = localStorage.getItem('product_id');
    const [address, setAddress] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isForm, setIsForm] = useState(false);
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [couponCode, setCouponCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState(false);
    const [referralCode, setReferralCode] = useState('');
    const [referrelApplied, setReferrelApplied] = useState(false);
    const [subTotal, setSubTotal] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("razorpay"); // default
    const [shippingCharge, setShippingCharge] = useState(0);
    const [isCoupon, setIsCoupon] = useState(true);

    // const [isCart, setIsCart] = useState();

    const {
        cart,
        setCartItemId,
        removeFromCart,
        productId,
        setProductId,
        isCodModel,
        openCodModal,
        closeCodModal,
        updateCart
    } = useContext(ShopContext);

    const isCart = cart?.some(item => Number(item.product_id) === Number(product_id || productId));

    const cartItem = isCart
        ? cart.find(item => Number(item.product_id) === Number(product_id || productId))
        : cart;

    const calcPrice = (item) => item?.quantity && item?.price ? item.quantity * item.price : 0;
    const calcDiscount = (item) => item?.quantity && item?.discount ? item.discount : 0;

    const finalTotal = isCart && cartItem
        ? calcPrice(cartItem)
        : cart.reduce((sum, item) => sum + calcPrice(item), 0);

    const totalDiscount = isCart && cartItem
        ? calcDiscount(cartItem)
        : cart.reduce((sum, item) => sum + calcDiscount(item), 0);

    // const cartItemId = isCart && cartItem ? cartItem.id : cart[0]?.id || null;
    const cartItemId = isCart && cartItem ? cartItem.id : null;

    useEffect(() => {
        setSubTotal(finalTotal);
        setTotalPayable(finalTotal - (discountAmount + totalDiscount) + shippingCharge);
    }, [finalTotal, discountAmount, totalDiscount, shippingCharge]);

    const [addressFormData, setAddressFormData] = useState({
        contact_person_name: "",
        email: "",
        address_type: "home",
        address: "",
        city: "",
        zip: "",
        country: "",
        state: "",
        phone: "",
        latitude: "09.090",
        longitude: "09.090",
        is_billing: 0
    });

    const handleCountrySelect = (countryName) => {

        const selected = country.find((item) => item.name === countryName);

        if (selected) {
            GetState(Number(selected.id));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Save Address

    const SaveAddress = async (e) => {
        e.preventDefault();

        try {
            let response;

            // If addressFormData has an ID, it's an update
            if (addressFormData.id) {
                response = await put(API_URL.updateAddress, addressFormData);
            } else {
                response = await post(API_URL.addAddress, addressFormData);
            }

            if (response?.status) {
                setIsForm(false);
                setAddressFormData({
                    contact_person_name: "",
                    email: "",
                    address_type: "home",
                    address: "",
                    city: "",
                    zip: "",
                    country: "",
                    state: "",
                    phone: "",
                    latitude: "",
                    longitude: "",
                    is_billing: 0
                });

                setSelectedAddressId(response.id || null);
                GetAddress();
                toast.success("Address saved successfully!");
            }

        } catch (error) {
            toast.error("Error saving address:", error);
        }
    };

    // Function for Edit Address
    const EditAddress = async (item) => {
        setIsForm(true);

        if (country.length === 0) {
            await GetCountry();
        }

        const selectedCountry = country.find(c => c.name === item.country);

        if (selectedCountry) {
            await GetState(selectedCountry.id);
        }

        setAddressFormData({
            id: item?.id,
            contact_person_name: item?.contact_person_name,
            email: item?.email,
            address_type: item?.address_type || "home",
            address: item?.address,
            city: item?.city,
            zip: item?.zip,
            country: item?.country,
            state: item?.state,
            phone: item?.phone,
            latitude: item?.latitude,
            longitude: item?.longitude,
            is_billing: 0
        });
    };

    // GetAddress
    const GetAddress = useCallback(async () => {
        try {

            const response = await get(API_URL.getAddress);

            if (!response || response === null || response === undefined || response.length === 0) {
                setIsForm(true);
                return;
            }

            if (response?.length > 0) {
                setAddress(response);
                if (selectedAddressId === null || selectedAddressId === undefined || selectedAddressId === 0) {
                    setSelectedAddressId(response[0]?.id);
                }
            } else {
                return null;
            }

        } catch {
            return null;
        }
    }, [selectedAddressId]);

    const GetCustomerInfo = async () => {
        try {

            const response = await get(API_URL.customerInfo);

            setCustomerInfo(response);

        } catch {
            return null;
        }
    }

    // Get Country & State
    const GetCountry = async () => {
        try {

            const response = await get(API_URL.countryList);

            if (response?.length > 0) {
                setCountry(response)
            } else {
                return null;
            }

        } catch {
            return null;
        }
    }

    const GetState = async (id) => {
        try {

            const response = await get(API_URL.state + '/' + id);

            if (response?.length > 0) {
                setState(response)
            } else {
                return null;
            }

        } catch {
            return null;
        }
    }

    useEffect(() => {
        GetCountry();
        GetCustomerInfo();
    }, []);

    useEffect(() => {
        GetAddress();
    }, [GetAddress]);

    useEffect(() => {
        if (customerInfo) {
            setAddressFormData((prev) => ({
                ...prev,
                contact_person_name: `${customerInfo.f_name || ''} ${customerInfo.l_name || ''}`.trim(),
                email: customerInfo.email || '',
                phone: customerInfo.phone || ''
            }));
        }
    }, [customerInfo]);

    // Function for Select Address
    const onSelectAddress = (item) => {
        if (item?.id !== null && item?.id !== 0) {
            setSelectedAddressId(item?.id);
        }
    };

    const AddNewAddress = () => {
        setIsForm(true);
        setAddressFormData({
            contact_person_name: `${customerInfo.f_name || ''} ${customerInfo.l_name || ''}`.trim(),
            email: customerInfo.email || '',
            phone: customerInfo.phone || '',
            address_type: "home",
            address: "",
            city: "",
            zip: "",
            country: "",
            state: "",
            latitude: "",
            longitude: "",
            is_billing: 0
        });
    }

    // Function to apply coupon code
    const applyCoupon = async () => {
        try {
            if (!couponCode.trim()) {
                toast.warning('Please enter a coupon code.');
                return;
            }

            const response = await get(API_URL.applyCouponCode, {
                code: couponCode.trim()
            });

            if (response?.status === true && response?.coupon_discount >= 0) {
                const discount = response.coupon_discount;

                setDiscountAmount(discount);
                setAppliedCoupon(true);
                setTotalPayable(subTotal - discount); // use subTotal from state
                toast.success('Coupon Code Applied Successfully!');
            } else {
                toast.error("Invalid coupon code");
            }
        } catch (error) {
            toast.error(error);
        }
    };

    // Function to remove coupon code
    const removeCoupon = () => {
        setDiscountAmount(0);
        setAppliedCoupon(false);
        setCouponCode("");
        setTotalPayable(subTotal); // use subTotal from state
        toast.success('Removed Coupon Code!');
    };

    // Function for Apply Referral Code
    const ApplyReferralCode = async () => {
        const response = await ReferralCode(referralCode);

        if (response) {
            toast.success('Referral Code Applied Successfull');
            setReferrelApplied(true);
        }
    };

    // Function for Remove Coupon Code
    const removeReferralCode = () => {
        toast.success('Removed Referrel Code');
        setReferrelApplied(false);

    }

    const selectPaymentMethod = (method) => {
        if (method === "cash_on_delivery") {
            setPaymentMethod("cash_on_delivery");
            setShippingCharge(100);
            setIsCoupon(false);
        } else {
            setPaymentMethod("razorpay");
            setIsCoupon(true);
            setShippingCharge(0);
        }
    }

    useEffect(() => {
        if (cartItem?.length === 0) {
            const timer = setTimeout(() => {
                navigate('/products');
            }, 1500); // 2000 ms = 2 seconds

            // Cleanup the timer if the component unmounts before 2 seconds
            return () => clearTimeout(timer);
        }
    }, [cartItem, navigate]);

    const ProceedtoBuy = async (method) => {

        if (address === null || address.length === 0) {
            toast("Please fill address");
            return;
        }

        if (totalPayable <= 0) {
            toast.error("Total payable amount must be greater than zero.");
            return;
        }

        // COD flow
        if (paymentMethod === "cash_on_delivery" && !isCodModel) {
            openCodModal();
            return;
        }

        try {

            const response = await get(API_URL.placeOrder, {
                billing_address_id: selectedAddressId,
                cart_item_id: cartItemId || "",
                payment_method: method || paymentMethod,
                coupon_code: appliedCoupon ? couponCode : "",
                coupon_discount: appliedCoupon ? Math.round(discountAmount) : "",
                cod_charge: method === "cash_on_delivery" ? 100 : 0
            });

            if (response?.isSuccess === 1) {

                const OrderResponse = response?.data;

                if (!window.Razorpay) return toast.error("Please refresh the page.");

                const options = {
                    key: OrderResponse?.key,
                    amount: OrderResponse?.amount,
                    currency: OrderResponse?.currency,
                    name: "",
                    description: "Order Payment",
                    image: "",
                    order_id: OrderResponse?.order_id,

                    handler: async function () {
                        window.location.href = OrderResponse.callback_url
                    },

                    modal: {
                        ondismiss: function () {
                            sessionStorage.setItem("payment_status", "cancelled");
                            window.location.href = OrderResponse.callback_url
                            closeCodModal();
                        }
                    },

                    prefill: {
                        name: OrderResponse?.prefill?.name || '',
                        email: OrderResponse?.prefill?.email || '',
                        contact: OrderResponse?.prefill?.contact || ''
                    },

                    notes: {
                        notes_key_1: OrderResponse?.notes[0]?.notes_key_1 || '',
                        notes_key_2: OrderResponse?.notes[0]?.notes_key_2 || '',
                    },

                    theme: {
                        color: "#333",
                    }
                };

                // const razor = new window.Razorpay(options);
                if (window.RazorpayCheckout) {
                    window.RazorpayCheckout.open(options); // Magic Checkout
                } else {
                    const rzp = new window.Razorpay(options); // Normal Checkout
                    rzp.open();
                }
                // razor.open();

                if (paymentMethod === "razorpay") {
                    // if (window.RazorpayCheckout) {
                    //     window.RazorpayCheckout.open(options); // Magic Checkout
                    // } else {
                    const rzp = new window.Razorpay(options); // Normal Checkout
                    rzp.open();
                    // }
                } else {
                    // COD logic
                    openCodModal();
                }

                setCartItemId(cartItemId);
                // setCouponCode("");
            }

        } catch {
            toast.error('Order Placed Failed');
        }
    }

    const onPopUpOrder = () => {
        if (paymentMethod === 'cash_on_delivery') {
            setPaymentMethod("razorpay");
            setShippingCharge(0);
            ProceedtoBuy("razorpay");
            closeCodModal();
        }
    }

    const onCodOrder = () => {
        ProceedtoBuy("cash_on_delivery");
        navigate(`/paymentreturn/cash_on_delivery`);
        closeCodModal();
    }

    const closeCodeModel = () => {
        closeCodModal();
        // setPaymentMethod("razorpay");
        // setShippingCharge(0);
    }

    const back = () => {
        setIsForm(false);
    }

    const incQty = (item) => {
        updateCart(item, item?.quantity + 1);
    };

    const decQty = (item) => {
        if (item?.quantity > 1) {
            updateCart(item, item?.quantity - 1);
        }
    };

    const RemoveCartItem = (item) => {
        removeFromCart(item);
        setProductId("");
        localStorage.removeItem('product_id');

        let shouldNavigate = false;

        if (Array.isArray(cartItem)) {
            // If it's an array
            if (cartItem.length === 1) {
                shouldNavigate = true;
            }
        } else if (cartItem && typeof cartItem === "object") {
            // If it's a single object
            shouldNavigate = true; // because it means only one product is present
        }

        if (shouldNavigate) {
            navigate('/products');
        }
    };

    const onProductDetail = (item) => {
        navigate(`/${item?.slug}`);
    }

    return (
        <Layout>
            <div className="checkout text-white sec-padding-top">
                <div className='checkout_inner'>
                    <div className='checkout_content container'>
                        <div className='checkout_details row'>
                            <div className='checkout_details_inner col-xxl-6 col-xl-6 col-lg-6 col-lg-6 col-md-6 col-sm-12'>
                                {address != null && address.length > 0 && !isForm && (
                                    <CheckoutAddress
                                        address={address}
                                        EditAddress={EditAddress}
                                        onSelectAddress={onSelectAddress}
                                        selectedAddressId={selectedAddressId}
                                        AddNewAddress={AddNewAddress}
                                    />
                                )}

                                {isForm && (
                                    <>
                                        <AddressForm
                                            handleChange={handleChange}
                                            addressFormData={addressFormData}
                                            SaveAddress={SaveAddress}
                                            country={country}
                                            state={state}
                                            handleCountrySelect={handleCountrySelect}
                                            isForm={isForm}
                                            back={back}
                                            address={address}
                                        />
                                    </>
                                )}
                            </div>
                            <CheckoutSummary
                                ProceedtoBuy={ProceedtoBuy}
                                total={subTotal}
                                totalDiscount={totalDiscount}
                                finalTotal={finalTotal}
                                setReferralCode={setReferralCode}
                                applyReferralCode={ApplyReferralCode}
                                referrelApplied={referrelApplied}
                                removeReferralCode={removeReferralCode}
                                referralCode={referralCode}
                                couponCode={couponCode}
                                setCouponCode={setCouponCode}
                                applyCoupon={applyCoupon}
                                discountAmount={discountAmount}
                                appliedCoupon={appliedCoupon}
                                totalPayable={totalPayable}
                                removeCoupon={removeCoupon}
                                cartItem={cartItem}
                                RemoveCartItem={RemoveCartItem}
                                onProductDetail={onProductDetail}
                                isCodModel={isCodModel}
                                openCodModal={openCodModal}
                                closeCodModal={closeCodModal}
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                                selectPaymentMethod={selectPaymentMethod}
                                shippingCharge={shippingCharge}
                                onCodOrder={onCodOrder}
                                closeCodeModel={closeCodeModel}
                                isCoupon={isCoupon}
                                onPopUpOrder={onPopUpOrder}
                                incQty={incQty}
                                decQty={decQty}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Checkout;
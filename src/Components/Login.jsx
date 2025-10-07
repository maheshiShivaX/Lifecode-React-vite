import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from "react-otp-input";
import { SendOtp, VerifyOTP } from '@/_Services/apiFunctions';
import { toast } from 'react-toastify';

import "@/ComponentsCss/Login.css";
import { SignUp } from '../_Services/apiFunctions';
import Register from './Register';
import ClipLoader from "react-spinners/ClipLoader";
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ph, setPh] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);

    // sign up form
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        priviousUrl,
        productId,
        isWishlistClick,
        addToWishlist,
        setIsWishlistClick,
        fetchWishlist,
        wishlist,
        isLoggedIn,
        fetchCart,
        guestIntId,
        setToggleMenu,
        closeModal,
        isLoginForm
    } = useContext(ShopContext);

    const productBySlug = {
        id: productId
    }

    const isWishlisted = wishlist?.some((item) => item.product_id === productBySlug?.id);

    const [formData, setFormData] = useState({
        f_name: "",
        l_name: "",
        phone: ph,
        password: "",
        referral_code: "",
        guest_id: guestIntId,
    });

    useEffect(() => {
        if (guestIntId && !formData.guest_id) {
            setFormData((prev) => ({
                ...prev,
                guest_id: guestIntId,
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guestIntId]); // ✅ but you're telling ESLint to back off

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleMobileChange = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/\D/g, '');

        if (numericValue?.length <= 10) {
            setPh(numericValue);
        }
    };

    const sendOtp = async (e) => {
        e.preventDefault();
        setOtp("");
        setLoading(true);

        if (ph === '') {
            toast.error('Please Enter Mobile Number');
            setLoading(false);
            return;
        }

        const response = await SendOtp(`${ph}`);

        if (!response) {
            setLoading(false);
            return;
        }

        setShowOtpInput(true);
        setLoading(false);
    };

    const handleOtpChange = (value) => {
        const numericValue = value.replace(/\D/g, '');
        setOtp(numericValue);
    };

    const handleWishlistToggle = () => {

        if (isWishlisted) {
            toast("Already in Wishlist");
        } else {
            addToWishlist(productBySlug);
        }
        setIsWishlistClick(false);
    };

    // Verify OTP
    const verifyOtp = async (e) => {
        if (e) e.preventDefault();

        if (!otp) {
            toast.error("Please enter the OTP");
            return;
        }

        setLoading(true);

        const response = await VerifyOTP(`${ph}`, otp, guestIntId);

        if (response?.status === 1) {
            const { id } = response.user;
            toast.success("Login Successfully");
            sessionStorage.setItem("jwtToken", response?.token);
            sessionStorage.setItem('loginId', id);
            sessionStorage.setItem('isLoggedIn', true);

            if (priviousUrl) {
                navigate(`${priviousUrl}`);
            } else {
                navigate("/");
            }

            if (isWishlistClick) {
                handleWishlistToggle();
                fetchWishlist();
            }

            localStorage.removeItem('guest_id');
            fetchWishlist();
            fetchCart();
            setToggleMenu(false);
            closeModal();
            setShowOtpInput(false);
        } else if (response?.status === 2) {
            setShowSignUpForm(true);
            setShowOtpInput(false);
        }
        setLoading(false);
    };

    // Automatically verify OTP when 6 digits are entered
    useEffect(() => {
        if (showOtpInput && otp.length === 4) {
            verifyOtp();
        }
        // eslint-disable-next-line
    }, [otp, showOtpInput]);

    // Register User
    const RegisterUser = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await SignUp(formData);

            if (response.status === 1) {
                const { id } = response.user;
                toast.success("Login Successfull!");
                sessionStorage.setItem("jwtToken", response?.token);
                sessionStorage.setItem('loginId', id);
                sessionStorage.setItem('isLoggedIn', true);

                if (priviousUrl) {
                    navigate(`${priviousUrl}`);
                } else {
                    navigate("/");
                }

                if (isWishlistClick) {
                    handleWishlistToggle();
                    fetchWishlist();
                }

                localStorage.removeItem('guest_id');
                fetchWishlist();
                fetchCart();
                setToggleMenu(false);
                closeModal();
            }
        } catch {
            toast.error("Please try again after some time");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            phone: ph,
        }));
    }, [ph]);

    const onEdit = () => {
        setShowOtpInput(false)
        setShowSignUpForm(false);
    }

    useEffect(() => {
        if (isLoggedIn && location.pathname === "/login") {
            navigate("/products");
        }
        // run only on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoginForm && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered login_form_model" style={{ zIndex: 9999 }}>
                        <div className="modal-content" style={{ background: "#F0F0F0", borderRadius: "15px" }}>
                            {/* <div className="modal-header"> */}
                            {/* <h5 className="modal-title">Login</h5> */}
                            <button type="button" className="btn-close login_model_close" onClick={closeModal}></button>
                            {/* </div> */}
                            <div className="modal-body" style={{ background: "#F0F0F0", borderRadius: "15px" }}>
                                <section className="login-container">
                                    <div className='container-fluid d-flex justify-content-center'>
                                        {/* Login  */}
                                        <div className="row align-items-center justify-content-between w-100">
                                            {/* <div className='col-md-5 p-0 login-form-image-section'>
                                                <div className='login-form-left-image'>
                                                    <img src="./images/loginbanner.webp" alt="Login" className='img-fluid' />
                                                </div>
                                            </div> */}
                                            {!showSignUpForm && (
                                                <div className=''>
                                                    <div className='login-form-right'>
                                                        <form className='login-form' onSubmit={showOtpInput ? verifyOtp : sendOtp}>
                                                            {showOtpInput ? (
                                                                <div>
                                                                    <h2>OTP Verification</h2>
                                                                    <p>We Have Sent Verification OTP to<br />
                                                                        <div className='otp-phone-number mt-3'>
                                                                            <span>+91 {ph}</span>
                                                                            <p className='oncurser' onClick={onEdit} style={{ textDecoration: 'underline' }}>EDIT</p>
                                                                        </div>
                                                                    </p>
                                                                    <div className="otp_input_inner_wepper">
                                                                        <OtpInput
                                                                            className="otp_input_inner"
                                                                            value={otp}
                                                                            onChange={handleOtpChange}
                                                                            numInputs={4}
                                                                            renderSeparator={<span>-</span>}
                                                                            renderInput={(props) => (
                                                                                <input
                                                                                    {...props}
                                                                                    inputMode="numeric"
                                                                                    pattern="\d*"
                                                                                    autoComplete="one-time-code"
                                                                                />
                                                                            )}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <h2>Log in</h2>
                                                                    <p>Whatsapp Number to Get OTP</p>
                                                                    <input
                                                                        type="tel"
                                                                        inputMode="numeric"
                                                                        pattern="[0-9]*"
                                                                        className=""
                                                                        id="mobileNo"
                                                                        name="mobileNo"
                                                                        aria-describedby="emailHelp"
                                                                        placeholder="Enter Mobile Number"
                                                                        value={ph}
                                                                        onChange={handleMobileChange}
                                                                        autocomplete="off"
                                                                    />
                                                                </>
                                                            )}
                                                            <button type='submit' className='hover-effect'>
                                                                {loading ? (
                                                                    <ClipLoader size={20} color="#fff" />
                                                                ) : (
                                                                    showOtpInput ? 'Verify Otp' : 'Login'
                                                                )}
                                                            </button>
                                                            {showOtpInput && (
                                                                <div className='otp-phone-number resend-otp'>
                                                                    <span>Not Received OTP ?</span>
                                                                    <p className='oncurser' onClick={sendOtp}>Resend OTP</p>
                                                                </div>
                                                            )}
                                                        </form>
                                                        <div className='round-shape'>

                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <Register
                                                showSignUpForm={showSignUpForm}
                                                RegisterUser={RegisterUser}
                                                formData={formData}
                                                handleChange={handleChange}
                                                loading={loading}
                                                ph={ph}
                                            />
                                        </div>
                                    </div >
                                </section>
                            </div>
                            {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary">
                            Save changes
                        </button>
                    </div> */}
                        </div>
                    </div>
                    {/* Backdrop */}
                    <div className="modal-backdrop fade show"></div>
                </div>
            )}
        </>
    );
}

export default Login;
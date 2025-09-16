import CheckoutAddress from "./Checkout/CheckoutAddress";
import Profile from "./Profile";
import Layout from "./Shared/Layout";
import YourOrders from "./YourOrders";
import '@/ComponentsCss/MyAccount.css';
import MyAddresses from "./YourOrders/MyAddresses";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const MyAccount = () => {
    const navigate = useNavigate();
    const {
        fetchWishlist,
        fetchCart
    } = useContext(ShopContext);

    const Logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate('/');
        fetchWishlist();
        fetchCart();
    }

    return (
        <Layout>
            <section className="my-account-wepper">
                <div className="container">
                    <div className="display_block_only pb-5" style={{
                        background: "#ffffff"
                    }}>
                        <div className="nav flex-column nav-pills me-3 " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <img src="./images/tab_banner.png" alt="" className="tab_image" />
                            <div className="my-account-button-inner">
                                <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                    <img src="../images/User.svg" alt="" />
                                    My Profile</button>
                                <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                                    <img src="../images/Shoppingbag.svg" alt="" />
                                    My Order</button>
                                <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                                    <img src="../images/Address.svg" alt="" />
                                    My Addresses</button>
                                {/* <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                                    <img src="../images/Rating.svg" alt="" />
                                    Reviews</button> */}
                                <button onClick={Logout} className="logout_button">Logout <img src="../images/Logout.svg" alt="" /></button>
                            </div>
                        </div>
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">
                                <Profile />
                            </div>
                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">
                                
                                <YourOrders />
                            </div>
                            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">
                               
                                <MyAddresses />
                            </div>
                            {/* <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabIndex="0">
                                <h3 className="myOrderhedding">Reviews</h3>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>


    )
}

export default MyAccount;
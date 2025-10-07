import Breadcrumb from "./Common/Breadcrumb";
import Layout from "./Shared/Layout";
import '../ComponentsCss/HowToActive.css'
import { Link } from "react-router-dom";

const HowToActive = () => {
    const BreadcrumbMenu = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: `How to Install & Activate Lifecode`
        },
    ]
    return (
        <Layout>
            <div className="howto_activate_wepper">
                <div className="about_us_inner">
                    <div className="product_detail_header">
                        <h1>{'How to Activate Lifecode'}</h1>
                        <Breadcrumb BreadcrumbMenu={BreadcrumbMenu} />
                    </div>
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        {/* <div className="hedding_werp_Activate">
                            <h3>How to Install & Activate Lifecode</h3>
                            <p>Follow these quick steps to set up your Lifecode and start using it:</p>
                        </div> */}
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 ">
                            <div className="activate_img_data">
                                <img src="/images/how_to_active1.webp" alt="" />
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 ">
                            <div className="activate_content_data">
                                <h3>Step 1 : Download the Lifecode App</h3>
                                <ul>
                                    <li>•	Open Google Play Store (Android) or App Store (iOS).</li>
                                    <li>•	Search for “Lifecode” by iShivax.</li>
                                    <li>•	Tap Install (Android) or Get (iOS).</li>
                                </ul>
                                <h2 className=''>Download Application</h2>
                                <div className='download-app'>
                                    <ul className="logo_app">
                                        <li className='only_margin_bootom'>
                                            <Link to={'https://play.google.com/store/apps/details?id=com.ishivax.lifecode'}> <img src="./images/google-play.svg" alt="" /></Link>
                                        </li>
                                        <li className='only_margin_bootom'>
                                            <Link to={'https://apps.apple.com/in/app/lifecode-simplifies-emergency/id1546741259'}>   <img src="./images/app-store.svg" alt="" /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row1 align-items-center">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 ">
                            <div className="activate_content_data">
                                <h3>Step 2 : Create Your Account</h3>
                                <ul>
                                    <li>•   Open the Lifecode app.</li>
                                    <li>•	Tap Register using your mobile number.</li>
                                    <li>•	Verify your mobile number with the OTP sent to you.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 ">
                            <div className="activate_img_data">
                                <img src="/images/how_to_active2.webp" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row row1 align-items-center flex_dairecion_use">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 ">
                            <div className="activate_img_data">
                                <img src="/images/how_to_active3.webp" alt="" />
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 ">
                            <div className="activate_content_data">
                                <h3>Step 3 : Fill Details</h3>
                                <span>Enter your name, emergency contact numbers, address, blood group</span>
                                <ul>
                                    <li>•   Enter the contact details you want to share securely.</li>
                                    <li>•	Add emergency numbers or SOS message if needed.</li>
                                    <li>•	Your personal phone number stays hidden by default.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row row1 align-items-center">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 ">
                            <div className="activate_content_data">
                                <h3>Step 4 : Activate Your Lifecode Tag</h3>
                                <ul>
                                    <li>•  In the app, tap Add Lifecode.</li>
                                    <li>•	Select QR Type Car/2Wheeler/Tag</li>
                                    <li>•	Scan the QR code on your Lifecode sticker or tag.</li>
                                    <li>•	Assign it a name (e.g., “Car”, “Pet”, “Laptop Bag”).</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 ">
                            <div className="activate_img_data">
                                <img src="/images/how_to_active4.webp" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row row1 align-items-center flex_dairecion_use">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 ">
                            <div className="activate_img_data">
                                <img src="/images/how_to_active5.webp" alt="" />
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 ">
                            <div className="activate_content_data">
                                <h3>Step 5 : Test Your Lifecode</h3>
                                <ul>
                                    <li>•  Scan your tag from another phone using Paytm, Google Lens, or any QR scanner.</li>
                                    <li>•	Check if your contact or emergency info appears correctly.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HowToActive;
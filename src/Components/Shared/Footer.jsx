import '@/ComponentsCss/Footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="footer-logo">
                            <Link to='/'><img src="../images/footerLogo.svg" alt="" /></Link>
                        </div>
                        <div className="footer-text">
                            <ul>
                                <li>
                                    <img src="../images/Fastdelivery.png" alt="" />
                                    <p>15 Days Return Policy*
                                    </p>
                                </li>
                                {/* <li>
                                    <img src="../images/Cashondelivery.png" alt="" />
                                    <p>Cash On Delivery
                                    </p>
                                </li> */}
                            </ul>
                        </div>
                        <div className="footer-social">
                            <span>Connect With Us :</span>
                            <ul>
                                <li className='hover-effect'>
                                    <a href="https://www.instagram.com/lifecode.co.in?igsh=cGpmd21hNDNkc3kz" target='_blank'>
                                        <img src="../images/Instagram.png" alt="" />
                                    </a>
                                </li>
                                <li className='hover-effect'>
                                    <a href="#" >
                                        <img src="../images/Whatsapp.png" alt="" />
                                    </a>
                                </li>
                                <li className='hover-effect'>
                                    <a href="https://www.facebook.com/Lifecode.co.in?mibextid=ZbWKwL" target='_blank' >
                                        <img src="../images/Facebook.png" alt="" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12 mt-sm-0 mt-4">
                        <div className='footer_heading'>
                            <h3>Customer Services</h3>
                            <ul>
                                <li><Link to={'/'}>Home</Link></li>
                                <li ><Link to={'/about-us'}>About Us</Link></li>
                                <li ><Link to={'/contact-us'}>Contact Us</Link></li>
                                <li><Link to={'/blogs'}>Blogs</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12 mt-sm-0 mt-4">
                        <div className='footer_heading'>
                            <h3>Company</h3>
                            <ul>
                                <li><Link to={'/faqs'}>FAQ’s</Link></li>
                                <li><Link to={'/privacy-policy'}>Privacy Policy</Link></li>
                                <li><Link to={'/terms-and-conditions'}>Terms & Conditions</Link></li>
                                <li><Link to={'/refund-and-return-policy'}>Refund And Return Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12 mt-sm-0 mt-4">
                        <div className='footer_heading'>
                            <h3>Keep Up to date</h3>
                            <div className="subscribe-container">
                                <input type="email" placeholder="Enter Email ID" />
                                <button>Subscribe</button>
                            </div>
                            <h3 className=''>Download Application</h3>
                            <div className='download-app'>
                                <ul className='footer_app_logo'>
                                    <li className='only_margin_bootom'>
                                        <Link to={'https://play.google.com/store/apps/details?id=com.ishivax.lifecode'} target='_blank'> <img src="./images/google-play.svg" alt="" /></Link>
                                    </li>
                                    <li className='only_margin_bootom'>
                                        <Link to={'https://apps.apple.com/in/app/lifecode-simplifies-emergency/id1546741259'} target='_blank'>   <img src="./images/app-store.svg" alt="" /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-lg-9 col-12 row'>
                        <div className='col-lg-2 col-md-4 col-sm-4 col-6'>
                            <div className='footer_band_logo'>
                                <img src="/images/footerlogo1.png" alt="" />
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-4 col-sm-4 col-6'>
                            <div className='footer_band_logo'>
                                <img src="/images/footerlogo2.png" alt="" />
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-4 col-sm-4 col-6'>
                            <div className='footer_band_logo'>
                                <img src="/images/footerlogo3.png" alt="" />
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-4 col-sm-4 col-6'>
                            <div className='footer_band_logo'>
                                <img src="/images/footerlogo4.png" alt="" />
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-4 col-sm-4 col-6'>
                            <div className='footer_band_logo'>
                                <img src="/images/amazonefooterlogo.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <p>
                        <img src="./images/Secure.png" alt="" /> 100% Secure Transaction :
                        <span style={{ marginLeft: '10px' }}>
                            <img src="./images/pymentall.png" alt="" />
                        </span></p>
                    <p className="text-sm text-gray-500 mt-4">
                        © {new Date().getFullYear()} — iShivax®. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

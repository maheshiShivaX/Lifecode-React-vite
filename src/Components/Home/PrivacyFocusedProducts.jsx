import '@/ComponentsCss/PrivacyFocusedProducts.css';
import { novaData, PrivacyFocusedProductsData, PrivacyFocusedProductsItemData } from '../../_Services/SatactData';
import { Link } from 'react-router-dom';

const PrivacyFocusedProducts = () => {

    return (
        <>
            <section className='privacy_section'>
                <div className='container'>
                    <div className='privacy-focused-products'>
                        <div className='privacy_heding'>
                            <h2 data-aos="fade-down" data-aos-delay="600">{PrivacyFocusedProductsData?.title}</h2>
                            <p data-aos="fade-down" data-aos-delay="800">{PrivacyFocusedProductsData?.description}</p>
                        </div>
                        <div className='privacy_banner'>
                            <div className='round_shodow_only'></div>
                            <img src={PrivacyFocusedProductsData?.image} alt="" data-aos="zoom-in-up" data-aos-delay="400" className='mobile_image_notShow' />
                            <img src={PrivacyFocusedProductsData?.mobileImage} alt="" data-aos="zoom-in-up" data-aos-delay="400" className='mobile_image' />
                        </div>
                        <div>
                            <div className="row">
                                {PrivacyFocusedProductsItemData.map((ProductsItemData) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={ProductsItemData.id} data-aos="zoom-in-down" data-aos-delay="1200">
                                        <div className='privacy_product_card'>
                                            <img src={ProductsItemData.image} alt={`Product ${ProductsItemData.id}`} />
                                            <h5>{ProductsItemData.title}</h5>
                                            <p>{ProductsItemData.description}</p>
                                            {/* <Link to="#">{ProductsItemData.linkText}{'>'}</Link> */}

                                        </div>
                                    </div>
                                ))}
                                {/* <div className='privacy_product_line'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1521" height="7" viewBox="0 0 1521 7" fill="none" data-aos="fade-right" data-aos-delay="1500">
                                        <path opacity="0.33" d="M0.073406 3.81689L2.95715 6.70064L5.8409 3.81689L2.95715 0.933147L0.073406 3.81689ZM1520.26 3.81689L1517.38 0.933147L1514.5 3.81689L1517.38 6.70064L1520.26 3.81689ZM2.95715 3.81689V4.31637H1517.38V3.81689V3.31741H2.95715V3.81689Z" fill="white" />
                                    </svg >
                                    <div data-aos="fade-up" data-aos-delay="1000">
                                        <Link to="#" className='hover-effect' >
                                            View Products
                                        </Link>
                                    </div>

                                </div> */}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className='nova_bg'>
                <div className='container'>
                    <div className='nova_logo'>
                        <img src="/images/nova.png" alt="" />
                        <h4>Smart help, instant support, real safety</h4>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className='nova_titele'>
                                <h3>{novaData?.novatitele}</h3>
                            </div>
                            <div className='privacy_security_content_box' data-aos="fade-up-left" data-aos-delay="400">

                                {novaData?.childMenu?.map((item, index) => (
                                    <div className='privacy_security_content' key={index}>
                                        <div className='privacy_security_content_inner'>
                                            <span>{item?.id}</span>
                                            <h4>{item?.title}</h4>
                                        </div>
                                        <p>{item?.description}</p>
                                    </div>
                                ))}
                                <div className="nova_btn">
                                    <Link to="https://www.lifecode.co.in/register" target='_blank' className="nova_btn_inner">
                                        Try  <img src="/images/novaLogo.png" alt="" />
                                    </Link>
                                </div>

                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 col-12 destop_none p-0'>
                            <div className='novarightside'>
                                <img src="/images/novarightside.webp" alt="" />
                            </div>
                        </div>
                        <div className='novarightside mobile_none_nova'>
                            <img src="/images/novarightside.webp" alt="" />
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default PrivacyFocusedProducts
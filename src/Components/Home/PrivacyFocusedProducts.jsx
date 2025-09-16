import '@/ComponentsCss/PrivacyFocusedProducts.css';
import { novaData, PrivacyFocusedProductsData, PrivacyFocusedProductsItemData } from '../../_Services/SatactData';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';


const PrivacyFocusedProducts = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let animationFrameId;
        let scrollSpeed = 1;

        const scroll = () => {
            if (!isPaused && containerRef.current && contentRef.current) {
                containerRef.current.scrollLeft += scrollSpeed;

                // Reset scroll to start for seamless loop
                if (
                    containerRef.current.scrollLeft >=
                    contentRef.current.scrollWidth - containerRef.current.clientWidth
                ) {
                    containerRef.current.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        scroll();

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);
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
                {/* <div
                    className="scroll-container" data-aos="zoom-out-right" data-aos-delay="1000"
                    data-aos-duration="1000"
                    ref={containerRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="scroll-content" ref={contentRef}>
                        <span className="scroll-item"><img src="/images/Motorcycle.svg" alt="" /> In Every Emergency, Lifecode is Your Lifeline</span>
                        <span className="scroll-item"><img src="/images/Sedancarmodel.svg" alt="" />From Bikes to Cars, Safety Travels With You</span>
                        <span className="scroll-item"><img src="/images/Fastdeliveryslider.svg" alt="" /> One Scan to Reach Your Loved Ones Instantly</span>
                       
                        <span className="scroll-item"><img src="/images/Motorcycle.svg" alt="" /> In Every Emergency, Lifecode is Your Lifeline </span>
                        <span className="scroll-item"><img src="/images/Sedancarmodel.svg" alt="" /> From Bikes to Cars, Safety Travels With You </span>
                        <span className="scroll-item"><img src="/images/Fastdeliveryslider.svg" alt="" /> One Scan to Reach Your Loved Ones Instantly </span>
                    </div>
                </div> */}
            </section>

            <section className='nova_bg'>
                <div className='container'>
                    <div className='nova_logo'>
                        <img src="/images/nova.svg" alt="" />
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
                                    <Link to="" className="nova_btn_inner">
                                        Try  <img src="/images/novaLogo.png" alt="" />
                                    </Link>
                                </div>

                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 col-12 destop_none p-0'>
                            <div className='novarightside'>
                                <img src="/images/novarightside.png" alt="" />
                            </div>
                        </div>
                        <div className='novarightside mobile_none_nova'>
                            <img src="/images/novarightside.png" alt="" />
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default PrivacyFocusedProducts
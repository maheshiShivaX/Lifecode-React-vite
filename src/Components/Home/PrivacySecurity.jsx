import '@/ComponentsCss/PrivacySecurity.css';
import { PrivacySecurityData } from '../../_Services/SatactData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { get } from '../../_Services/apiService';
import { API_URL } from '../../_Services/apiUrl';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';

const PrivacySecurity = () => {
    const navigate = useNavigate();
    const [productBySlug, setProductBySlug] = useState();
    const {
        onPreviousUrl
    } = useContext(ShopContext);

    useEffect(() => {
        const GetProductBySlug = async () => {
            try {

                const response = await get(`${API_URL.productBySlug}/four-wheeler-o8nJkF`);

                if (response) {
                    setProductBySlug(response)
                } else {
                    return null;
                }
            } catch {
                return null;
            }
        };

        GetProductBySlug();
    }, []);

    const onProductDetail = () => {
        navigate(`/${productBySlug?.slug}`);
        onPreviousUrl(`/${productBySlug?.slug}`);
    }

    return (
        <>
            <section className='privacy_security'>
                <div className='round_shodow_only'></div>
                <div className="container">
                    <div className='privacy_security_inner'>
                        <div className='sprivacy_security_hedding'>
                            {/* <p data-aos="fade-up" data-aos-delay="800">{PrivacySecurityData?.title}</p> */}
                            <h2 data-aos="fade-down" data-aos-delay="400">{PrivacySecurityData?.hedding}</h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-5 col-md-6 col-sm-12" data-aos="fade-up-right" data-aos-delay="800">
                                <div className='privacy_security_image'>
                                    <img src={PrivacySecurityData?.image} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-6 col-sm-12">
                                <div className='privacy_security_content_box' data-aos="fade-up-left" data-aos-delay="400">
                                    {PrivacySecurityData?.childMenu?.map((item, index) => (
                                        <div className='privacy_security_content' key={index}>
                                            <div className='privacy_security_content_inner'>
                                                <span>{item?.id}</span>
                                                <h4>{item?.title}</h4>
                                            </div>
                                            <p>{item?.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className='privacy_security_btn'>
                                    <button onClick={onProductDetail} className='active hover-effect'>{PrivacySecurityData?.shopNow}</button>
                                    <a href="https://www.amazon.in/dp/B0DF36ZM27?th=1" target='_blank' className='hover-effect'>{PrivacySecurityData?.order}
                                        <img src={PrivacySecurityData?.imageAmezon} alt="" />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 10 20" fill="none">
                                            <path d="M1.74248 4.91676C2.13303 4.52655 2.76612 4.52634 3.15654 4.91676L9.51982 11.281C9.91035 11.6715 9.91035 12.3046 9.51982 12.6951L3.15654 19.0593C2.76612 19.4498 2.13303 19.4496 1.74248 19.0593C1.35195 18.6688 1.35195 18.0358 1.74248 17.6453L7.39873 11.9881L1.74248 6.33083C1.35195 5.9403 1.35195 5.30729 1.74248 4.91676Z" fill="white" />
                                        </svg>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )


}

export default PrivacySecurity;
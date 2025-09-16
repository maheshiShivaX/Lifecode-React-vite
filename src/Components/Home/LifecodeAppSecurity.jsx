import '@/ComponentsCss/LifecodeAppSecurity.css';
import { LifecodeAppSecuritydData, LifecodeAppSecuritydData2 } from '../../_Services/SatactData';
import { Link } from 'react-router-dom';

const leftItems = LifecodeAppSecuritydData.childMenu.slice(0, 4);
const rightItems = LifecodeAppSecuritydData.childMenu.slice(4, 8);

const leftItems1 = LifecodeAppSecuritydData2.childMenu.slice(0, 6);
// const rightItems1 = LifecodeAppSecuritydData2.childMenu.slice(3, 6);

const LifecodeAppSecurity = () => {
    return (
        <>
            <section className="lifecode-app-security">
                <div className="container">
                    <div className='lifecode-app-security-inner'>
                        <div className='lifecode_app_hedding'>
                            {/* <p data-aos="fade-up" data-aos-delay="800">{LifecodeAppSecuritydData?.title}</p> */}
                            <h2 data-aos="fade-down" data-aos-delay="400">{LifecodeAppSecuritydData?.hedding}</h2>
                        </div>
                        <div className="row doorball_row lifecode-feature-and-security">
                            <div className="col-lg-7 col-md-7 col-sm-12">
                                <div className='lifecode_app_security_right_content_wrapper'>
                                    <div className="lifecode_app_security_right_content">
                                        {/* <span data-aos="fade-left" data-aos-delay="400">{LifecodeAppSecuritydData.subtitle}</span> */}
                                        <h2 data-aos="fade-down" data-aos-delay="800">{LifecodeAppSecuritydData2.subhedding}</h2>
                                        <p data-aos="fade-right" data-aos-delay="1000">{LifecodeAppSecuritydData2.subdescription}</p>
                                    </div>
                                    <div className="lifecode_app_security_rightItem">
                                        <ul className="lifecode_app_security_leftItem_list">
                                            {leftItems1.map((item) => (
                                                <li key={item.id} data-aos="fade-left" data-aos-delay="400">
                                                    <span>{item.id}</span>
                                                    {item.title}
                                                </li>
                                            ))}
                                            {/* <div className='more_details_button'>
                                                <Link to='' className='hover-effect'>{LifecodeAppSecuritydData?.buttonText}</Link>
                                            </div> */}
                                        </ul>
                                        {/* <ul className="lifecode_app_security_rightItem_list">
                                            {rightItems1.map((item) => (
                                                <li key={item.id} data-aos="fade-right" data-aos-delay="400">
                                                    <span>{item.id}</span>
                                                    {item.title}
                                                </li>
                                            ))}

                                        </ul> */}
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-12">
                                <div className="lifecode_app_security_left_image">
                                    <img src={LifecodeAppSecuritydData2?.image} alt="Lifecode App Security" data-aos="fade-right" data-aos-delay="400" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-12">
                                <div className="lifecode_app_security_left_image">
                                    <img src={LifecodeAppSecuritydData?.image} alt="Lifecode App Security" data-aos="fade-right" data-aos-delay="400" />
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-12">
                                <div className='lifecode_app_security_right_content_wrapper'>
                                    <div className="lifecode_app_security_right_content">
                                        {/* <span data-aos="fade-left" data-aos-delay="400">{LifecodeAppSecuritydData.subtitle}</span> */}
                                        <h2 data-aos="fade-down" data-aos-delay="800">{LifecodeAppSecuritydData.subhedding}</h2>
                                        <p data-aos="fade-right" data-aos-delay="1000">{LifecodeAppSecuritydData.subdescription}</p>
                                    </div>
                                    <div className="lifecode_app_security_rightItem">
                                        <ul className="lifecode_app_security_leftItem_list">
                                            {leftItems.map((item) => (
                                                <li key={item.id} data-aos="fade-left" data-aos-delay="400">
                                                    <span>{item.id}</span>
                                                    {item.title}
                                                </li>
                                            ))}
                                            {/* <div className='more_details_button'>
                                                <Link to='' className='hover-effect'>{LifecodeAppSecuritydData?.buttonText}</Link>
                                            </div> */}
                                        </ul>
                                        <ul className="lifecode_app_security_rightItem_list">
                                            {rightItems.map((item) => (
                                                <li key={item.id} data-aos="fade-right" data-aos-delay="400">
                                                    <span>{item.id}</span>
                                                    {item.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default LifecodeAppSecurity;
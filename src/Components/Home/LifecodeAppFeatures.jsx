import { Link } from "react-router-dom";
import { LifecodeAppSecuritydData1 } from "../../_Services/SatactData";
const leftItems = LifecodeAppSecuritydData1.childMenu.slice(0, 4);
const rightItems = LifecodeAppSecuritydData1.childMenu.slice(4, 8);

const LifecodeAppFeatures = () => {
    
    return (
        <>
            <section className="lifecode-app-security">
                <div className="container">
                    <div className='lifecode-app-security-inner'>
                        <div className='lifecode_app_hedding'>
                            {/* <p data-aos="fade-up" data-aos-delay="800">{LifecodeAppSecuritydData1?.title}</p> */}
                            {/* <h2 data-aos="fade-down" data-aos-delay="400">{LifecodeAppSecuritydData1?.hedding}</h2> */}
                        </div>
                        <div className="row flex_d">
                            <div className="col-lg-7 col-md-7 col-sm-12">
                                <div className='lifecode_app_security_right_content_wrapper'>
                                    <div className="lifecode_app_security_right_content">
                                        {/* <span data-aos="fade-left" data-aos-delay="400">{LifecodeAppSecuritydData1.subtitle}</span> */}
                                        <h2 data-aos="fade-down" data-aos-delay="800">{LifecodeAppSecuritydData1.subhedding}</h2>
                                        <p data-aos="fade-right" data-aos-delay="1000">{LifecodeAppSecuritydData1.subdescription}</p>
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
                                                <Link to='' className='hover-effect'>{LifecodeAppSecuritydData1?.buttonText}</Link>
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
                            <div className="col-lg-5 col-md-5 col-sm-12">
                                <div className="lifecode_app_security_left_image">
                                    <img src={LifecodeAppSecuritydData1?.image} alt="Lifecode App Security" data-aos="fade-right" data-aos-delay="400" />
                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
}


export default LifecodeAppFeatures;
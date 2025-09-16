import '@/ComponentsCss/SmartBusinessCard.css';
import { SmartBusinessCardData } from '../../_Services/SatactData';
import { Link } from 'react-router-dom';

const SmartBusinessCard = () => {
    return (
        <>
            <section className="smart-business-card">
                {/* Smart Doorbell */}
                <div className='container'>
                    <div className='smart-business-inner'>
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-5 col-sm-12">
                                <div className='right-side-image'>
                                    <img src={SmartBusinessCardData.imageSmartDoor} alt="" data-aos="zoom-in-right" />
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-12">
                                <div className="smart-business-card-left-content">
                                    <h3>{SmartBusinessCardData.titleSmartDoor}</h3>
                                    <p>{SmartBusinessCardData.SmartDoordescription}</p>
                                    {SmartBusinessCardData?.childMenu1?.map((item, index) => (
                                        <div className='left-content-arrow' key={index} data-aos="fade-right" data-aos-delay="600">
                                            <img src={item.iconImage} alt="" />
                                            <span>{item.title}</span>
                                        </div>
                                    ))}
                                    {/* <div className="smart-business-card-btn">
                                        <Link to={SmartBusinessCardData.shopNow} className='hover-effect'>Shop Now</Link>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Smart Doorbell End */}
                <div className='smart_diveder'></div>
                <div className='container'>
                    <div className='smart-business-inner smart_sende_row'>
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-5 col-sm-12">
                                <div className="smart-business-card-left-content">
                                    <h3>{SmartBusinessCardData.title}</h3>
                                    <p>{SmartBusinessCardData.description}</p>
                                    {SmartBusinessCardData?.childMenu?.map((item, index) => (
                                        <div className='left-content-arrow' key={index} data-aos="fade-right" data-aos-delay="600">
                                            <img src={item.iconImage} alt="" />
                                            <span>{item.title}</span>
                                        </div>
                                    ))}
                                    {/* <div className="smart-business-card-btn">
                                        <Link to={SmartBusinessCardData.shopNow} className='hover-effect'>Shop Now</Link>
                                    </div> */}
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-12">
                                <div className='right-side-image'>
                                    <img src={SmartBusinessCardData.image} alt="" data-aos="zoom-in-right" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default SmartBusinessCard;
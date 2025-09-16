import { ServicesData } from "../../_Services/SatactData";
import '@/ComponentsCss/Services.css';

const Services = () => {
    return (
        <div className="services-container">
            <div className="services-content">
                {ServicesData?.map((item, i) => (
                    <div className="service-box" key={i}>
                        <div className="service_icon">
                            <img src={item?.icon} alt="" />
                        </div>
                        <h6>{item?.title}</h6>
                        <p>{item?.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Services;
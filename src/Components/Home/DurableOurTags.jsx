import '@/ComponentsCss/DurableOurTags.css';
import { DurableOurTagsData } from '../../_Services/SatactData';
import { useState } from 'react';
const features = [
    {
        title: 'Instant Emergency Assistance',
        description: 'When seconds matter most, Lifecode provides immediate access to your emergency contacts through a simple scan—no personal phone numbers exposed.',
        number: '01',
        imageClass: 'SmartphoneConnectivity',
        imageSrc: './images/privacyProductBaner.webp',
    },
    {
        title: 'Private Contact System',
        description: 'Our revolutionary communication system allows others to contact you about your vehicle without ever seeing your phone number. This eliminates privacy concerns while still enabling important communications about parking issues or emergencies.',
        number: '02',
        imageClass: 'WaterproofProtection',
        imageSrc: './images/HowDurable1.webp',
    },
    {
        title: 'Real-Time Notifications',
        description: 'Receive instant alerts when someone scans your tag, allowing you to respond immediately to parking issues, emergencies, or lost item situations.',
        number: '03',
        imageClass: 'DurableStickers',
        imageSrc: './images/HowDurable2.webp',
    },
    {
        title: 'Pet/Luggage Security',
        description: `Help lost pets find their way home while keeping your contact information private. 
                      Recover lost luggage without putting your identity at risk.`,
        number: '04',
        imageClass: 'EnhancedFunctionality',
        imageSrc: './images/privacyProductBaner.webp',
    },
];


function DurableOurTags() {
    const [activeImage, setActiveImage] = useState('SmartphoneConnectivity');
    return (
        <>
            <section className='durable_our_tags_weper'>
                <div className="container">
                    <div className='durable_our_tags_inner'>
                        <div className='durable_our_tags_hedding'>
                            {/* <p data-aos="fade-up" data-aos-delay="800">{DurableOurTagsData?.title}</p> */}
                            <h2 data-aos="fade-down" data-aos-delay="400">{DurableOurTagsData?.hedding}</h2>
                        </div>
                        <div className="feature-container">
                            {/* Image Display Area */}
                            <div className="durable_our_tags_show_hover">
                                {features.map((feature, index) => (
                                    <img data-aos="zoom-in-up" data-aos-delay="800"
                                        key={index}
                                        src={feature.imageSrc}
                                        alt={feature.title}
                                        className={`hover-image ${feature.imageClass}`}
                                        style={{
                                            display: activeImage === feature.imageClass ? 'block' : 'none',
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Text Feature Box Area */}
                            <div className="durable_our_tags_content">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`feature-box ${activeImage === feature.imageClass ? 'active' : ''}`}
                                        onMouseEnter={() => setActiveImage(feature.imageClass)}
                                    >
                                        <h3 className="title">{feature.title}</h3>
                                        <p className="description">{feature.description}</p>
                                        <span className="number">{feature.number}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default DurableOurTags;

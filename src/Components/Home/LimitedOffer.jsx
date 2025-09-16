import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/ComponentsCss/LimitedOffer.css';
import { LimitedOfferData } from '../../_Services/SatactData';
import { get } from '../../_Services/apiService';
import { API_URL } from '../../_Services/apiUrl';

const LimitedOffer = () => {
    const navigate = useNavigate();
    const [offerData, setOfferData] = useState(null);

    const [timeLeft, setTimeLeft] = useState(0);

    // ⏳ countdown calculation
    const calculateTimeLeft = (endDate) => {
        const now = new Date().getTime();
        const end = new Date(endDate).getTime();
        const diff = Math.max(0, Math.floor((end - now) / 1000)); // in seconds
        return diff;
    };

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timeLeft]);


    useEffect(() => {
        const GetOffer = async () => {
            try {
                const response = await get(API_URL.flashdeals);

                if (response?.status === true) {
                    const data = response?.data;
                    setOfferData(data);

                    // ⏳ set countdown using end_date
                    if (data?.end_date) {
                        setTimeLeft(calculateTimeLeft(data.end_date));
                    }
                }
            } catch {
                return null;
            }
        };

        GetOffer();
    }, []);

    // convert seconds → days/hours/minutes/seconds
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const onProducts = () => {
        navigate(`/products/${offerData?.id}`);
    }

    return (
        <section>
            <div className='container'>
                <div className='LimitedOffer_wepper'>
                    <div className='row align-items-center'>
                        <div className='col-lg-3 col-md-6 col-sm-12' data-aos="fade-right" data-aos-duration="1000">
                            <div className='LimitedOffer_card_img'>
                                {offerData?.banner && (
                                    <img src={offerData.banner} alt="Offer" />
                                )}
                            </div>
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-12 d-sm-block d-flex justify-content-center' data-aos="fade-up" data-aos-duration="1000">
                            <div className='LimitedOffer_card_content'>
                                <span>{LimitedOfferData.title}</span>
                                <h3>{offerData?.title}</h3>
                                <p>{LimitedOfferData.description}</p>
                                <div className='text-sm-start text-center mb-sm-auto mb-3'>
                                    <button onClick={onProducts} className='hover-effect'>
                                        {LimitedOfferData.buttonText}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-3 col-md-6 col-sm-12' data-aos="fade-left" data-aos-duration="1000">
                            <div className="countdown">
                                <div className="box">
                                    <span>{days}</span>
                                    <div className="label">Days</div>
                                </div>
                                <div className="box">
                                    <span>{hours}</span>
                                    <div className="label">Hrs</div>
                                </div>
                                <div className="box">
                                    <span>{minutes}</span>
                                    <div className="label">Mins</div>
                                </div>
                                <div className="box">
                                    <span>{seconds}</span>
                                    <div className="label">Secs</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default LimitedOffer;

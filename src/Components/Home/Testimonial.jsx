import '@/ComponentsCss/Testimonial.css';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { TestimonialsData } from '../../_Services/SatactData';
import { API_URL } from '../../_Services/apiUrl';
import { get } from '../../_Services/apiService';
import { Rating } from 'react-simple-star-rating';

const Testimonial = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [productRating, setProductRating] = useState([]);

    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    const ProductRating = async () => {
        try {
            const response = await get(API_URL?.reviewsByProductId);

            if (response?.status) {
                setProductRating(response?.data)
            }
        } catch {
            setProductRating([]);
        }
    };

    useEffect(() => {
        ProductRating();
    }, []);

    return (
        <>
            {productRating?.length > 0 && (
                <section className='testimonial-section'>
                    <div className='gallery_media_left'>
                        {/* <p data-aos="fade-up" data-aos-delay="800">{TestimonialsData?.title}</p> */}
                        <h2 data-aos="fade-down" data-aos-delay="400">{TestimonialsData?.hedding}</h2>
                    </div>
                    <div className='container mt-4 pt-4'>
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={3}
                            loop={true}
                            autoplay={true}
                            onSwiper={setSwiperInstance}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                        >
                            {productRating?.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className="testimonial-container">
                                        <div className="testimonial-card">
                                            <div className="avatar">
                                                <img src={'./images/Testimonialsimage.png'} alt="Avatar" />
                                            </div>
                                            <div className='testimonial-card-text'>
                                                <p className="testimonial-text">
                                                    {item?.comment}
                                                </p>
                                                <div className="stars">
                                                    <Rating
                                                        initialValue={item?.rating > 0 ? item?.rating : 0}
                                                        readonly
                                                        size={22}
                                                        label={`Rating: ${item?.rating}`}
                                                        fractions={2}
                                                    />
                                                </div>
                                                <div className="name">{item?.customer?.f_name} {item?.customer?.l_name}</div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* <div className="swiper-button-container text-center next-prev-button_web testimonial_next_btn_wepper">
                        <button ref={prevRef} className="nav-button prev-button" style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <img src="./images/previewIcon.png" className='hover-effect' alt="" />
                        </button>
                        <button ref={nextRef} className="nav-button next-button" style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <img src="./images/nextIcon.png" className='hover-effect' alt="" />
                        </button>
                    </div> */}
                    </div>
                </section>
            )}
        </>
    )
}


export default Testimonial;
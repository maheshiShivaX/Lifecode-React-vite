import { Swiper, SwiperSlide } from "swiper/react";
import '@/ComponentsCss/TestimonialLogo.css';
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { TestimonialLogosData } from "../../_Services/SatactData";
import { useState } from "react";

const TestimonialLogo = (props) => {
    const { title, hedding } = props;
    const [setSwiperInstance] = useState(null);
    return (
        <>
            <section className='testimonial-logo-section'>
                <div className='gallery_media_left'>
                    <p data-aos="fade-up" data-aos-delay="800">{title}</p>
                    <h2 data-aos="fade-down" data-aos-delay="400">{hedding}</h2>
                </div>
                <div className="testimonial-logo-wrapper">
                    {/* <div className='container'>
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={80}
                            slidesPerView={6}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            onSwiper={setSwiperInstance}
                            breakpoints={{
                                320: { slidesPerView:2 },
                                768: { slidesPerView: 5 },
                                1024: { slidesPerView: 7 },
                            }}
                        >
                            {TestimonialLogosData.childMenu.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className="testimonial-logo">
                                        <img className="" src={item?.image} alt="Avatar" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div> */}
                    <div className="testimonial_slider_wrapper">
                        <div className="testimonial_slider_track">
                            {TestimonialLogosData.childMenu.map((item, index) => (
                                <div className="testimonial_logo_slider" key={index}>
                                    <div className="testimonial_logo_slider_inner">
                                        <div className="testimonial-logo">
                                            <img src={item?.image} alt={`Logo ${index}`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TestimonialLogo;
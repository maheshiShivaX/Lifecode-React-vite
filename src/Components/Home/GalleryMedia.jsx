import '@/ComponentsCss/GalleryMedia.css';
import { GalleryMediaData } from '../../_Services/SatactData';
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules"; // ✅ Import EffectCoverflow
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow"; // ✅ Import Coverflow CSS

const GalleryMedia = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    return (
        <>
            <div className="gallery-media-werapper">
                <div className='one_line'></div>
                <div className="container">
                    <div className='gallery-media-inner'>
                        <div className="row align-items-center">
                            <div className="col-lg-3 gallery_media_left_section">
                                <div className='gallery_media_left'>
                                    {/* <p data-aos="fade-up" data-aos-delay="800">{GalleryMediaData?.title}</p> */}
                                    <h2 data-aos="fade-down" data-aos-delay="400">{GalleryMediaData?.hedding}</h2>
                                </div>
                                <div className='gallery_media_right_line'></div>
                            </div>

                            <div className="col-lg-9">
                                <div className="gallery-container">
                                    <div className="swiper-wrapper-custom">
                                        <Swiper
                                            modules={[Navigation, Autoplay, EffectCoverflow]} // ✅ Added EffectCoverflow
                                            effect={"coverflow"}
                                            grabCursor={true}
                                            centeredSlides={true}
                                            loop={true}
                                            spaceBetween={25}
                                            slidesPerView={3}
                                            autoplay={{
                                                delay: 3000,
                                                disableOnInteraction: false,
                                            }}
                                            coverflowEffect={{
                                                rotate: 50,
                                                stretch: 0,
                                                depth: 100,
                                                modifier: 1,
                                                slideShadows: true,
                                            }}
                                            onSwiper={setSwiperInstance}
                                            breakpoints={{
                                                320: { slidesPerView: 1},
                                                768: { slidesPerView: 2 },
                                                1024: { slidesPerView: 3 },
                                            }}
                                        >
                                            {GalleryMediaData.childMenu.map((item) => (
                                                <SwiperSlide key={item.id}>
                                                    <img src={item.image} alt={`Gallery ${item.id}`} className="gallery-image" />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>

                                        <div className="swiper-button-container">
                                            <button ref={prevRef} className="nav-button prev-button">
                                                <img src="./images/leftAroow.svg" alt="" />
                                            </button>
                                            <button ref={nextRef} className="nav-button next-button">
                                                <img src="./images/rightAroow.png" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='one_line'></div>
            </div>
        </>
    );
}

export default GalleryMedia;

import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const ImageSection = (props) => {
    const { productBySlug } = props;
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Handle thumbnail click
    const handleThumbnailClick = (i) => {
        setActiveIndex(i);
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideToLoop(i); // slideToLoop for loop mode
        }
    };

    const images = Array.isArray(productBySlug?.images)
        ? productBySlug.images.slice(0, 4)
        : [];

    return (
        
        <div className="product_image_wrapper">
            <div className="product_image_content">
                <Swiper
                    modules={[Pagination]}
                    pagination={false}
                    rewind={true}
                    spaceBetween={20}
                    loop={true}
                    className="mySwiper3"
                    ref={swiperRef}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.realIndex);
                    }}
                    slidesPerView={1}
                    autoplay={true}
                    initialSlide={activeIndex}
                >
                    {images?.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className="product_image_content">
                                <img
                                    src={item}
                                    alt={`Product ${i + 1}`}
                                    className='w-100'
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="mobile_image_slider mt-2" style={{ display: 'flex', gap: 8 }}>
                {images?.map((item, i) => (
                    <div
                        key={i}
                        className={`product_image_content${activeIndex === i ? ' active' : ''}`}
                        onClick={() => handleThumbnailClick(i)}
                    >
                        <img
                            src={item}
                            alt={`Product ${i + 1}`}
                            className='w-100'
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSection;
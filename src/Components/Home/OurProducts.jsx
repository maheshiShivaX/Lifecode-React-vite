import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {  useNavigate } from 'react-router-dom';
import 'swiper/css/autoplay';
import '@/ComponentsCss/OurProducts.css';
import { OurProductData } from '../../_Services/SatactData';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { toast } from 'react-toastify';

const OurProducts = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    const {
        addCart,
        updateCart,
        openCartDrawer,
        cart,
        wishlist,
        removeFromWishlist,
        addToWishlist,
        onPreviousUrl,
        setProductId,
        setIsWishlistClick,
        products
    } = useContext(ShopContext);

    const handleWishlistToggle = (item) => {

        if (!isLoggedIn) {
            navigate('/login');
            setProductId(item?.id);
            setIsWishlistClick(true);
            onPreviousUrl(`/`);
            return;
        }

        const isWishlisted = wishlist?.some((x) => x.product_id === item?.id);

        if (isWishlisted) {
            removeFromWishlist(item?.id);
        } else {
            addToWishlist(item);
        }
    };

    const addToCart = async (item) => {
        const existingCartItem = cart.find(cartItem => Number(cartItem.product_id) === Number(item.id));
        const currentQty = existingCartItem ? Number(existingCartItem.quantity || 0) : 0;
        const newQty = currentQty + 1;

        // If item already in cart → update
        if (existingCartItem) {
            await updateCart(existingCartItem, newQty);

            toast.success("Item Added to cart");
            openCartDrawer();
            return;

        } else {
            // Else → add new item to cart
            await addCart(item, 1);

            toast.success("Item added to cart");
            openCartDrawer();
            return;

        }
    };

    const onProductDetail = (item) => {
        navigate(`/${item?.slug}`);
        onPreviousUrl(`/${item?.slug}`);
        setProductId(item?.id);
    }

    return (
        <section className="ourproduct_section">
            <div className="round_shodow_only"></div>
            <div className="container">
                <div className="ourproduct_section_inner">
                    <div className="ourproduct_heding mb-4">
                        <h2 data-aos="fade-down" data-aos-delay="600">{OurProductData[0]?.title}</h2>
                        <p data-aos="fade-down" data-aos-delay="800">{OurProductData[0]?.description}</p>
                    </div>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            // Assign refs for navigation before swiper initializes
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={true}
                        spaceBetween={30}
                        slidesPerView={3}
                        breakpoints={{
                            1024: { slidesPerView: 3 },
                            767: { slidesPerView: 2 },
                            // 767: { slidesPerView: 2 },
                            0: { slidesPerView: 1 },
                        }}
                        className="ourproduct_swiper"
                    >
                        {products.map((item, index) => {
                            const headerImage = item?.thumbnail;

                            const imagePath = headerImage;

                            return (
                                <SwiperSlide key={index}>
                                    <div
                                        className="ourproduct_card_main_box"                                    
                                    >
                                        <div onClick={() => onProductDetail(item)}>
                                            <div className="ourproduct_img">
                                                <img src={imagePath} alt={item.name} />
                                            </div>
                                            <div className="ourproduct_text">
                                                <div>
                                                    <h3>{item.name}</h3>
                                                    <p>{item?.sort_dec && item.sort_dec.length > 30
                                                        ? item.sort_dec.slice(0, 35) + '...'
                                                        : item?.sort_dec}</p>
                                                </div>
                                                <span>
                                                    <i className="fi fi-rr-plus"></i>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Hover box for current item only */}
                                        {OurProductData?.map((element, index) => (
                                            <div key={index} className='ourproduct_card_hover_box' >
                                                <span onClick={() => handleWishlistToggle(item)}>
                                                    <img src={element.heartIcon} alt='' />
                                                </span>
                                                <span onClick={() => addToCart(item)}>
                                                    <img src={element.cartIcon} alt='' />
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                        {/* Custom navigation buttons */}
                        <div className="swiper-navigation">
                            <button ref={prevRef} className="custom-swiper-button prev-button">
                                <img src="./images/previewIcon.png" className='hover-effect' alt="" />
                            </button>
                            <button ref={nextRef} className="custom-swiper-button next-button">
                                <img src="./images/nextIcon.png" className='hover-effect' alt="" />
                            </button>
                        </div>
                    </Swiper>

                </div>
            </div>
        </section>
    );
};

export default OurProducts;

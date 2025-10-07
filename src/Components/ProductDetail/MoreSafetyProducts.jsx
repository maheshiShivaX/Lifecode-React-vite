import '@/ComponentsCss/MoreSafetyProducts.css';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { OurProductData } from '../../_Services/SatactData';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';

const MoreSafetyProducts = (props) => {
    const { productBySlug } = props;
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
        products,
         openModal
    } = useContext(ShopContext);

    const filteredProducts = products?.filter(
        (item) => item.id !== productBySlug?.id
    );

    const handleWishlistToggle = (item) => {

        if (!isLoggedIn) {
            // navigate('/login');
            openModal();
            setProductId(item?.id);
            setIsWishlistClick(true);
            onPreviousUrl(`/${item?.slug}`);
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
        <section className='more_saftety_wepper'>
            <div className='ourproduct_section '>
                <div className='round_shodow_only'></div>
                <div className='container'>
                    <div className="ourproduct_section">
                        <div className='ourproduct_heding'>
                            <h2 data-aos="fade-down" data-aos-delay="600">Buy More Safety Products</h2>
                            <p data-aos="fade-down" data-aos-delay="800">
                                Discover a wide range of smart and reliable safety solutions designed to protect your family, vehicles, pets, and belongings. From emergency QR stickers to advanced security tools, LifeCode products make safety simple, effective, and always within your reach.
                            </p>
                        </div>
                        {/* Swiper Slider */}
                        <Swiper className='mt-5'
                            modules={[Navigation, Autoplay]}
                            navigation={{
                                nextEl: '.custom-next',
                                prevEl: '.custom-prev',
                            }}
                            // autoplay={{
                            //     delay: 3000,
                            //     disableOnInteraction: false,
                            // }}
                            loop={true}
                            spaceBetween={30}
                            slidesPerView={3}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                400: { slidesPerView: 1},
                                572: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                        >
                            {filteredProducts?.map((item, index) => {
                                const headerImage = item?.thumbnail;

                                const imagePath = headerImage;

                                return (
                                    <SwiperSlide key={index}>
                                        <div className='ourproduct_card_main_box' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                                            <div onClick={() => onProductDetail(item)}>
                                                <div className='ourproduct_img'>
                                                    <img src={imagePath} alt={item?.displayName} />
                                                </div>
                                                <div className='ourproduct_text'>
                                                    <div>
                                                        <h3>{item.name}</h3>
                                                        <p className='more_sefty_pr_dec'>{item?.sort_dec && item.sort_dec.length > 30
                                                            ? item.sort_dec.slice(0, 35) + '...'
                                                            : item?.sort_dec}</p>
                                                    </div>
                                                    <span className='more_sefty_pr_icon_plus'><i className="fi fi-rr-plus"></i></span>
                                                </div>
                                            </div>

                                            {OurProductData?.map((element, index) => (
                                                <div key={index} className='ourproduct_card_hover_box' >
                                                    <span onClick={() => handleWishlistToggle(element)}>
                                                        <img src={element.heartIcon} alt='' />
                                                    </span>
                                                    <span onClick={() => addToCart(item)}>
                                                        <img src={element.cartIcon} alt='' />
                                                    </span>
                                                    {/* <span onClick={() => onProductDetail(item)}>
                                                        <img src={element.eyeIcon} alt='' />
                                                    </span> */}

                                                </div>
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        {/* Custom Navigation Buttons */}
                        <div className='custom-swiper-button prev-buttonn text-center'>
                            <button className='custom-prev'>   <img src="../images/previewIcon.png" className='hover-effect' alt="" /></button>
                            <button className='custom-next'>  <img src="../images/nextIcon.png" className='hover-effect' alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MoreSafetyProducts;
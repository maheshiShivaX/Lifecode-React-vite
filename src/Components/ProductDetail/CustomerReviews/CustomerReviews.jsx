import React, { useRef, useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import '../../../ComponentsCss/CustomerReviews.css';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Rating } from 'react-simple-star-rating';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../../_Services/apiService";
import { API_URL } from "../../../_Services/apiUrl";
import { formatDate1 } from "../../../utils/dateFormet";

const CustomerReviews = ({ productBySlug }) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [productRatings, setProductRatings] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        product_id: productBySlug?.id || null,
        comment: "",
        rating: 0
    });

    useEffect(() => {
        if (productBySlug?.id) {
            setFormData((prev) => ({
                ...prev,
                product_id: productBySlug.id
            }));
        }
    }, [productBySlug]);

    // Update rating
    const handleRating = (rate) => {
        setFormData((prev) => ({
            ...prev,
            rating: rate
        }));
    };

    // Update comment input
    const handleCommentChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            comment: e.target.value
        }));
    };

    const SaveReviews = async () => {
        if (!isLoggedIn) {
            navigate('/login');
            sessionStorage.setItem('priviousUrl', `/${productBySlug?.slug}`);
            return;
        }

        if (!formData.comment || formData.rating === 0) {
            toast.error("Please enter a comment and rating");
            return;
        }

        try {
            const res = await post(API_URL?.saveReviews, formData);

            if (res?.status === true) {
                toast.success("Thank you for your feedback!");
                setFormData({
                    product_id: productBySlug?.id || null,
                    comment: "",
                    rating: 0
                });
                ProductRating();
            } else {
                toast.error("Failed to submit review");
            }
        } catch {
            toast.error("Failed to submit review");
        }
    };

    const ProductRating = useCallback(async () => {
        try {
            const response = await get(API_URL?.reviewsByProductId + `/` + productBySlug?.id);

            if (response?.length > 0) {
                setProductRatings(response)
            }
        } catch {
            setProductRatings([]);
        }
    }, [productBySlug?.id]);

    useEffect(() => {
        ProductRating();
    }, [ProductRating]);

    return (
        <div className="customer-feedback">
            <div className="container">
                <div className="testimonial-container spot_light_content">
                    {/* Custom Navigation */}
                    <div className="custom-navigation">
                        <button ref={prevRef} className="custom-prev" aria-label="Previous slide">
                            {/* Custom Left Arrow SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect width="40" height="40" rx="20" fill="white" />
                                <path d="M23.071 13L16 20.0711" stroke="#CA4900" strokeWidth="2" strokeLinecap="round" />
                                <path d="M23.071 27.0713L16 20.0002" stroke="#CA4900" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                        <button ref={nextRef} className="custom-next" aria-label="Next slide">
                            {/* Custom Right Arrow SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                                <rect x="0.164185" y="0.0786133" width="40" height="40" rx="20" fill="#ffffff" />
                                <path d="M16.1642 13.0786L23.2353 20.1497" stroke="#CA4900" strokeWidth="2" strokeLinecap="round" />
                                <path d="M16.1642 27.1499L23.2353 20.0788" stroke="#CA4900" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={10}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                        loop={true}
                        slidesPerView={3}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            572: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {productRatings?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className={`testimonial-card`}>
                                    <div className="testimonial-card-inner testimonial-card-readonly">
                                        <div className="user_profile_wrapper">
                                            <img className="user_profile" src={`./images/userprofile.jpg`} alt="" />
                                            <h4>{item?.customer?.f_name} {item?.customer?.l_name}</h4>
                                        </div>
                                        <div>
                                            <p className="text-white">{item?.comment}</p>
                                        </div>
                                        <div className="date_sav">
                                            <span >{formatDate1(item?.created_at)}</span>
                                            <Rating
                                                initialValue={item?.rating}
                                                readonly
                                                size={22}
                                                label={`Rating: ${item?.rating}`}
                                                fractions={2}
                                            />
                                        </div>
                                    </div>

                                    <p className="customer_feedback_remark mt-2">{item?.remark}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="testimonial_enter_wepper_heder">
                        <div className={`testimonial-card-enter`}>
                            <input
                                type="text"
                                placeholder="Rate this product and tell others what you think"
                                value={formData.comment}
                                onChange={handleCommentChange}
                            />
                            <div className="testimonial-card-inner-enter">
                                <Rating
                                    onClick={handleRating}
                                    size={22}
                                    allowFraction
                                    initialValue={formData.rating}
                                    transition
                                />
                                <button className="Submit_btn" type="button" onClick={SaveReviews}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerReviews;
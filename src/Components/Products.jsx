import { useState } from "react";
import { get } from "../_Services/apiService";
import { API_URL } from "../_Services/apiUrl";
import Layout from "./Shared/Layout";
import { useEffect } from "react";
import Breadcrumb from "./Common/Breadcrumb";
import { LimitedOfferData, OurProductData } from "../_Services/SatactData";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import LimitedOffer from "./Home/LimitedOffer";
import TestimonialLogo from "./Home/TestimonialLogo";

const Products = () => {
    // inside your component
    const { id } = useParams();
    const [productData, setProductData] = useState([]);
    const navigate = useNavigate();

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
        isLoggedIn,
         openModal
    } = useContext(ShopContext);

    useEffect(() => {

        const GetProducts = async () => {
            try {
                let response;

                if (id) {
                    // ✅ when URL is /products/:id
                    response = await get(`${API_URL.flashDealsProducts}/${id}`);
                    if (response?.status === true) {
                        setProductData(response?.data)
                    }
                } else {
                    // ✅ when URL is /products
                    response = await get(API_URL.products);
                    setProductData(response?.products)
                }

            } catch {
                return null;
            }
        }

        GetProducts();
    }, [id]);

    const handleWishlistToggle = (item) => {

        if (!isLoggedIn) {
            // navigate('/login');
            openModal();
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

    const BreadcrumbMenu = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: `Our Products`
        },
    ]

    const onProductDetail = (item) => {
        navigate(`/${item?.slug}`);
    }

    return (
        <Layout>
            <div className="product_detail sec-padding-top">
                <div className="product_detail_container">
                    <div className="product_detail_header">
                        <h1>Our Products</h1>
                        <Breadcrumb BreadcrumbMenu={BreadcrumbMenu} />
                    </div>
                    <div className="products_list_main container">
                        <div className=" row mb-5">
                            {productData.map((item, index) => {
                                const headerImage = item?.thumbnail;

                                const imagePath = headerImage;

                                return (
                                    <div
                                        className="ourproduct_card_main_box col-lg-4 col-md-4 col-sm-6 mb-sm-0 mb-4"
                                        key={index}
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
                                )
                            })}
                        </div>
                    </div>
                    <div className="mt-5 pt-5">
                        <LimitedOffer />
                    </div>
                    <div>
                        <TestimonialLogo />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products;
import { useState, useCallback, useEffect } from "react";
import { get } from "../_Services/apiService";
import Layout from "./Shared/Layout";
import { API_URL } from "../_Services/apiUrl";
import { useNavigate, useParams } from "react-router-dom";
import ImageSection from "./ProductDetail/ImageSection";
import ProductContent from "./ProductDetail/ProductContent";

import "@/ComponentsCss/ProductDetail.css";
import Breadcrumb from "./Common/Breadcrumb";
import Services from "./Common/Services";
import ProductMoreInformation from "./ProductDetail/ProductMoreInformation";
import MoreSafetyProducts from "./ProductDetail/MoreSafetyProducts";
import TestimonialLogo from "./Home/TestimonialLogo";
import { ShopContext } from "../Context/ShopContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import Login from "./Login";

const ProductDetail = () => {
    const { slug } = useParams();
    const [productBySlug, setProductBySlug] = useState();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        wishlist,
        addToWishlist,
        addCart,
        updateCart,
        cart,
        openCartDrawer,
        removeFromWishlist,
        setProductId,
        setIsWishlistClick,
        onPreviousUrl,
        isLoggedIn,
        openModal
    } = useContext(ShopContext);

    const isWishlisted = wishlist?.some((item) => item.product_id === productBySlug?.id);

    const isCart = cart?.some(
        (item) => Number(item.product_id) === Number(productBySlug?.id)
    );

    const cartItem = isCart
        ? cart.find(
            (item) => Number(item.product_id) === Number(productBySlug?.id)
        )
        : null;

    const cartQty = cartItem?.quantity + quantity || quantity;

    const handleWishlistToggle = () => {
        if (!isLoggedIn) {
            // navigate('/login');
            openModal();
            setProductId(productBySlug?.id);
            setIsWishlistClick(true);
            onPreviousUrl(`/${slug}`);
            return;
        }

        if (isWishlisted) {
            removeFromWishlist(productBySlug?.id);
        } else {
            addToWishlist(productBySlug);
        }
    };

    const addToCart = async (item) => {
        localStorage.removeItem('product_id');
        if (isCart) {
            await updateCart(cartItem, cartQty);

            toast.success("Add Item in Cart");
            openCartDrawer();
            return;

        } else {
            const res = await addCart(item, cartQty);
            if (res?.status === 0) {
                toast(res.message);
                return;
            }

            toast.success("Add Item in Cart");
            openCartDrawer();
            return;
        }
    };

    const buyNow = async (item) => {
        setProductId(productBySlug?.id)

        if (isCart) {
            await updateCart(cartItem, quantity);
        } else {
            const res = await addCart(item, quantity);
            if (res?.status === 0) {
                toast(res.message);
                return;
            }
        }

        if (isLoggedIn) {
            navigate('/checkout');
        } else {
            // navigate('/login');
            openModal();
            onPreviousUrl(`/checkout`);
        }

        localStorage.setItem('product_id', productBySlug?.id);

    };

    const GetProductBySlug = useCallback(async () => {
        setLoading(true);
        try {

            const response = await get(`${API_URL.productBySlug}/${slug}`);

            if (response) {
                setProductBySlug(response)
            } else {
                return null;
            }
        } catch {
            return null;
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        GetProductBySlug();
    }, [GetProductBySlug]);

    const BreadcrumbMenu = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: `${productBySlug?.name}`
        },
    ]

    return (
        <>
            <Layout>
                {loading ? (
                    <div className="page-loader">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="product_detail sec-padding-top">
                        <div className="product_detail_container">
                            <div className="product_detail_header">
                                <h1>{productBySlug?.name}</h1>
                                <Breadcrumb BreadcrumbMenu={BreadcrumbMenu} />
                            </div>
                            <div className="product_detail_inner container">
                                <div className="product_detail_content row">
                                    <div className="col-lg-5 col-md-6 col-12">
                                        <div>
                                            <ImageSection productBySlug={productBySlug} />
                                        </div>
                                    </div>
                                    <div className="col-lg-7 col-md-6 col-12">
                                        <div className="">
                                            <ProductContent
                                                productBySlug={productBySlug}
                                                handleWishlistToggle={handleWishlistToggle}
                                                addToCart={addToCart}
                                                setQuantity={setQuantity}
                                                quantity={quantity}
                                                isWishlisted={isWishlisted}
                                                buyNow={buyNow}
                                                isLoggedIn={isLoggedIn}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-more-information container">
                                <ProductMoreInformation productBySlug={productBySlug} />
                            </div>
                            <div className="more-safety-products container">
                                <MoreSafetyProducts productBySlug={productBySlug} setQuantity={setQuantity} />
                            </div>
                            <div className="services container">
                                <Services />
                            </div>
                            <div className="brands">
                                <div className="brands_container">
                                    <TestimonialLogo title='How Trustable Our Products' hedding='Brands that we worked with' />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Layout>

            {/* 
            <div className="login_form_model">
                <Login />
            </div> */}

            {/* Modal */}
        </>
    )
}

export default ProductDetail;
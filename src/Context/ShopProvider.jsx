import React, { useCallback, useEffect, useState } from 'react';
import { ShopContext } from './ShopContext';
import { get, post, del, put } from '../_Services/apiService';
import { API_URL } from '../_Services/apiUrl';
import { toast } from 'react-toastify';
import { getGuestId } from '../utils/guestUtils';

export const ShopProvider = ({ children }) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    // Home Header State
    const [homeHeader, setHomeHeader] = useState(false);
    // Products State
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState([]);

    // CartItemId State
    const [orderType, setOrderType] = useState();

    // CartItemId State
    const [toggleMenu, setToggleMenu] = useState(false);

    const toggleDrawer = () => setToggleMenu(prev => !prev);

    // CartItemId State
    const [cartItemId, setCartItemId] = useState("");

    // ProductId State
    const [productId, setProductId] = useState("");

    // priviousUrl State
    const [priviousUrl, setPriviousUrl] = useState("");

    // Wishlist Drawer State
    const [wishlistDrawer, setWishlistDrawer] = useState(false);
    const [isWishlistClick, setIsWishlistClick] = useState(false);

    // Wishlist State
    const [wishlist, setWishlist] = useState([]);

    // Cart Drawer State
    const [cartDrawer, setCartDrawer] = useState(false);

    // Cart State
    const [cart, setCart] = useState([]);

    const [isLoginForm, setIsLoginForm] = useState(false);


    const openModal = () => setIsLoginForm(true);
    const closeModal = () => setIsLoginForm(false);

    const [isCodModel, setIsCodModel] = useState(false);

    const openCodModal = () => setIsCodModel(true);
    const closeCodModal = () => setIsCodModel(false);

    // --- priviousUrl Functions ---
    const onPreviousUrl = (url) => {
        setPriviousUrl(url);
    };

    // ---cancel and return order Functions ---
    const onOrderType = (type) => {
        setOrderType(type);
    };

    const [guestIntId, setGuestIdInt] = useState(null);

    useEffect(() => {
        const loadGuestId = async () => {
            const { int } = await getGuestId(); // now async
            setGuestIdInt(int);
        };
        loadGuestId();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await get(API_URL.products);
                setProducts(response?.products || []);
            } catch {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // --- Wishlist Functions ---
    const openWishlistDrawer = () => setWishlistDrawer(true);
    const closeWishlistDrawer = () => setWishlistDrawer(false);

    const fetchWishlist = useCallback(async () => {
        if (!isLoggedIn) {
            return;
        }

        try {
            const response = await get(API_URL.wish_list);
            if (Array.isArray(response)) {
                setWishlist(response);
            }
        } catch {
            setWishlist([]);
        }
    }, [isLoggedIn]);

    const addToWishlist = useCallback(async (item) => {
        try {
            const response = await post(API_URL.add, { product_id: item?.id });
            if (response?.status) {
                toast.success("Added to Wishlist");
                fetchWishlist();
                return response;
            }
        } catch {
            return null;
        }
    }, [fetchWishlist]);

    const removeFromWishlist = useCallback(async (id) => {
        try {
            const response = await del(API_URL.remove, { product_id: id });
            if (response?.status) {
                toast.success("Removed from Wishlist");
                fetchWishlist();
                return response;
            }
        } catch {
            return null;
        }
    }, [fetchWishlist]);

    // --- Cart Functions (local for now) ---
    const openCartDrawer = () => setCartDrawer(true);
    const closeCartDrawer = () => setCartDrawer(false);

    const fetchCart = useCallback(async () => {

        if (!guestIntId) {
            return;
        }

        const response = await get(API_URL.cart, { guest_id: guestIntId });

        setCart(response || []);

    }, [guestIntId]);

    const addCart = async (item, qty) => {

        const response = await post(API_URL.addToCart, { id: item?.product_id || item?.id, quantity: qty, guest_id: guestIntId });

        if (response?.status === 1) {
            fetchCart();
            return response;
        }
        else if (response?.status === 0) {
            return response;
        }

    };

    const updateCart = async (cartItem, qty) => {
        // Authenticated user logic
        try {
            const response = await put(API_URL.updateCart, { key: cartItem?.id, quantity: qty, guest_id: guestIntId });

            if (response?.status === 1) {
                fetchCart();
                return response;
            }
            else if (response?.status === 0) {
                return response;
            }


        } catch {
            return null;
        }

    };

    const removeFromCart = async (cartItem) => {

        try {
            const response = await del(API_URL.removeCart, { key: cartItem?.id, guest_id: guestIntId });

            if (response?.status) {
                toast.success("Removed item from cart");
                fetchCart();
            }

            return response;
        } catch {
            return null;
        }
    };

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    return (
        <ShopContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                fetchWishlist,
                cart,
                addCart,
                removeFromCart,
                fetchCart,
                updateCart,
                wishlistDrawer,
                openWishlistDrawer,
                closeWishlistDrawer,
                cartDrawer,
                openCartDrawer,
                closeCartDrawer,
                setPriviousUrl,
                priviousUrl,
                onPreviousUrl,
                setProductId,
                productId,
                isWishlistClick,
                setIsWishlistClick,
                cartItemId,
                setCartItemId,
                toggleMenu,
                setToggleMenu,
                toggleDrawer,
                onOrderType,
                orderType,
                setOrderType,
                isLoggedIn,
                products,
                homeHeader,
                setHomeHeader,
                guestIntId,
                loading,
                isLoginForm,
                setIsLoginForm,
                openModal,
                closeModal,
                isCodModel,
                openCodModal,
                closeCodModal
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

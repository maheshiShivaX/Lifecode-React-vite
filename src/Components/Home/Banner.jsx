import '@/ComponentsCss/Banner.css';
import { useRef, useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Razorpay } from 'razorpay';

// ✅ Load Magic Checkout script
const loadMagicCheckout = () => {
  return new Promise((resolve) => {
    if (window.RazorpayCheckout) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/razorpay.checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Banner = () => {
  const bigImageRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  const { onPreviousUrl, setProductId, products } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  // Auto change image every 2 seconds
  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 2000); // 2 seconds
      return () => clearInterval(interval);
    }
  }, [products]);

  // Update current product when activeIndex changes and trigger animation
  useEffect(() => {
    if (products.length > 0) {
      setCurrentProduct(products[activeIndex]);

      if (bigImageRef.current) {
        // Remove the loaded class to reset animation
        bigImageRef.current.classList.remove('loaded');

        // Force reflow to restart animation
        void bigImageRef.current.offsetWidth;

        // Re-add the class after small delay
        setTimeout(() => {
          bigImageRef.current?.classList.add('loaded');
        }, 50);
      }
    }
  }, [activeIndex, products]);

  const getImagePath = (item) => {
    if (!item) return '';
    return typeof item === 'string' ? item : item.banner_image;
  };

  const handleImageLoad = () => {
    if (bigImageRef.current) {
      bigImageRef.current.classList.add('loaded');
    }
  };

  const onProductDetail = () => {
    if (!currentProduct) return;
    navigate(`/${currentProduct?.slug}`);
    onPreviousUrl(`/${currentProduct?.slug}`);
    setProductId(currentProduct?.id);
  };

  const ProceedtoBuy = async () => {
    setLoading(true);

    const options = {
      key: "rzp_live_8ih8SbHF9axtdc",   // ✅ Replace with your key
      order_id: "order_RMDVTcc6CmLh76", // ✅ Must come from backend
      amount: 39900,
      currency: "INR",
      name: "Your Business",
      description: "Order Payment",
      callback_url: "https://yourdomain.com/payment-callback",
      redirect: true,
      one_click_checkout: true,
      show_coupons: true,
      handler: function (response) {
        console.log("✅ Payment Success:", response);
      }
    };

    // ✅ Use window.RazorpayCheckout (not Razorpay from npm)
    if (window.RazorpayCheckout) {
      window.RazorpayCheckout.open(options);
    } else {
      alert("❌ Razorpay Magic Checkout not loaded");
    }

    setLoading(false);
  };

  return (
    <section className="banner_wepper">
      <div className="banner-content-main container d-flex align-items-end justify-content-between">
        <div className="main_sec_div">
          <div className="banner-text-wrep">
            <h3>
              HOPE YOU NEVER <br /> MEET AN ACCIDENT
            </h3>
            <p>BUT IF IT DOES, LIFECODE WILL HELP AND ASSIST.</p>
            <button onClick={onProductDetail}>Shop Now</button>
            {/* <button
              onClick={ProceedtoBuy}
              disabled={loading}
              style={{ padding: "10px 20px", background: "#333", color: "#fff" }}
            >
              {loading ? "Processing..." : "Proceed to Buy"}
            </button> */}
          </div>
          <div className="banner-slider-wrep">
            <div className="banner-slider-inner">
              <div className="banner-slider-top-border"></div>
              <div className="slider_banner_small_main"></div>
            </div>
          </div>
        </div>

        {/* Right-side big product preview */}
        <div className="banner-product">
          <div className="banner-product-section">
            {currentProduct && (
              <>
                <img
                  ref={bigImageRef}
                  className="banner_big_product_img"
                  src={getImagePath(currentProduct)}
                  alt="Product"
                  onLoad={handleImageLoad}
                  loading="lazy"
                  decoding="async"
                />
                <br />
                <img
                  className="circle_banner_img"
                  src="./images/bannerCircle.webp"
                  alt="Circle"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

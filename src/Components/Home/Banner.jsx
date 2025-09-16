import '@/ComponentsCss/Banner.css';
import { useRef, useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const bigImageRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  const { onPreviousUrl, setProductId, products } = useContext(ShopContext);

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

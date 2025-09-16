import '@/ComponentsCss/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';

const Header = () => {
  const navigate = useNavigate();
  const loginId = Number(sessionStorage.getItem('loginId'));
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('isLoggedIn') === 'true'
  );

  const {
    wishlist,
    cart,
    openWishlistDrawer,
    openCartDrawer,
    onPreviousUrl,
    toggleMenu,
    setToggleMenu,
    homeHeader,
    toggleDrawer
  } = useContext(ShopContext);

  useEffect(() => {
    const checkLogin = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(checkLogin);
  }, []);

  const onContact = () => {
    onPreviousUrl(`/contact-us`);
    navigate('/contact-us')
    setToggleMenu(false);
  }

  const onCart = () => {
    openCartDrawer();
    setToggleMenu(false);
  }

  const onHome = () => {
    navigate('/')
    setToggleMenu(false);
  }

  const onMyAccount = () => {
    navigate('/my-account')
    setToggleMenu(false);
  }

  const onHowToActive = () => {
    navigate('/how-to-active');
    onPreviousUrl(`/how-to-active`);
    setToggleMenu(false);
  }

  const onBlogs = () => {
    navigate('/blogs');
    onPreviousUrl(`/blogs`);
    setToggleMenu(false);
  }

  const onWishlistDrawer = () => {
    openWishlistDrawer();
    setToggleMenu(false);
  };

  const onProducts = () => {
    navigate('/products')
    onPreviousUrl(`/products`);
    setToggleMenu(false);
  };

  const totalQuantity = cart?.reduce((total, item) => total + Number(item.quantity || 0), 0);

  return (
    // Destop Header
    <>
      {/* <header className="header d-none d-lg-block"> */}
      <div className='d-lg-none d-flex justify-content-between top_mobile_header'>
        <Link to={'/'}  >
          <img src="../images/logo.svg" alt="Logo" />
        </Link>
        <button className="mobile-toggle-btn" onClick={toggleDrawer}>
          <i className="fi fi-rr-menu-burger"></i>
        </button>
      </div>

      <header className={`name_header ${homeHeader ? 'header' : 'header_other_page'}  ${toggleMenu ? 'active' : ""}`}>
        <div className={`container`}>
          <div className="d-lg-flex align-items-center justify-content-between header_inner_mobile">
            <div className='left_menu item-1'>
              <ul>
                <li onClick={onHome}><span className='nav-link'>Home</span></li>
                <div className='bottom_border_mobile'></div>
                {/* <li><span onClick={onAboutUs} className='nav-link' >About Us</span></li> */}
                {/* <div className='bottom_border_mobile'></div> */}

                <li><span onClick={onProducts} className='nav-link'>Products</span></li>
                <div className='bottom_border_mobile'></div>

                <li><span onClick={onHowToActive} className='nav-link' >How to Active</span></li>
                <div className='bottom_border_mobile'></div>

                <li><span onClick={onBlogs} className='nav-link' >Blogs</span></li>
                <div className='bottom_border_mobile'></div>

                <li onClick={onContact}><span className='nav-link' >Contact</span></li>
                <div className='bottom_border_mobile'></div>
              </ul>
            </div>

            <div className='logo_center item-2' >
              <Link to={'/'} className='desktop_logo_center'>
                {homeHeader ? (
                  <img src="../images/logo.svg" alt="Logo" />
                ) : (
                  <img src="../images/otherHeaderLogo.svg" alt="Logo" />
                )}



              </Link>
              <Link to={'/'} className='mobile_logo_drawer'>
                <img src="../images/logo.svg" alt="Logo" />
              </Link>
              <p className='cross_icon' onClick={toggleDrawer}><i className="fi fi-rr-cross"></i></p>
            </div>

            <div className='right_menu item-3'>
              <ul>
                <li className='mobile_number'>
                  <i className="fi fi-rr-phone-call"></i>
                  <Link to={'tel:9829197777'}>
                    +91 9829197777

                  </Link>
                </li>
                <div className='heder_divder'></div>
                <li className='mail_id'>
                  <i className="fi fi-rr-envelope"></i>
                  <Link to={'mailto:life@lifecode.co.in'}>
                    life@lifecode.co.in
                  </Link>
                </li>
                <div className='heder_divder'></div>
                <li className='cart_icon' onClick={openCartDrawer}>
                  <span className='badge_wepper'>
                    <i className="fi fi-rr-shopping-cart" ></i>
                    <span className='mobile_cart_name' onClick={onCart}>Cart {`(${totalQuantity})`}</span>
                    {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
                    <div className='heder_divder'></div>
                  </span>
                </li>
                <div className='bottom_border_mobile'></div>
                <li className='cart_icon cart_hoverwepper'>
                  <span>
                    <i className="fi fi-rr-user"></i>
                    <div className='hover_show_data'>
                      <div className='left_menu'>
                        {isLoggedIn && loginId ? (
                          <ul>
                            <li onClick={onMyAccount}><span className='nav-link'>My Account</span></li>
                            <div className='bottom_border_mobile'></div>
                            <li onClick={onWishlistDrawer} ><span className='nav-link' >Wishlist {`(${wishlist?.length})`}</span></li>
                            <div className='bottom_border_mobile'></div>
                          </ul>
                        ) : (
                          <ul>
                            <li><Link to={'/login'} className='nav-link'>Login</Link></li>
                            <div className='bottom_border_mobile'></div>
                          </ul>
                        )}
                      </div>
                    </div>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header >
    </>
  );
}

export default Header;
export const API_URL = {
    send_otp: 'auth/send_otp',
    verify_otp: 'auth/verify_otp',

    register: 'auth/register',

    login: 'LoginDetail/login',
    GetLoginDetailById: 'LoginDetail/GetLoginDetailById',

    GetState: 'State/GetState',

    SaveCancelStatus: 'ProductOrder/SaveCancelStatus',
    GetCancelType: 'CancelType/GetCancelType',
    SaveProductCancel: 'ProductCancel/SaveProductCancel',
    GetRetrunType: 'RetrunType/GetRetrunType',

    GetShipTracking: 'ShipmentOrder/GetShipTracking',

    GetStaticPageDescriptionByStaticPageId: 'StaticPageDescription/GetStaticPageDescriptionByStaticPageId',

    banners: 'banners',

    products: 'products/latest',
    productBySlug: 'products/details',
    filterProducts: 'products/filter',
    saveReviews: 'products/reviews/submit',
    reviewsByProductId: 'products/reviews',

    // Wishlist
    add: 'wish_list/add',
    remove: 'wish_list/remove',
    wish_list: 'wish_list',

    // Cart
    cart: 'cart',
    addToCart: 'cart/add',
    updateCart: 'cart/update',
    removeCart: 'cart/remove',
    removeAllCart: 'cart/remove_all',

    // Customer Address
    customerInfo: 'customer/info',
    addAddress: 'customer/address/add',
    updateAddress: 'customer/address/update',
    getAddress: 'customer/address/list',

    // Country and State
    countryList: 'country_list',
    state: 'get_state_countryid',

    applyCoupon: 'coupon/apply',
    categories: 'categories',
    contact: 'contact-us',

    //Others
    home_video: 'home_video',
    //Featured products
    getFeatured: 'products/featured',

    // Orders
    placeOrder: 'customer/order/place',
    orderList: 'products/order/list',
    orderDetailById: 'customer/order/details',
    trackOrder: 'customer/order/track',
    cancelOrder: 'customer/order/cancel-order',
    cancel_and_return: 'customer/order/cancel_and_return',
    refund: 'customer/order/refund',
    refundDetails: 'customer/refund-details',
    update_payment_status: 'customer/order/update_payment_status',
    updateprofile:'customer/update-profile',

    getGellery: 'get_gallery',
    getTopProduct: 'get_top_product',
    getRecipeCategory: 'recipe/categories',
    getRecipeList: 'recipe/get_recipe',
    getRecipeDetails: 'recipe/get_recipes_details',

    applyCouponCode: 'coupon/apply',

    faq: 'faq',

    blog: 'blog',

    flashdeals: 'flash-deals',
    flashDealsProducts: 'flash-deals/products',
}

// https://lifecodeapi.lifecode.co.in/api/v1/customer/update-profile

// POST

// f_name
// l_name,
// phone,
// image

// https://lifecodeapi.lifecode.co.in/api/v1/customer/order/cancel_and_return
// POST
// {
//     "orderId" : "100012",
//     "type" : "return", //return or cancel
//     "reason" : "Dont nedd this products",
//     "comment" : "Dont nedd this products",
//     "images" : ""
// }

// https://lifecodeapi.lifecode.co.in/api/v1/customer/order/update_payment_status
// POST


// {
//     "razorpay_order_id": "order_Qw0GVa6u5jZkvY",
//     "cart_item_id": "7"
// }


// https://lifecodeapi.lifecode.co.in/api/v1/products/order/list
// GET

// https://lifecodeapi.lifecode.co.in/api/v1/customer/order/details
// GET
// {
//     "order_id": 2
// }

// https://lifecodeapi.lifecode.co.in/api/v1/customer/order/track
// GET
// {
//     "order_id": 2
// }

// https://lifecodeapi.lifecode.co.in/api/v1/customer/order/cancel-order
// GET
// {
//     "order_id": 2
// }


// https://lifecodeapi.lifecode.co.in/api/v1/customer/order/refund
// GET
// {
//     "order_details_id": 2
// }

// https://lifecodeapi.lifecode.co.in/api/v1/customer/order/refund-details
// GET
// {
//     "id": 2
// }

// https://lifecodeapi.lifecode.co.in/api/v1/faq
// GET

// https://lifecodeapi.lifecode.co.in/api/v1/contact-us
// POST
// {
//     "name": "sakil",
//     "mobile_number": "7014579368",
//     "email": "sakil@gmail.com",
//     "subject": "this is test purpus",
//     "message": "this is test purpus"
// }

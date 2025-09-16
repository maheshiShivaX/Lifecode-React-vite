import { useState, useEffect } from "react";
import { API_URL } from "../_Services/apiUrl";
import { get } from "../_Services/apiService";
import OrderProductDetail from "./YourOrders/OrderProductDetail";
import OrderHead from "./YourOrders/OrderHead";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useCallback } from "react";
import CancelOrder from "./YourOrders/CancelOrder";

const YourOrders = () => {
    const navigate = useNavigate();
    const [orderByLoginId, setOrderByLoginId] = useState([]);
    const [activeButton, setActiveButton] = useState('success/pending');
    const [loading, setLoading] = useState(false);
    const [orderDetail, setOrderDetail] = useState([]);
    const [orderId, setOrderId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isCancel, setIsCancel] = useState(false);
    const [isFileShow, setIsFileShow] = useState(false);
    const itemsPerPage = 5;

    const {
        onPreviousUrl,
        setProductId,
        onOrderType,
    } = useContext(ShopContext);

    const subTotal = orderDetail?.reduce((acc, item) => acc + (item?.price || 0) * (item?.qty || 0), 0);

    const TotalDiscount = orderDetail?.reduce((acc, item) => acc + (item?.discount || 0), 0);

    const GetProductOrder = async () => {
        setLoading(true);
        try {

            const response = await get(API_URL.orderList);

            setOrderByLoginId(response?.orders);

        } catch {
            return null;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetProductOrder();
    }, []);

    // Group by product_id and sum qty properly
    const groupedProducts = orderDetail?.reduce((acc, curr) => {
        const productId = curr?.product_id;

        if (!acc[productId]) {
            // take the first product entry and set total_qty = qty
            acc[productId] = { ...curr, total_qty: curr?.qty || 0 };
        } else {
            // just sum qty (ignore API's total_qty field completely)
            acc[productId].total_qty += curr?.qty || 0;
        }

        return acc;
    }, {});

    // Convert object to array
    const uniqueProducts = Object.values(groupedProducts);

    const RsTag = "Rs";

    const handleDownloadInvoice = () => {
        const doc = new jsPDF();

        // Logo + Title
        doc.setFontSize(16);
        doc.text("Lifecode", 14, 15);
        doc.setFontSize(20);
        doc.text("Order Invoice", 105, 25, { align: "center" });

        // Invoice Info
        doc.setFontSize(12);
        doc.text(`Invoice: #${orderDetail[0]?.order_id}`, 14, 40);
        doc.text(
            `Order Date: ${new Date(orderDetail[0]?.created_at).toLocaleDateString()}`,
            150,
            40
        );

        // Shipping / Billing
        doc.setFontSize(12);
        doc.text("Shipping To:", 14, 55);
        doc.text(orderDetail[0]?.order?.billing_address_data?.contact_person_name || "", 14, 62);
        doc.text(orderDetail[0]?.order?.billing_address_data?.phone || "", 14, 68);
        doc.text(orderDetail[0]?.order?.billing_address_data?.address || "", 14, 74);
        doc.text(
            `${orderDetail[0]?.order?.billing_address_data?.city}, ${orderDetail[0]?.order?.billing_address_data?.state}`,
            14,
            80
        );

        doc.text("Billing Address:", 120, 55);
        doc.text(orderDetail[0]?.order?.billing_address_data?.contact_person_name || "", 120, 62);
        doc.text(orderDetail[0]?.order?.billing_address_data?.phone || "", 120, 68);
        doc.text(orderDetail[0]?.order?.billing_address_data?.address || "", 120, 74);
        doc.text(
            `${orderDetail[0]?.order?.billing_address_data?.city}, ${orderDetail[0]?.order?.billing_address_data?.state}`,
            120,
            80
        );

        // Product Table
        autoTable(doc, {
            startY: 95,
            head: [["SL", "Item", "Unit Price", "Qty", "Total"]],
            body: uniqueProducts?.map((item, index) => [
                index + 1,
                item?.product_details?.name,
                `${RsTag}. ${item?.price}`,
                item?.total_qty,
                `${RsTag}. ${item?.price * item?.total_qty}`,
            ]),

        });

        // Payment & Summary
        let finalY = doc.lastAutoTable.finalY + 10;
        doc.text("Payment Details", 14, finalY);
        doc.text(orderDetail[0]?.order?.payment_method || "", 14, finalY + 8);
        doc.text(new Date(orderDetail[0]?.created_at).toLocaleDateString(), 14, finalY + 16);

        autoTable(doc, {
            startY: finalY,
            margin: { left: 120 },
            body: [
                ["Items(s) Subtotal:", `${RsTag}. ${subTotal}`],
                ["Tax:", `+ ${RsTag}. ${Math.round(orderDetail[0]?.tax)}`],
                ["Discount:", `- ${RsTag}. ${TotalDiscount}`],
                ["Coupon Discount:", `- ${RsTag}. ${Math.round(orderDetail[0]?.order?.discount_amount)}`],
                ["Shipping & Handling:", `+ ${RsTag}. ${orderDetail[0]?.order?.shipping_cost}`],
                [{ content: "Grand Total", styles: { fontStyle: "bold" } },
                { content: `${RsTag}. ${Math.round(orderDetail[0]?.order?.order_amount)}`, styles: { fontStyle: "bold" } }],
            ],
            theme: "plain",
            styles: { halign: "right" },
        });

        // Footer
        doc.setFontSize(10);
        doc.text(
            "If you have any questions or feedback, please email us at life@lifecode.co.in",
            14,
            280
        );

        doc.save(`invoice-${orderDetail[0]?.order_id}.pdf`);
    };

    const onProductDetail = (item) => {
        navigate(`/${item?.product?.slug}`);
        onPreviousUrl(`/${item?.product?.slug}`);
        setProductId(item?.product_id);
    }

    const OrderDetailById = useCallback(async () => {
        if (!orderId) return;

        try {
            const response = await get(API_URL.orderDetailById, {
                order_id: orderId,
            });

            const data = response?.data;

            if (Array.isArray(data) && data.length > 0) {
                setOrderDetail(data);

            } else {
                setOrderDetail(null);
            }
        } catch {
            setOrderDetail(null);
        }
    }, [orderId]);

    useEffect(() => {
        OrderDetailById();
    }, [OrderDetailById]);

    const handleButtonClick = (status) => {
        setActiveButton(status);
        setCurrentPage(1); // reset to first page when filter changes
    };

    // ✅ Dynamic filter
    const filteredOrders = orderByLoginId?.filter((order) => {
        if (activeButton === "success/pending") {
            return order?.order_status === "pending" || order?.order_status === "success";
        }
        // if (activeButton === "failed") {
        //     return order?.order_status === "failed";
        // }
        if (activeButton === "cancel") {
            return order?.order_status === "Canceled";
        }
        return true;
    });

    // ✅ Pagination
    const paginatedOrders = filteredOrders?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    const onCancel = (id) => {
        setIsCancel(true);
        onOrderType('cancel');
        setIsFileShow(false);
        setOrderId(id)
    }

    const onReturn = (id) => {
        setIsCancel(true);
        onOrderType('return');
        setIsFileShow(true);
        setOrderId(id)
    }

    return (
        <div className="my-account-form">
            <h3 className="myOrderhedding">My Order</h3>
            {!isCancel && (
                <div className="your_orders_section">
                    <div className="order_filter">
                        <button
                            className={`status_filter ${activeButton === "success/pending" ? "active" : ""}`}
                            onClick={() => handleButtonClick("success/pending")}
                        >
                            Success/Pending
                        </button>
                        <button
                            className={`status_filter ${activeButton === "cancel" ? "active" : ""}`}
                            onClick={() => handleButtonClick("cancel")}
                        >
                            Cancelled Order
                        </button>
                    </div>

                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div>
                            {paginatedOrders?.map((item, i) => {
                                const modalId = `orderModal-${item.id}`;
                                const trackModalId = `staticBackdrop1${i}`;

                                return (
                                    <div key={i} className="order_item">
                                        <OrderHead
                                            item={item}
                                            setOrderId={setOrderId}
                                            handleDownloadInvoice={handleDownloadInvoice}
                                        />
                                        <OrderProductDetail
                                            item={item}
                                            modalId={modalId}
                                            trackModalId={trackModalId}
                                            onProductDetail={onProductDetail}
                                            setLoading={setLoading}
                                            onCancel={onCancel}
                                            onReturn={onReturn}
                                        />
                                    </div>
                                )
                            })}

                            <div className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {isCancel && (
                < div >
                    <CancelOrder
                        setIsCancel={setIsCancel}
                        isFileShow={isFileShow}
                        setIsFileShow={setIsFileShow}
                        orderId={orderId}
                        setOrderId={setOrderId}
                        GetProductOrder={GetProductOrder}
                    />
                </div >
            )}
        </div>
    )
}

export default YourOrders;
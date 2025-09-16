import { useState } from "react";
import { toast } from "react-toastify";
// import { FaFileUpload } from 'react-icons/fa';
import { post } from "../../_Services/apiService";
import { API_URL } from "../../_Services/apiUrl"; import '@/ComponentsCss/CancelOrder.css';
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { ReturnAndCancelType } from "../../_Services/SatactData";

const CancelOrder = (props) => {
    const { orderId, setOrderId, setIsCancel, isFileShow, setIsFileShow, GetProductOrder } = props;
    const {
        orderType
    } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        orderId: parseInt(orderId),
        type: String(orderType),
        reason: '',
        comment: '',
        images: null // not array
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (orderType?.toLowerCase() === "return") {
            setIsFileShow(true);
        } else {
            setIsFileShow(false);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFormData((prev) => ({
                ...prev,
                images: files
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm(
            `Are you sure you want to ${formData.type?.toLowerCase() === "return" ? "return" : "cancel"} this order?`
        );
        if (!isConfirmed) return;

        try {
            const dataToSend = new FormData();
            dataToSend.append("orderId", formData.orderId);
            dataToSend.append("type", formData.type);
            dataToSend.append("reason", formData.reason);
            dataToSend.append("comment", formData.comment);

            if (formData.images) {
                // if backend supports multiple files under same field
                for (let i = 0; i < formData.images.length; i++) {
                    dataToSend.append("images", formData.images[i]);
                }
                // if backend expects only one image:
                // dataToSend.append("images", formData.images[0]);
            }

            const response = await post(API_URL?.cancel_and_return, dataToSend);
            if (response.status === true) {
                toast.success(`Your order has been ${formData.type?.toLowerCase()}ed!`);
                setOrderId(0);
                setFormData({
                    orderId: 0,
                    type: "",
                    reason: "",
                    comment: "",
                    images: null
                });
                setIsCancel(false);
                GetProductOrder();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <>
            <div className="cancel_corder_main d-flex justify-content-center">
                <div className="w-100">
                    <div className="breadcrumb_data pb-4 text-white">
                        <span onClick={() => setIsCancel(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <g clip-path="url(#clip0_137_566)">
                                    <path d="M15.3324 6.5L9.3324 12.5L15.3324 18.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_137_566">
                                        <rect width="24" height="24" fill="white" transform="translate(0.332397 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="cancel_order_form">
                            <h5>Reason for {orderType?.toLowerCase() === 'return' ? 'Return' : orderType?.toLowerCase() === 'cancel' ? 'Cancel' : ''}</h5>

                            {ReturnAndCancelType && (
                                <div className="custom-select-wrapper">
                                    <select
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        className="custom-select"
                                        required
                                    >
                                        <option value="">Select a reason</option>
                                        {ReturnAndCancelType.filter(
                                            (item) =>
                                                String(orderType).toLowerCase() ===
                                                String(item?.type).toLowerCase()
                                        ).map((item, i) => (
                                            <option key={i} value={item.reason}>
                                                {item.reason}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {isFileShow && (
                                <div className="mt-4">
                                    <h5>Required Attachments</h5>
                                    <div className="file-upload-container">
                                        <label
                                            htmlFor="filePath"
                                            className="file-upload-label text-center"
                                        >
                                            <span className="upload-text">
                                                Select Images or Videos
                                            </span>
                                            {!formData.images && (
                                                <p className="message_info">
                                                    (Upload images/videos, Max size: 5 MB)
                                                </p>
                                            )}
                                        </label>

                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            name="images" // match backend
                                            accept="image/*,video/*"
                                            id="filePath"
                                            multiple
                                            style={{ display: "none" }}
                                            required
                                        />

                                        {formData.images && (
                                            <div className="selected-files-count text-center mt-2">
                                                <p>{formData.images.length} file(s) selected</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="cancel_description d-block mt-4">
                                <h5>Additional Comments</h5>
                                <textarea
                                    rows={6}
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    placeholder="Enter a description"
                                />
                            </div>

                            <button type="submit" className="cancel_order_submit_btn hover-effect mt-2">
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className="Instructions_section mt-4">
                        <div className="instructions_inner">
                            <h5>Submission Instructions:</h5>
                            <ul>
                                <li>Fill out this form completely.</li>
                                <li>Attach any required media evidence.</li>
                                <li>Submit the form via our website or email it to <a href="mailto:life@lifecode.co.in">life@lifecode.co.in</a></li>
                            </ul>
                            <p className="replece_note"><b>Note: </b>Replace will not be processed without the required media evidence.</p>
                        </div>
                        <div className="instructions_inner">
                            <h5>Replace/Exchange Instructions:</h5>
                            <ul>
                                <li>Ensure the item is in its original condition, with tags and packaging intact.</li>
                                <li>Pack the item securely and include this form in the return package.</li>
                                <li>Ship it to the following address: <b>Plot no 17 Shree Ram pura colony Suraj Nagar Jaipur Rajasthan-302006</b></li>
                                <li>Email us the tracking details at <a href="mailto:life@lifecode.co.in">life@lifecode.co.in</a> for faster processing.</li>
                            </ul>
                        </div>
                        <p className="replece_note">For any queries, feel free to contact our customer service at +91 9829197777 or email us at <a href="mailto:life@lifecode.co.in">life@lifecode.co.in</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CancelOrder;
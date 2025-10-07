import { useEffect, useState } from "react";
import { get, post } from "../_Services/apiService";
import { API_URL } from "../_Services/apiUrl";

import "@/ComponentsCss/Profile.css";
import { toast } from "react-toastify";

const Profile = () => {
    const [customerInfo, setCustomerInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        f_name: "",
        l_name: "",
        phone: "",
        image: null,
    });

    useEffect(() => {
        const GetCustomerInfo = async () => {
            setLoading(true);
            try {
                const response = await get(API_URL.customerInfo);
                if (response) {
                    setCustomerInfo(response);
                    setFormData({
                        f_name: response?.f_name || "",
                        l_name: response?.l_name || "",
                        phone: response?.phone || "",
                        image: null,
                    });
                }
            } catch {
                return null;
            } finally {
                setLoading(false);
            }
        };

        GetCustomerInfo();
    }, []);

    const handleIconClick = () => {
        document.getElementById("profile-image-input").click();
    };

    // 🔥 Update API runs immediately when image changes
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            image: file,
        }));

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("f_name", formData.f_name);
            formDataToSend.append("l_name", formData.l_name);
            formDataToSend.append("phone", formData.phone);
            formDataToSend.append("image", file);

            const response = await post(API_URL.updateprofile, formDataToSend);

            if (response?.status) {
                toast.success("Profile image updated successfully!");
                setCustomerInfo((prev) => ({
                    ...prev,
                    image: URL.createObjectURL(file),
                }));
            } else {
                toast.error("Failed to update profile image");
            }
        } catch {
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
            {loading ? (
                <div className="page-loader">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="my-account-form">
                    <form>
                        <h3>My Profile</h3>
                        <div className="row">
                            <div className="col-lg-12 d-flex justify-content-center">
                                <div className="profile_image">
                                    <p className="mb-0" onClick={handleIconClick}>
                                        <i className="fa fa-plus"></i>
                                    </p>
                                    <img
                                        src={
                                            formData.image
                                                ? URL.createObjectURL(formData.image) // preview new image instantly
                                                : customerInfo?.image
                                        }
                                        alt="UserProfilePicture"
                                        className="profile-image-default"
                                    />
                                    <input
                                        type="file"
                                        id="profile-image-input"
                                        style={{ display: "none" }}
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                            {/* Keep fields readonly if only image is editable */}
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="f_name"
                                        name="f_name"
                                        placeholder={customerInfo?.f_name}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="l_name"
                                        name="l_name"
                                        placeholder={customerInfo?.l_name}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        placeholder={customerInfo?.phone}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Profile;

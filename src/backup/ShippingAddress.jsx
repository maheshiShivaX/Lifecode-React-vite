import { useState, useEffect, useCallback } from "react";
import Layout from "../Components/Shared/Layout";
import { getLoginDetailById, GetUserAddressByLoginId, SaveUserAddress } from "@/_Services/apiFunctions";
import { toast } from "react-toastify";
import { decryptData } from "../_Services/encDnc";
import { useNavigate } from "react-router-dom";
import Address from "../Components/ShippingAddress/AddressDetail";
import AddressForm from "../Components/ShippingAddress/AddressForm";
import AddressSummary from "../Components/ShippingAddress/AddressSummary";
import { deliveryCharge } from "../_Services/SatactData";

import "@/ComponentsCss/ShippingAddress.css";

const ShippingAddress = () => {
    const navigate = useNavigate();
    const [userAddress, setUserAddress] = useState([]);
    const loginId = Number(sessionStorage.getItem('loginId'));
    const [selectedAddressId, setSelectedAddressId] = useState(0);
    const [loginDetail, setLoginDetail] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        addressId: 0,
        loginId: loginId,
        addressTypeId: 1,
        name: loginDetail?.name || "",
        emailId: loginDetail?.emailId || "",
        contatctNo: String(loginDetail?.mobileNo || ""),
        addressLine1: "",
        addressLine2: "",
        landmark: "city",
        city: "",
        stateId: 0,
        countryId: 1,
        pincode: "",
        isActive: true,
    });

    useEffect(() => {
        const existingItemDetails = JSON.parse(localStorage.getItem("itemDetail")) || [];
        const existingCartItemDetail = JSON.parse(localStorage.getItem("cartItemDetail")) || [];

        const dataSource =
            existingItemDetails.length > 0
                ? existingItemDetails
                : existingCartItemDetail;

        const total = dataSource.reduce(
            (acc, item) => acc + (item.unitPrice * (item.quantity || 0)),
            0
        );

        setTotalAmount(total);
        setFinalAmount(total);
    }, []);

    // Function for Add Address
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const SaveAddress = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await SaveUserAddress(formData);

            if (!response) return;

            toast.success("Address saved successfully");
            setSelectedAddressId(response?.addressId);
            sessionStorage.setItem('selectedAddressId', response?.addressId);
            setShowForm(false);
            GetUserAddress();
            navigate('/checkout');

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    // Function for Edit Address
    const EditAddress = (item) => {
        setShowForm(true);
        setFormData({
            addressId: item?.addressId,
            loginId: loginId,
            addressTypeId: 1,
            name: item?.name,
            emailId: item?.emailId || "",
            contatctNo: item?.contatctNo,
            addressLine1: item?.addressLine1,
            addressLine2: item?.addressLine2,
            landmark: item?.landmark,
            city: item?.city,
            stateId: item?.stateId,
            countryId: 1,
            pincode: item?.pincode,
            isActive: true,
        });
    }

    // Function for Select Address
    const onSelectAddress = (addressId) => {
        if (addressId !== null && addressId !== 0) {
            setSelectedAddressId(addressId);
            sessionStorage.setItem('selectedAddressId', addressId);
        }
    };

    // Function for Get Address
    const GetUserAddress = useCallback(async () => {

        const response = await GetUserAddressByLoginId(loginId);

        if (!response) return;

        const result = decryptData(response);

        if (!result || result.length === 0) {
            toast.error('Invalid encrypted data');
            return;
        }

        setUserAddress(result?.reverse());

        if (selectedAddressId === 0) {
            setSelectedAddressId(result[0].addressId);
            sessionStorage.setItem('selectedAddressId', result[0]?.addressId);
        }

    }, [loginId, selectedAddressId]);

    // Function for Get Login Detail
    const GetLoginDetail = useCallback(async () => {

        const response = await getLoginDetailById(loginId);

        if (response?.length > 0) {
            setLoginDetail(response[0]);
        } else {
            setLoginDetail(null);
        }
    }, [loginId]);

    useEffect(() => {
        if (loginDetail) {
            setFormData(prevState => ({
                ...prevState,
                name: loginDetail.name || "",
                emailId: loginDetail.emailId || "",
                contatctNo: String(loginDetail.mobileNo || ""),
            }));
        }
    }, [loginDetail]);

    useEffect(() => {
        GetLoginDetail();
        GetUserAddress();
    }, [GetLoginDetail, GetUserAddress]);

    return (
        <Layout>
            <div className="shipping_address">
                <div className="shipping_address_container">
                    <div className="shipping_address_inner">
                        {userAddress != null && userAddress.length > 0 && !showForm ? (
                            <Address
                                userAddress={userAddress}
                                selectedAddressId={selectedAddressId}
                                onSelectAddress={onSelectAddress}
                                setShowForm={setShowForm}
                                EditAddress={EditAddress}
                            />
                        ) : (
                            <AddressForm
                                loginId={loginId}
                                setFormData={setFormData}
                                handleChange={handleChange}
                                formData={formData}
                                SaveAddress={SaveAddress}
                                loading={loading}
                                setShowForm={setShowForm}
                                userAddress={userAddress}
                            />
                        )}
                        <AddressSummary
                            totalAmount={totalAmount}
                            finalAmount={finalAmount}
                            userAddress={userAddress}
                            deliveryCharge={deliveryCharge}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ShippingAddress;
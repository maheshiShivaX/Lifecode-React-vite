import { useCallback, useEffect, useState } from "react";
import AddressForm from "../Checkout/AddressForm";
import CheckoutAddress from "../Checkout/CheckoutAddress";
import { toast } from "react-toastify";
import { get, post, put } from "../../_Services/apiService";
import { API_URL } from "../../_Services/apiUrl";

const MyAddresses = () => {
    const [address, setAddress] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isForm, setIsForm] = useState(false);
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);

    const [addressFormData, setAddressFormData] = useState({
        contact_person_name: "",
        email: "",
        address_type: "home",
        address: "",
        city: "",
        zip: "",
        country: "",
        state: "",
        phone: "",
        latitude: "09.090",
        longitude: "09.090",
        is_billing: 0
    });

    const handleCountrySelect = (countryName) => {

        const selected = country.find((item) => item.name === countryName);

        if (selected) {
            GetState(Number(selected.id));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Save Address
    const SaveAddress = async (e) => {
        e.preventDefault();

        try {
            let response;

            // If addressFormData has an ID, it's an update
            if (addressFormData.id) {
                response = await put(API_URL.updateAddress, addressFormData);
            } else {
                response = await post(API_URL.addAddress, addressFormData);
            }

            if (response?.status) {
                setIsForm(false);
                setAddressFormData({
                    contact_person_name: "",
                    email: "",
                    address_type: "home",
                    address: "",
                    city: "",
                    zip: "",
                    country: "",
                    state: "",
                    phone: "",
                    latitude: "",
                    longitude: "",
                    is_billing: 0
                });

                setSelectedAddressId(response.id || null);
                GetAddress();
                toast.success("Address saved successfully!");
            }

        } catch (error) {
            toast.error("Error saving address:", error);
        }
    };

    // Function for Edit Address
    const EditAddress = async (item) => {
        setIsForm(true);

        if (country.length === 0) {
            await GetCountry();
        }

        const selectedCountry = country.find(c => c.name === item.country);

        if (selectedCountry) {
            await GetState(selectedCountry.id);
        }

        setAddressFormData({
            id: item?.id,
            contact_person_name: item?.contact_person_name,
            email: item?.email,
            address_type: item?.address_type || "home",
            address: item?.address,
            city: item?.city,
            zip: item?.zip,
            country: item?.country,
            state: item?.state,
            phone: item?.phone,
            latitude: item?.latitude,
            longitude: item?.longitude,
            is_billing: 0
        });
    };

    // GetAddress
    const GetAddress = useCallback(async () => {
        try {

            const response = await get(API_URL.getAddress);

            if (!response || response === null || response === undefined || response.length === 0) {
                setIsForm(true);
                return;
            }

            if (response?.length > 0) {
                setAddress(response);
                if (selectedAddressId === null || selectedAddressId === undefined || selectedAddressId === 0) {
                    setSelectedAddressId(response[0]?.id);
                }
            } else {
                return null;
            }

        } catch {
            return null;
        }
    }, [selectedAddressId]);

    const GetCustomerInfo = async () => {
        try {

            const response = await get(API_URL.customerInfo);

            setCustomerInfo(response);

        } catch {
            return null;
        }
    }

    // Get Country & State
    const GetCountry = async () => {
        try {

            const response = await get(API_URL.countryList);

            if (response?.length > 0) {
                setCountry(response)
            } else {
                return null;
            }

        } catch {
            return null;
        }
    }

    const GetState = async (id) => {
        try {

            const response = await get(API_URL.state + '/' + id);

            if (response?.length > 0) {
                setState(response)
            } else {
                return null;
            }

        } catch {
            return null;
        }
    }

    useEffect(() => {
        GetCountry();
        GetCustomerInfo();
    }, []);

    useEffect(() => {
        GetAddress();
    }, [GetAddress]);

    useEffect(() => {
        if (customerInfo) {
            setAddressFormData((prev) => ({
                ...prev,
                contact_person_name: `${customerInfo.f_name || ''} ${customerInfo.l_name || ''}`.trim(),
                email: customerInfo.email || '',
                phone: customerInfo.phone || ''
            }));
        }
    }, [customerInfo]);

    // Function for Select Address
    const onSelectAddress = (item) => {
        if (item?.id !== null && item?.id !== 0) {
            setSelectedAddressId(item?.id);
        }
    };

    const AddNewAddress = () => {
        setIsForm(true);
        setAddressFormData({
            contact_person_name: `${customerInfo.f_name || ''} ${customerInfo.l_name || ''}`.trim(),
            email: customerInfo.email || '',
            phone: customerInfo.phone || '',
            address_type: "home",
            address: "",
            city: "",
            zip: "",
            country: "",
            state: "",
            latitude: "",
            longitude: "",
            is_billing: 0
        });
    }

    const back = () => {
        setIsForm(false);
    }

    return (
        <div className="my-addresses my-account-form">
            <h3 className="myOrderhedding">My Addresses</h3>
            <div className='checkout_details_inner'>
                {address != null && address.length > 0 && !isForm && (
                    <CheckoutAddress
                        address={address}
                        EditAddress={EditAddress}
                        onSelectAddress={onSelectAddress}
                        selectedAddressId={selectedAddressId}
                        AddNewAddress={AddNewAddress}
                    />
                )}

                {isForm && (
                    <>
                        <AddressForm
                            handleChange={handleChange}
                            addressFormData={addressFormData}
                            SaveAddress={SaveAddress}
                            country={country}
                            state={state}
                            handleCountrySelect={handleCountrySelect}
                            isForm={isForm}
                            back={back}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default MyAddresses;
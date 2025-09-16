import { useState } from "react";
import { GetState } from "../../_Services/apiFunctions";
import { useEffect } from "react";
import { ClipLoader } from 'react-spinners';

const AddressForm = (props) => {
    const { handleChange, formData, SaveAddress, loading, setShowForm, userAddress } = props;
    const [stateData, setStateData] = useState([]);


    const GetStateData = async () => {
        const response = await GetState();

        if (response?.data?.length > 0) {
            setStateData(response?.data);
        }
    }

    useEffect(() => {
        GetStateData();
    }, []);

    const back = () => {
        setShowForm(false);
    }

    return (
        <div className="address_form_main">
            <div className="address_form_inner">
                <form onSubmit={SaveAddress} className="address_form row">
                    <div className="address_form_group col-12">
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                    </div>
                    <div className="address_form_group col-sm-6 col-12">
                        <input type="text" id="emailId" name="emailId" value={formData.emailId} onChange={handleChange} placeholder="Email" required />
                    </div>
                    <div className="address_form_group col-sm-6 col-12">
                        <input type="text" id="contatctNo" name="contatctNo" value={formData.contatctNo} onChange={handleChange} placeholder="Mobile Number" required />
                    </div>
                    <div className="address_form_group col-sm-6 col-12">
                        <input type="text" id="addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line1" required />
                    </div>
                    <div className="address_form_group col-sm-6 col-12">
                        <input type="text" id="addressLine2" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line2" />
                    </div>
                    <div className="address_form_group col-sm-6 col-12">
                        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                    </div>
                    <div className="address_form_group col-sm-6 col-12">
                        <select
                            name="stateId"
                            id="state"
                            className="col-sm-6 col-12"
                            value={formData.stateId}
                            onChange={handleChange}
                            required
                        >
                            <option value="0" className="option select_default">Select state</option>
                            {stateData?.map((state, i) => (
                                <option key={i} value={state.stateId} className="option">{state?.stateName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="address_form_group col-sm-6 col-12">
                        <select
                            name="countryId"
                            id="countryId"
                            className="col-sm-6 col-12"
                            value={formData.countryId}
                            onChange={handleChange}
                            required
                        >
                            {/* <option value="0" className="option select_default">Select state</option> */}
                            <option key={formData.countryId} value={formData.countryId} className="option">India</option>
                        </select>
                    </div>
                    <div className="address_form_group col-sm-6 col-12">
                        <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Zip / postal code" required />
                    </div>
                    <div className="address_form_group col-12 save_address_btn mt-2" disabled={loading} >
                        <button type="submit" className='w-100'>
                            {loading ? (
                                <ClipLoader color="#fff" size={20} />
                            ) : (
                                'Save Address'
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {userAddress?.length > 0 && (
                <div className="address_show_more mt-3">
                    <button
                        className=""
                        onClick={back}
                    >
                        Back
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddressForm;
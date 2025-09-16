import { ClipLoader } from 'react-spinners';

const AddressForm = (props) => {
    const { address, handleChange, addressFormData, SaveAddress, country, state, handleCountrySelect, loading, back, isForm } = props;

    return (
        <div className="address_form_main">
            <div className="address_form_inner">
                <form onSubmit={SaveAddress} className="address_form row">
                    <div className="address_form_group col-12">
                        <input type="text" id="contact_person_name" name="contact_person_name" placeholder="Full Name" required value={addressFormData?.contact_person_name} onChange={handleChange} />
                    </div>
                    {/* <div className="address_form_group col-sm-6 col-12">
                        <input type="text" id="email" name="email" placeholder="Email" required value={addressFormData?.email} onChange={handleChange} />
                    </div> */}
                    <div className="address_form_group col-sm-6 col-12">
                        <input type="text" id="phone" name="phone" placeholder="Mobile Number" required value={addressFormData?.phone} onChange={handleChange} />
                    </div>
                    <div className="address_form_group col-sm-6 col-12">
                        <input type="text" id="address" name="address" placeholder="Address" required value={addressFormData?.address} onChange={handleChange} />
                    </div>
                    <div className="address_form_group col-sm-6 col-12">
                        <input type="text" id="city" name="city" placeholder="City" required value={addressFormData?.city} onChange={handleChange} />
                    </div>
                    <div className="address_form_group custom-select-wrapper col-sm-6 col-12">
                        <select
                            name="country"
                            id="country"
                            className="col-sm-6 col-12 custom-select"
                            value={addressFormData.country}
                            onChange={(e) => {
                                handleChange(e); // sets the country name in form
                                handleCountrySelect(e.target.value); // gets states via ID
                            }}
                            required
                        >
                            <option value="" className="option select_default">Select Country</option>
                            {country?.map((item) => (
                                <option key={item.id} value={item.name} className="option">
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="address_form_group custom-select-wrapper col-sm-6 col-12">
                        <select
                            name="state"
                            id="state"
                            className="col-sm-6 col-12 custom-select"
                            value={addressFormData.state}
                            onChange={handleChange}
                            required
                        >
                            <option value="" className="option select_default">
                                Select State
                            </option>
                            {state?.map((item) => (
                                <option key={item.id} value={item.name} className="option">
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="address_form_group col-sm-6 col-12">
                        <input type="text" id="zip" name="zip" placeholder="Zip / postal code" required value={addressFormData?.zip} onChange={handleChange} />
                    </div>
                    <div className="address_form_group col-12 save_address_btn mt-2" disabled={loading} >
                        <button type="submit" className=''>
                            {loading ? (
                                <ClipLoader color="#fff" size={20} />
                            ) : (
                                'Save Address'
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {isForm && address?.length > 0 &&(
                <div className="address_show_more mt-3">
                    <button
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
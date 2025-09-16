import { useState } from 'react';

const Address = (props) => {
    const { userAddress, onSelectAddress, selectedAddressId, setShowForm,EditAddress } = props;
    const [showAll, setShowAll] = useState(false);

    const displayedAddresses = showAll ? userAddress : userAddress?.slice(0, 3);

    const AddNewAddress = ()=>{
        setShowForm(true);
    }

    return (
        <div className="address_main text-white">
            {displayedAddresses?.map((item, i) => (
                <div onClick={() => onSelectAddress(item.addressId)} className={`address_inner d-flex justify-content-between ${selectedAddressId === item.addressId ? 'selected' : ''}`} key={i}>
                    <div className="address_details">
                        <h6 className="address_user_name">{item?.name}</h6>
                        <span className="address_delevery">
                            {item?.addressLine1} {item?.addressLine2} {item?.city} {item?.stateName} {item?.countryName} {item?.pincode}
                        </span>
                    </div>
                    <div className="address_edit">
                        <span onClick={()=>EditAddress(item)}>Edit</span>
                    </div>
                </div>
            ))}

            <div className='d-flex align-items-center gap-4'>
                <div className="address_show_more">
                    <button
                       
                        onClick={AddNewAddress}
                    >
                        Add New Address
                    </button>
                </div>
                {userAddress?.length > 3 && (
                    <div className="address_show_more">
                        <button
                            
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Address;
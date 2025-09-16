import { useState, useEffect } from "react";

const CheckoutAddress = (props) => {
    const { address, EditAddress, onSelectAddress, selectedAddressId, AddNewAddress } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;

    const totalOrders = address?.length || 0;
    const totalPages = Math.ceil(totalOrders / ordersPerPage);
    const startIdx = (currentPage - 1) * ordersPerPage;
    const endIdx = startIdx + ordersPerPage;
    const paginatedOrders = address?.slice(startIdx, endIdx);

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    useEffect(() => {
        // Reset to first page if filter changes and current page is out of range
        if (currentPage > totalPages) setCurrentPage(1);
    }, [currentPage, address, totalPages]);
    return (
        <div className="checkout_address_main">
            {paginatedOrders?.map((item, i) => {
                return (
                    <div onClick={() => onSelectAddress(item)} className={`checkout_address_inner d-flex justify-content-between ${selectedAddressId === item.id ? 'selected' : ''}`} key={i}>
                        <div className="checkout_address_details w-100">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="Saved_address_title">Saved Address :-</p>
                                <button className="edit_address_btn" onClick={() => EditAddress(item)}>Click to Edit</button>
                            </div>
                            <div className="name_address_sec">
                                <span className="address-type">{item?.address_type} Address :-</span>
                                <h6 className="checkout_address_user_name mb-1">{item?.contact_person_name}</h6>
                                <p className="checkout_address_delevery mb-0">
                                    {item?.address}, {item?.city}, {item?.state}, {item?.country}, {item?.zip}
                                </p>
                            </div>
                            <div className="checkout_contact_sec">
                                {/* <p className="checkout_number ">{item?.email}</p> */}
                                <p className="checkout_number">{item?.phone}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="checkout_address_pagination mt-sm">
                <div className="checkout_address_change_btn d-flex justify-content-between">
                    <button onClick={AddNewAddress} className="add_new_address">Add A New Address <img src="./images/Plusaddress.svg" alt="" /></button>
                    {/* <button onClick={ShowMore}>{showAll ? 'Less' : 'Show More'}</button> */}
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination-controls" style={{ textAlign: 'end' }}>
                            <button className="CANCEL_ORDER1" onClick={handlePrevPage} disabled={currentPage === 1}>
                                Prev
                            </button>
                            <span style={{ margin: '0 10px' }}>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button className="TrackOrder" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CheckoutAddress;

import '@/ComponentsCss/VehicleDetails.css';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';

const vehicleData = {
    owner_name: 'John Aron Doe',
    vehicle_category: '2WN',
    vehicle_category_desc: 'M-Cycle/Scooter',
    fuel_type: 'PETROL',
    maker_model: 'YAMAHA-FZS',
    rc_number: 'MH05FD8067',
    rc_status: 'Active',
    registered_at: 'KALYAN, Maharashtra',
}

const VehicleDetails = (props) => {
    const { isDetailForm, isOtpInput, isEtag, handleEtag, etagForm, userEtag, changePhoneNumber, otp, setOtp, isVehicleDetail, getEtag, popUpClose } = props;

    const shouldRender = isOtpInput || isDetailForm || isEtag || isVehicleDetail;

    return (
        <>
            {shouldRender && (
                <div className="vehicle-details-main">
                    {!isOtpInput && isDetailForm && !isEtag && (
                        <div className='vehicle-details-inner'>
                            <h2>Enter Your Details</h2>
                            <p>Sociosqu risus pharetra et, a iaculis odio. Orci vulputate suspendisse malesuada ullamcorper eleifend ad interdum sollicitudin. Morbi rutrum elit fringilla eu sed ac vulputate etiam.</p>
                            <form onSubmit={userEtag}>
                                <div className="input-wrapper">
                                    <input type="text" name="name" id="name" placeholder='Full Name' value={etagForm?.name} onChange={handleEtag} />
                                </div>
                                <div className="input-wrapper">
                                    <input type="text" name="mobile_number" id="mobile_number" placeholder='Phone Number' value={etagForm?.mobile_number} onChange={handleEtag} />
                                </div>
                                <button type='submit' className='VerifyDetails_btn'>Verify Details</button>
                            </form>
                        </div>
                    )}

                    {isOtpInput && !isDetailForm && !isEtag && (
                        <div className='vehicle-details-inner'>
                            <h2>OTP Verification</h2>
                            <div className='otp_input_outer'>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                    inputStyle="otp_input_inner"
                                />
                            </div>
                            {/* <p>OTP not received? <button className='Resend-sms' onClick={userEtag}>Click to Resend</button></p> */}
                            {/* <span className='resend-sms-time'>Resend OTP in 00:25 </span> */}
                            <button className='change_number' onClick={changePhoneNumber}>Change Phone Number</button>
                            <button className='VerifyDetails_btn' onClick={() => props.verifyOtp(otp)}>Continue</button>
                            <span onClick={changePhoneNumber}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13 9" fill="none">
                                    <path d="M4.6786 8.3491C4.466 8.56169 4.12139 8.56169 3.90879 8.3491L0.444644 4.88495C0.232044 4.67235 0.232044 4.32774 0.444644 4.11514L3.90879 0.651C4.12139 0.438401 4.466 0.438401 4.6786 0.651C4.8912 0.8636 4.8912 1.20821 4.6786 1.42081L2.14375 3.95565L12.2906 3.95565C12.5912 3.95565 12.835 4.19939 12.835 4.50005C12.835 4.80071 12.5912 5.04444 12.2906 5.04444L2.14375 5.04444L4.6786 7.57929C4.8912 7.79189 4.8912 8.1365 4.6786 8.3491Z" fill="white" />
                                </svg>Back
                            </span>
                        </div>
                    )}

                    {!isOtpInput && !isDetailForm && isEtag && (
                        <div className='vehicle-details-inner'>
                            <h2>Download Our Application</h2>
                            <div className='download-app'>
                                <ul>
                                    <li className='hover-effect'>
                                        <Link to={''}> <img src="./images/google-play.png" alt="" /></Link>
                                    </li>
                                    <li className='hover-effect'>
                                        <Link to={''}>   <img src="./images/app-store.png" alt="" /></Link>
                                    </li>
                                </ul>
                            </div>
                            <p>We Offer a Free E-Tag for you, Where You Can Experience Our Services</p>
                            <button onClick={getEtag} className='VerifyDetails_btn'>Get Your E-Tag Now</button>
                            <Link to={''}><svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13 9" fill="none">
                                <path d="M4.6786 8.3491C4.466 8.56169 4.12139 8.56169 3.90879 8.3491L0.444644 4.88495C0.232044 4.67235 0.232044 4.32774 0.444644 4.11514L3.90879 0.651C4.12139 0.438401 4.466 0.438401 4.6786 0.651C4.8912 0.8636 4.8912 1.20821 4.6786 1.42081L2.14375 3.95565L12.2906 3.95565C12.5912 3.95565 12.835 4.19939 12.835 4.50005C12.835 4.80071 12.5912 5.04444 12.2906 5.04444L2.14375 5.04444L4.6786 7.57929C4.8912 7.79189 4.8912 8.1365 4.6786 8.3491Z" fill="white" />
                            </svg>Back</Link>
                        </div>
                    )}

                    {isVehicleDetail && !isOtpInput && !isDetailForm && !isEtag && (
                        <div className='vehicle-details-inner vehicle-details-popup'>
                            <h2 className='mb-5'>Vehicle Details</h2>
                            <div className='detail-devider'></div>
                            <div className='vehicle-details-content'><span>Owner name :</span><span><b>{vehicleData?.owner_name}</b></span></div>
                            <div className='detail-devider'></div>
                            <div className='vehicle-details-content'><span>Vehicle Category :</span><span><b>{vehicleData?.vehicle_category}</b></span></div>
                            <div className='detail-devider'></div>
                            <div className='vehicle-details-content'><span>Vehicle Category Description :</span><span><b>{vehicleData?.vehicle_category_desc}</b></span></div>
                            <div className='detail-devider'></div>
                            <div className='vehicle-details-content'><span>Fuel Type :</span><span><b>{vehicleData?.fuel_type}</b></span></div>
                            <div className='detail-devider'></div>
                            <div className='vehicle-details-content'><span>Maker Model :</span><span><b>{vehicleData?.maker_model}</b></span></div>
                            <div className='detail-devider'></div>
                            <div className='vehicle-details-content'><span>Rc Number :</span><span><b>{vehicleData?.rc_number}</b></span></div>
                            <div className='detail-devider'></div>
                            <div className='vehicle-details-content'><span>Rc Status :</span><span><b>{vehicleData?.rc_status}</b></span></div>
                            <div className='detail-devider'></div>
                            <div className='vehicle-details-content'><span>Registered At :</span><span><b>{vehicleData?.registered_at}</b></span></div>
                            <div className='detail-devider'></div>
                            <div className='text-center mt-5'>
                                <button onClick={popUpClose} className='search-vehicle-close-btn'>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default VehicleDetails;
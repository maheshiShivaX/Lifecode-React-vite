import '@/ComponentsCss/SearchVehicle.css';
import { SearchVehicleData } from '../../_Services/SatactData';
import { Link } from 'react-router-dom';
import VehicleDetails from '../VehicleDetails';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const SearchVehicle = () => {
    const [vehicleNo, setVehicleNo] = useState('');
    const [vehicleData, setVehicleData] = useState(null);
    const [isVehicleDetail, setIsVehicleDetail] = useState(false);
    const [isDetailForm, setIsDetailForm] = useState(false);
    const [isOtpInput, setIsOtpInput] = useState(false);
    const [isEtag, setIsEtag] = useState(false);
    const [otp, setOtp] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState(null);

    const [etagForm, setEtagForm] = useState({
        name: "",
        mobile_number: ""
    });

    const handleChange = (e) => {
        setVehicleNo(e.target.value.toUpperCase());
    };

    const handleSearch = async () => {
        if (!vehicleNo) {
            alert('Please Enter Vehicle No');
            setIsEtag(false);
            setIsDetailForm(false);
            setIsOtpInput(false);
            setShowModal(false);
            return;
        }

        try {
            const response = await axios.post(`https://staging.lifecode.co.in/app/api/search_vehicle_no`, {
                vehicle_no: vehicleNo,
            });

            if (response?.data?.status) {
                setVehicleData(response?.data?.data);
                setIsDetailForm(true);
                setShowModal(true); // Show modal only on success
            } else {
                setVehicleData(null);
                toast.error('Vehicle not found.');
                setShowModal(false);
            }
        } catch {
            toast.error('Vehicle not found.');
            setShowModal(false);
        }
    };

    const handleEtag = (e) => {
        const { name, value } = e.target;
        setEtagForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const userEtag = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://staging.lifecode.co.in/app/Lifecodeapinew1/user_etag`, etagForm);

            if (response?.data?.status === 1) {
                setIsDetailForm(false);
                setIsOtpInput(true);
            } else if (response?.data?.status === 0) {
                toast.error(response?.message)
            } else {
                setIsVehicleDetail(true);
                setIsDetailForm(false);
                setIsOtpInput(false);
                setIsEtag(false);
                setShowModal(true);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDetailForm(false);
        }
    };

    const verifyOtp = async (otp) => {
        try {
            const response = await axios.post(`https://staging.lifecode.co.in/app/Lifecodeapinew1/verify_etag_otp`, {
                mobile_number: etagForm.mobile_number,
                otp: otp
            });

            if (response?.data?.status === 1) {
                setIsDetailForm(false);
                setIsOtpInput(false);
                setIsEtag(true);
                setEtagForm({ name: "", mobile_number: "" });
                setOtp('');
                setUserId(response?.data?.data?.user_id)
            } else {
                toast.error('Invalid OTP');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const changePhoneNumber = () => {
        setIsDetailForm(true);
        setIsOtpInput(false);
    };

    const popUpClose = () => {
        setIsEtag(false);
        setIsDetailForm(false);
        setIsOtpInput(false);
        setShowModal(false);
        setEtagForm({ name: "", mobile_number: "" });
        setOtp('');
    };

    const getEtag = async () => {
        try {
            const response = await axios.post(`https://staging.lifecode.co.in/app/api/send_etag_whatsapp`, {
                user_id: userId
            });

            if (response?.data?.status === true) {
                setIsDetailForm(false);
                setIsOtpInput(false);
                setIsEtag(false);
                setEtagForm({ name: "", mobile_number: "" });
                setOtp('');
                toast.success(response?.data?.message)
            } else {
                toast.error('Invalid User Id');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <section className="search-vehicle">
                <div className='round_shodow_only'></div>
                <div className="container">
                    <div className='search-vehicle-inner'>
                        <div className='search_hedding'>
                            <h2 data-aos="fade-down" data-aos-delay="400">{SearchVehicleData?.title}</h2>
                            <p data-aos="fade-up" data-aos-delay="800">{SearchVehicleData?.description}</p>
                        </div>
                        <div className=''>
                            <div className="row align-items-center">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className='search-vehicle-image' data-aos="fade-right" data-aos-delay="1000">
                                        <img src={SearchVehicleData?.leftImage} alt="" className='mobile_image_notShow' />
                                        <img src={SearchVehicleData?.mobileImage} alt="" className='mobile_image' />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 mt-sm-0 my-4">
                                    <div className="input-wrapper" data-aos="fade-down" data-aos-delay="1500">
                                        <input
                                            type="text"
                                            id="vehicleNumber"
                                            placeholder="RJ-14-CC-0865"
                                            required
                                            value={vehicleNo}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="vehicleNumber">Enter Vehicle Number</label>
                                    </div>
                                    <div onClick={handleSearch} className="Viewbutton" data-aos-delay="400">
                                        <span className="hover-effect">
                                            {SearchVehicleData?.buttonText}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 mobile_image_notShow">
                                    <div className='search-vehicle-image' data-aos="fade-left" data-aos-delay="1200">
                                        <img src={SearchVehicleData?.rightImage} alt="" className='' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conditional Modal Rendering */}
                {showModal && (
                    <div className='modal-wrapper'>
                        <div className="modal fade show d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                    <button onClick={popUpClose} type="button" className='close-btn' aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <g clipPath="url(#clip0_0_5940)">
                                                <path d="M19.7625 18.6159L11.1466 9.99998L19.7624 1.38418C20.0791 1.06758 20.0791 0.554181 19.7624 0.237541C19.4458 -0.079099 18.9324 -0.079099 18.6158 0.237541L10 8.85334L1.38412 0.237541C1.06752 -0.079099 0.55412 -0.079099 0.23748 0.237541C-0.07916 0.554142 -0.07916 1.06754 0.23748 1.38418L8.85332 9.99998L0.23748 18.6159C-0.07916 18.9325 -0.07916 19.4459 0.23748 19.7625C0.554081 20.0791 1.06748 20.0791 1.38412 19.7625L10 11.1466L18.6159 19.7625C18.9325 20.0791 19.4459 20.0791 19.7625 19.7625C20.0792 19.4459 20.0792 18.9325 19.7625 18.6159Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_0_5940">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                    <div>
                                        <VehicleDetails
                                            isDetailForm={isDetailForm}
                                            isOtpInput={isOtpInput}
                                            isEtag={isEtag}
                                            handleEtag={handleEtag}
                                            etagForm={etagForm}
                                            userEtag={userEtag}
                                            changePhoneNumber={changePhoneNumber}
                                            verifyOtp={verifyOtp}
                                            setOtp={setOtp}
                                            otp={otp}
                                            isVehicleDetail={isVehicleDetail}
                                            vehicleData={vehicleData}
                                            getEtag={getEtag}
                                            popUpClose={popUpClose}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default SearchVehicle;

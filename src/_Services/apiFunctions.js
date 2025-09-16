import { toast } from "react-toastify";
import { get, post } from "./apiService";
import { API_URL } from "./apiUrl";
import axios from "axios";

export const LoginDetailByMobileNo = async (mobileNo) => {
    try {
        const response = await post(API_URL.login, {
            mobileNo: mobileNo
        });

        if (response.isSuccess === 200) {
            return response;
        } else if (response.isSuccess === 404) {
            return null;
        }
    } catch {
        toast.error("Please try again after some time");
        return null;
    }
};

export const SendOtp = async (mobileNo) => {
    try {

        const response = await post(API_URL.send_otp, {
            phone: mobileNo
        });

        if (response?.status === 1) {
            toast.success("OTP Sent Successfully");
            return response;
        } else if (response?.status === 0) {
            toast.error("Failed to send OTP");
            return null;
        }
    } catch {
        toast.error('Please try again after some time');
    }
};

export const VerifyOTP = async (mobileNo, otp, guest_id) => {
    try {

        const response = await post(API_URL.verify_otp, {
            phone: mobileNo,
            otp: otp,
            guest_id: guest_id,
        });

        if (response?.status === 2 || response.status === 1) {
            return response;
        } else if (response?.status === 0) {
            toast.error("Please enter valid OTP or Resend OTP");
            return null;
        }
    } catch {
        toast.error('Please try again after some time');
        return null;
    }
};

export const SignUp = async (formData) => {
    try {
        const response = await post(API_URL.register, formData);

        if (response.status === 1) {
            return response;
        } else if (response.status === 0) {
            toast.error("Failed to register");
            return null;
        }
    } catch {
        return null;
    }
};

export const getLoginDetailById = async (loginId) => {
    try {
        const response = await get(`${API_URL?.GetLoginDetailById}?pLoginDetailId=${loginId}`);

        if (response.isSuccess === 200) {
            return response?.data;
        } else if (response.isSuccess === 404) {
            return null;
        }
    } catch {
        return null;
    }
};

export const GetState = async () => {
    try {
        const response = await get(`${API_URL?.GetState}`);

        if (response.isSuccess === 1) {
            return response;
        } else if (response.isSuccess === 404) {
            return null;
        }
    } catch {
        return null;
    }
};

export const ReferralCode = async (referralCode) => {
    if (!referralCode) {
        alert("Please enter a Referral code.");
        return;
    }

    try {
        const response = await axios.post(`https://lifecode.co.in/app/Lifecodeapinew1/getuserinfo`,
            { referral_id: referralCode });
        if (response.data.status == 1) {
            return response?.data
        } else {
            toast.error('Please enter valid Referral Code');
        }
    }
    catch (error) {
        toast.error(error);
    }
}
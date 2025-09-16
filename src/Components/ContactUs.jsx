import { toast } from "react-toastify";
import Breadcrumb from "./Common/Breadcrumb";
import Layout from "./Shared/Layout";
import { post } from "../_Services/apiService";
import { API_URL } from "../_Services/apiUrl";
import { useState } from "react";
import "@/ComponentsCss/ContactUs.css";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile_number: '',
        email: '',
        subject: '',
        message: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await post(API_URL.contact, formData);
            if (response?.status) {
                toast.success("Message sent successfully");
                setFormData({
                    name: '',
                    mobile_number: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                toast.error("Failed to send message");
            }
        } catch {
            toast.error("Failed to send message");
        }
    };

    const BreadcrumbMenu = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: `Contact Us`
        },
    ]
    return (
        <Layout>
            <div className="product_detail sec-padding-top">
                <div className="product_detail_container">
                    <div className="product_detail_header">
                        <h1>Contact Us</h1>
                        <Breadcrumb BreadcrumbMenu={BreadcrumbMenu} />
                    </div>
                    <div className="cobntact_us_main container">
                        <div className="row justify-content-between">
                            <div className="col-xl-5 col-md-6 col-12 mb-sm-0 mb-4">
                                <div>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.890817100231!2d75.78478744850578!3d26.906960000333665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db35e704ce509%3A0x21a49e8d70a4d0!2siShivax!5e0!3m2!1sen!2sin!4v1755003418383!5m2!1sen!2sin" width="100%" height="450" style={{ margin: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                                <div className="contact_details mt-4">
                                    <p><strong><i className="fi fi-rr-phone-call"></i></strong> +91 9829197777  (Mon–Sat, 10 AM – 6 PM)</p>
                                    <p><strong><i className="fi fi-rr-envelope"></i></strong> life@lifecode.co.in</p>
                                    <p><strong><i className="fi fi-rr-marker"></i></strong> 17, Civil Lines, Jaipur, Rajasthan-302006</p>
                                </div>
                            </div>
                            <div className="col-xl-7 col-md-6 col-12">
                                <p className="message_contactus">We’re here to help! Whether you have questions, need support, or want to share feedback, the Lifecode team is just a message away.</p>
                                <form onSubmit={handleSubmit} className="contact-form row">
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="mobile_number">Mobile Number</label>
                                        <input
                                            type="text"
                                            id="mobile_number"
                                            name="mobile_number"
                                            value={formData.mobile_number}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your mobile number"
                                        />
                                    </div>
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="subject">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter the subject"
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your message"
                                        ></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="contact_us_submit_btn">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ContactUs;
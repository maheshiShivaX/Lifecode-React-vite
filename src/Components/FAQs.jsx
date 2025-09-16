import React, { useState } from "react";
import Layout from "./Shared/Layout";
import { useEffect } from "react";
import { get } from "../_Services/apiService";
import { API_URL } from "../_Services/apiUrl";
import Breadcrumb from "./Common/Breadcrumb";
import "@/ComponentsCss/FAQs.css";

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [faqs, setFaqs] = useState([]);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const GetFaqs = async () => {
            try {

                const response = await get(API_URL.faq);

                if (response?.status) {

                    setFaqs(response?.data || []);
                }

            } catch {
                return null;
            }
        }

        GetFaqs();
    }, []);

    const BreadcrumbMenu = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: `FAQs`
        },
    ]

    return (
        <Layout>
            <div className="faqs_main">
                <div className="product_detail_header">
                    <h1>FAQs</h1>
                    <Breadcrumb BreadcrumbMenu={BreadcrumbMenu} />
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-12">
                            <ul className="faqs_ul_tag" style={{ listStyle: "none", padding: 0 }}>
                                {faqs.map((faq, idx) => (
                                    <li className={`faq-item ${openIndex === idx ? 'active' : ''}`} key={idx}>
                                        <button
                                            onClick={() => toggleFAQ(idx)}
                                        >
                                            <p>{faq.question}</p>
                                            <svg id="Layer_1" enable-background="new 0 0 24 24" height="25" viewBox="0 0 24 24" width="25" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs"><g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)"><g><path d="m12 21c-.6 0-1-.4-1-1v-16c0-.6.4-1 1-1s1 .4 1 1v16c0 .6-.4 1-1 1z" fill="#ffffff" fill-opacity="1" data-original-color="#000000ff" stroke="none" stroke-opacity="1" /></g><g><path d="m20 13h-16c-.6 0-1-.4-1-1s.4-1 1-1h16c.6 0 1 .4 1 1s-.4 1-1 1z" fill="#ffffff" fill-opacity="1" data-original-color="#000000ff" stroke="none" stroke-opacity="1" /></g></g></svg>
                                        </button>
                                        {openIndex === idx && (
                                            <div className="faq_answer">{faq.answer}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FAQs;
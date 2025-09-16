import { useEffect, useState } from "react";
import Breadcrumb from "./Common/Breadcrumb";
import Layout from "./Shared/Layout";
import { get } from "../_Services/apiService";
import { API_URL } from "../_Services/apiUrl";
import '@/ComponentsCss/Blog.css';

const Blogs = () => {
    const [blog, setBlog] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const GetBlog = async () => {
        try {
            const response = await get(API_URL?.blog);
            if (response?.status === true) {
                setBlog(response?.data);
            }
        } catch {
            return null;
        }
    };

    useEffect(() => {
        GetBlog();
    }, []);

    const BreadcrumbMenu = [
        { title: 'Home', link: '/' },
        { title: `Blog` },
    ];

    const getShortDescription = (html, wordLimit = 20) => {
        const plainText = html.replace(/<[^>]+>/g, "");
        const words = plainText.split(/\s+/);
        return words.slice(0, wordLimit).join(" ") + (words.length > wordLimit ? "..." : "");
    };

    return (
        <Layout>
            <div className="product_detail sec-padding-top">
                <div className="product_detail_container">
                    <div className="product_detail_header">
                        <h1>Blog</h1>
                        <Breadcrumb BreadcrumbMenu={BreadcrumbMenu} />
                    </div>
                    <div className="container">
                        <div className="row">
                            {blog?.map((item, i) => {
                                const plainText = item?.desc?.replace(/<[^>]+>/g, "");
                                const words = plainText.split(/\s+/);
                                const shortText = getShortDescription(item?.desc);

                                return (
                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={i}>
                                        <img src={item?.image} alt="" className="blog_imgData" />
                                        <h4 className="blog_title">{item?.title}</h4>

                                        <div
                                            className="blog_description"
                                            dangerouslySetInnerHTML={{
                                                __html: words.length > 20 ? shortText : plainText
                                            }}
                                        />

                                        {words.length > 20 && (
                                            <button
                                                className="read_more_btn"
                                                onClick={() => {
                                                    setSelectedBlog(item);
                                                    setShowModal(true);
                                                }}
                                            >
                                                Read More
                                            </button>
                                        )}

                                        <p>{item?.created_at}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedBlog && (
                <div className="custom_modal_overlay" onClick={() => setShowModal(false)}>
                    <div
                        className="custom_modal_content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal_header">
                            <h4>{selectedBlog.title}</h4>
                            <button className="close_btn" onClick={() => setShowModal(false)}>
                                <i class="fi fi-rr-cross"></i>
                            </button>
                        </div>
                        <img
                            src={selectedBlog.image}
                            alt=""
                            className="w-100"
                            style={{ marginBottom: "10px" }}
                        />
                        <div dangerouslySetInnerHTML={{ __html: selectedBlog.desc }} />

                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Blogs;

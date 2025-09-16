
import Layout from './Shared/Layout';
import { RefundAndReturnpolicy } from "../_Services/SatactData";
import Breadcrumb from './Common/Breadcrumb';
import "@/ComponentsCss/StaticPages.css";

const RefundAndReturnPolicy = () => {

    const BreadcrumbMenu = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: `Refund And Return Policy`
        },
    ]

    return (
        <Layout>
            <div className="refund_and_return_policy_main">
                <div className="refund_and_return_policy_inner">
                    <div className="product_detail_header">
                        <h1>{RefundAndReturnpolicy?.headerName || 'Refund And Return Policy'}</h1>
                        <Breadcrumb BreadcrumbMenu={BreadcrumbMenu} />
                    </div>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-md-10 col-12'>
                                <div className='policy_content' dangerouslySetInnerHTML={{ __html: RefundAndReturnpolicy.description || '' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default RefundAndReturnPolicy
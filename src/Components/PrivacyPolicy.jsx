import Layout from './Shared/Layout';
import { privacyPolicyData } from '../_Services/SatactData';
import "@/ComponentsCss/StaticPages.css";
import Breadcrumb from './Common/Breadcrumb';

const PrivacyPolicy = () => {

    const BreadcrumbMenu = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: `Privacy Policy`
        },
    ]

    return (
        <Layout>
            <div className='privacy_policy_main'>
                <div className='privacy_policy_inner'>
                    <div className="product_detail_header ">
                        <h1>{privacyPolicyData?.headerName || 'Privacy Policy'}</h1>
                        <Breadcrumb BreadcrumbMenu={BreadcrumbMenu} />
                    </div>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-md-10 col-12'>
                                <div className='policy_content' dangerouslySetInnerHTML={{ __html: privacyPolicyData.description || '' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PrivacyPolicy;
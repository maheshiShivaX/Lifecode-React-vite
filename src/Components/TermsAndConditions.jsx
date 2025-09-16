import Layout from './Shared/Layout';
import { termsAndConditionsData } from "../_Services/SatactData";
import "@/ComponentsCss/StaticPages.css";
import Breadcrumb from './Common/Breadcrumb';

const TermsAndConditions = () => {

    const BreadcrumbMenu = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: `Terms & Conditions`
        },
    ]

    return (
        <Layout>
            <div className="terms_and_conditions_main">
                <div className="terms_and_conditions_inner">
                    <div className="product_detail_header ">
                        <h1>{termsAndConditionsData?.headerName || 'Terms & Conditions'}</h1>
                        <Breadcrumb BreadcrumbMenu={BreadcrumbMenu} />
                    </div>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-md-10 col-12'>
                                <div className='policy_content' dangerouslySetInnerHTML={{ __html: termsAndConditionsData.description || '' }} />
                            </div>
                        </div>
                    </div>
                 
                </div>
            </div>
        </Layout>
    )
}

export default TermsAndConditions;
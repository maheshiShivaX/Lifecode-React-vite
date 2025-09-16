import '@/ComponentsCss/ProductMoreInformation.css';
import CustomerReviews from './CustomerReviews/CustomerReviews';

const ProductMoreInformation = (props) => {
    const { productBySlug } = props;

    return (
        <div className="product-more-information-container">
            <div className="product-more-information-content">
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active position-relative" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Description</button>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                        <button className="nav-link position-relative" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Information</button>
                    </li> */}
                    <li className="nav-item" role="presentation">
                        <button className="nav-link position-relative" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Reviews ( 500+ )</button>
                    </li>
                </ul>
                <div className="tab-details" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div
                            className="display_description"
                            dangerouslySetInnerHTML={{ __html: productBySlug?.details }}
                        />
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div className="specification">
                            {productBySlug?.productSpecificationDtos?.map((item, i) => (
                                <div className="d-sm-flex w-100 justify-content-center mb-4" key={i}>
                                    <p className="col-sm-4 col-12 mb-sm-auto mb-0"><strong>{item?.specificationDisplayName} :</strong> </p>
                                    <p className="col-sm-8 col-12">{item?.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                        <div>
                            <CustomerReviews productBySlug={productBySlug} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductMoreInformation;
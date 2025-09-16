import { Rating } from 'react-simple-star-rating';

const RatingDurabilityDetail = (props) => {
    const { productBySlug } = props;

    return (
        <>
            <div className="product_rating_main">
                <p className="product_short_description mb-2">We Glad to tell you that our customers loving us and our product </p>
                <div className="product_rating d-flex align-items-center gap-2">
                    <Rating
                        initialValue={productBySlug?.rating ? productBySlug?.rating[0]?.average : 0}
                        readonly
                        size={22}
                        label={`Rating: ${productBySlug?.rating ? productBySlug?.rating[0]?.average : 0}`}
                        fractions={2}
                        allowFraction
                    />
                    <p className='product_avg_rating mb-0'>
                        {`${productBySlug?.rating?.length > 0 && productBySlug.rating[0]?.average
                            ? Number(productBySlug.rating[0].average).toFixed(1) + ' Rating'
                            : ""}`}
                    </p>
                </div>
            </div>

            <div className="tag-durability">
                <span>Tag Durability</span>
                <div className="tag-durability-content">
                    <div className="tag-durability-box">
                        <img src="../images/durability.svg" alt="" />
                        <p className="mb-0">Non Tearable</p>
                    </div>
                    <div className="tag-durability-box">
                        <img src="../images/durability.svg" alt="" />
                        <p className="mb-0">Water Proof</p>
                    </div>
                    <div className="tag-durability-box">
                        <img src="../images/durability.svg" alt="" />
                        <p className="mb-0">Reflector</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RatingDurabilityDetail;
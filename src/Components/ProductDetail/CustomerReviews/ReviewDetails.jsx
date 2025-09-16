import { Rating } from 'react-simple-star-rating';

const ReviewDetails = (props) => {
    const { productRating } = props;

    return (
        <div className="review-details">
            {productRating?.map((item, i) => (
                <div className="review_show_wrapper">
                    <div className="review_customer_detail" key={i}>
                        <h6 className="review_customer_name">{item?.userName}</h6>
                        <Rating
                            initialValue={item?.ratting > 0 ? item?.ratting : 0}
                            readonly
                            size={22}
                            label={`Rating: ${item?.ratting}`}
                            fractions={2}
                        />
                        <div className="review_customer_comment">
                            <span>{item?.remark}</span>
                        </div>
                    </div>
                    <div>
                        <p>{new Date(item?.createdDate).toLocaleDateString('en-GB')}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ReviewDetails;
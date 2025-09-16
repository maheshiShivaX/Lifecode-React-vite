import { Rating } from 'react-simple-star-rating';

const ReviewForm = (props) => {
    const { ratingForm, setRatingForm, saveRatingData, handleRatingChange } = props;

    return (
        <div className="review-form">
            <div className={`review_form_container`}>
                <div className="form_rate_star">
                    <div className="">
                        <div className="rate_star">
                            <label className="rete_label">Rating</label><br />
                            <Rating
                                initialValue={ratingForm?.ratting || 0}
                                size={22}
                                onClick={handleRatingChange}
                                fractions={2}
                            />
                        </div>
                        <form onSubmit={saveRatingData}>
                            <div className="row rating_form">
                                <div>
                                    <div className="form-group">
                                        <label className="rete_label">Review</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            value={ratingForm?.remark}
                                            onChange={(e) => setRatingForm({ ...ratingForm, remark: e.target.value })}
                                            placeholder="Leave a remark"
                                        />
                                    </div>
                                </div>
                                <div className="review_submit_button">
                                    <button type="submit">Submit Review</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewForm;
import React, { useContext, useState, useEffect } from 'react';
import './viewList.css';
import StarRating from '../../../averageReview/metaRate.jsx';
import { ReviewsContext } from '../../../../../state/ReviewsContext.jsx';
import { ProductsContext } from '../../../../../state/ProductsContext.jsx';
import moment from 'moment';
import LongerThan from './longerThan.jsx';
import ImagePopUp from './imagePopUp/imagePopUp.jsx';
import Helpful from './helpful/helpful.jsx';

function reviewList({sort}) {
  const { reviews } = useContext(ReviewsContext);
  const { currentProduct } = useContext(ProductsContext);
  const [viewableReviews, setViewableReviews] = useState(2);
  const [expandReview, setExpandReview] = useState(null);
  const [imageModalPopUp, setImageModalPopUp] = useState(false);

  const imageModalPop = () => {
    setImageModalPopUp(true);
  };

  const hideImageModalPop = () => {
    setImageModalPopUp(false);
  };

  const loadMore = () => {
    setViewableReviews(viewableReviews + 2);
    if (viewableReviews >= reviews.length) {
      setExpandReview(false);
    }
  };

  const showAll = () => {
    setViewableReviews(reviews.length);
    setExpandReview(false);
  };

  useEffect(() => {
    if (reviews !== null) {
      if (reviews.length <= 2) {
        setExpandReview(false);
      } else {
        setExpandReview(true);
      }
    }
  }, [reviews]);

  useEffect(() => {
    setViewableReviews(2);
    setExpandReview(null);
  }, [currentProduct]);

  if (reviews !== null) {
    return (
      <div className="reviewBodyTile">
      <div className="reviewBodyBox">
        {reviews.slice(0, viewableReviews).map((review) => (
          <div className="reviewBodyBox_review" key={review.review_id}>
            <span className="reviewBodyBox_rating">{StarRating(review.rating)}</span>
            <h3 className="reviewBodyBox_title">
              {review.summary.substring(0, 60)}
            </h3>
            <div className="reviewBodyBox_userCheck" />
            <div className="reviewBodyBox_username">{review.reviewer_name}</div>
            <div className="reviewBodyBox_date">{moment(review.date).format('ll')}</div>
            <div className="reviewBodyBox_body">
              { (review.body.length >= 250) ? <LongerThan half={review.body.substring(0, 250)} test={review.body}/> : review.body }
            </div>
            <div className="reviewBodyBox_recommend">
              {(review.recommend) ? <div className="reviewBodyBox_Irecommend"><i className="fad fa-check-circle" />I recommend this product</div> : null}
            </div>
            <div className="reviewBodyBox_response">
              response from seller:
              {String(review.response)}
            </div>
            {review.photos.map((photo) => (
              <div className="reviewBodyBox_thumbnail" key={photo.id}>
                <img className="reviewBodyBox_img" src={photo.url} alt="image" onClick={imageModalPop} onError={(e)=>{e.target.onerror = null; e.target.src="https://via.placeholder.com/150"}} />
                <ImagePopUp show={imageModalPopUp} handleClose={hideImageModalPop} img={photo.url} />
              </div>
            ))}
            <div className="reviewBodyBox_helpful">
              <Helpful helpfulNum={review.helpfulness} reviewId={review.review_id} />
            </div>
          </div>
        ))}
      </div>
      {expandReview ? <button className="reviewShowMoreButton" onClick={loadMore}>More Reviews</button> : null}
      {expandReview ? <button className="showAllReviewButton" onClick={showAll}>Show All Reviews</button> : null}
      </div>
    );
  }
  return null;
}

export default reviewList;

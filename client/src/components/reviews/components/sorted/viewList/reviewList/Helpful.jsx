import React, { useContext, useState, useEffect }from 'react';
import { ReviewsContext } from '../../../../../state/ReviewsContext.jsx';
import './Helpful.css';

const helpful = ({ reviewId, helpfulNum }) => {
  const { markHelpfulReview, reportReview } = useContext(ReviewsContext);
  const [helpfulNow, setHelpful] = useState(false);
  const [report, setReport] = useState(false);
  const [countHelpful, setCountHelpful] = useState(0);
  const [countReport, setCountReport] = useState(0);

  const updateHelpful = () => {
    setHelpful(true);
    setCountHelpful(countHelpful + 1);
  };

  const reporting = () => {
    setReport(true);
    setCountReport(countReport + 1);
  };

  useEffect(async () => {
    (helpful && (countHelpful === 1)) ? await markHelpfulReview(reviewId) : setHelpful(true);
  }, [helpful]);

  useEffect(async () => {
    (report && (countReport >= 1)) ? await reportReview(reviewId) : setReport(true);
  }, [report]);

  return(
    <div className="reviewHelpful" >
      <div className="reviewHelpful_title">
        Was this review helpful?
      </div>
      <div className="reviewHelpful_response" onClick={updateHelpful} >
        {helpfulNow === false ? <div className="reviewHelpful_no">Yes</div> : <div className="reviewHelpful_yes">Yes</div> }
      </div>
      <div className="reviewHelpful_count">
        {(countHelpful === 0) ? <div className="reviewHelpful_count_normal">({helpfulNum})</div> : <div className="reviewHelpful_count_plusOne">({Number(helpfulNum) + 1})</div>}
      </div>
      <div className="reviewHelpful_report" onClick={reporting} >
        {report ? <div className="reviewHelpful_reportYes">Reported</div> : <div className="reviewHelpful_reportNo">Report</div>}
      </div>

    </div>
  )
}

export default helpful;
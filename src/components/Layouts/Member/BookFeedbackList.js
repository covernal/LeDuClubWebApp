import React,{PropTypes} from 'react';
import ReactStars from 'react-stars';

class BookFeedbackList extends React.Component{
  render() {
    let loadingClass = (this.props.isInitTable || this.props.isInitTable == undefined) ? 'loading' : 'loading hidden';
    let rows = [];
    if(this.props.bookReviews.length > 0) {
      this.props.bookReviews.forEach((review, idx) => {
        rows.push(
          <div key={`book-review-${idx}`} className=" p-t-10">
            <h5 className="text-muted m-b-5">{review.fullName}</h5>
            <ReactStars count={5} size={18} value={review.rate} edit={false}/>
            <p className="text-muted font-13 m-b-0">{review.comment}</p>
          </div>
        );
      });
    }

    return (                                 
      <div>
        {rows}
        <div style={{width:"114px"}}>
          <div className={loadingClass}>
            <i className="fa fa-spinner fa-spin-custom" aria-hidden="true"></i>
          </div>        
        </div>
      </div>
    );
  }
}

export default BookFeedbackList;

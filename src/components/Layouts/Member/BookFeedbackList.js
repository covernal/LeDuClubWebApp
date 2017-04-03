import React,{PropTypes} from 'react';

class BookFeedbackList extends React.Component{
  render() {
    return (                                 
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <h4 className="">会员评价：
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
          </h4>
          <div className=" p-t-10">
            <h5 className="text-muted m-b-5">王小美</h5>
            <p></p>
            <p>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star "></i>
              <i className="fa fa-star "></i>
            </p>
            <p className="text-muted font-13 m-b-0">我觉得这本书非常好。我可以陪着孩子一起阅读。</p>
          </div>
          <br/>
          <div className=" p-t-10">
            <h5 className="text-muted m-b-5">王小美</h5>
            <p></p>
            <p>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star "></i>
              <i className="fa fa-star "></i>
            </p>
            <p className="text-muted font-13 m-b-0">我觉得这本书非常好。我可以陪着孩子一起阅读。</p>
          </div>
          <br/>
          <div className=" m-b-30 text-left m-t-10">
            <button type="button" className="btn btn-default waves-effect w-md waves-light">显示更多评论</button>
          </div>
        </div>
      </div>
    );
  }
}

export default BookFeedbackList;

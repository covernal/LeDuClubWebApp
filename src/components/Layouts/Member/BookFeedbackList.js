import React,{PropTypes} from 'react';
import ReactStars from 'react-stars';

class BookFeedbackList extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      
    };

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {

  }

  render() {
    return (                                 
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <h4 className="pull-left">会员评价： </h4>
          <div className="pull-left" style={{marginTop: '1px'}}>
            <ReactStars count={5} size={25} value={4.5} edit={false}/>
          </div>
          <div className="clearfix"></div>
          <div className=" p-t-10">
            <h5 className="text-muted m-b-5">王小美</h5>
            <ReactStars count={5} size={18} value={4} edit={false}/>
            <p className="text-muted font-13 m-b-0">我觉得这本书非常好。我可以陪着孩子一起阅读。</p>
          </div>
          <br/>
          <div className=" p-t-10">
            <h5 className="text-muted m-b-5">王小美</h5>
            <ReactStars count={5} size={18} value={5} edit={false}/>
            <p className="text-muted font-13 m-b-0">我觉得这本书非常好。我可以陪着孩子一起阅读。</p>
          </div>
          <br/>
          <div className=" m-b-30 text-left m-t-10">
            <button type="button" className="btn btn-default waves-effect w-md waves-light" onClick={this.loadMore}>显示更多评论</button>
          </div>
        </div>
      </div>
    );
  }
}

export default BookFeedbackList;

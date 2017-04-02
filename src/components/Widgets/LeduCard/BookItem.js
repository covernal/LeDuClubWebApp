import React,{PropTypes} from 'react';
import {Link} from 'react-router';

require("../../../assets/templates/images/books/1.jpg");

class BookItem extends React.Component{
  render() {
    let actionBtn = '';
    if(this.props.type === "admin") {
      actionBtn = (<Link to="/admin/book/1" className="btn btn-primary btn-block waves-effect waves-light">编辑</Link>);
    }else {
      if(this.props.status === true) {
        actionBtn = (<Link to="/member/book/1" className="btn btn-primary btn-block waves-effect waves-light">我要借阅</Link>);
      }else {
        actionBtn = (<button type="button" className="btn btn-grey btn-block waves-effect waves-light">已被借阅</button>);
      }
    }

    return (
      <div className="property-card">
        <div className="property-image" style={{background: "url('/assets/images/1.jpg') center center / cover no-repeat"}}></div>
        <div className="property-content">
          <div className="listingInfo">
            <div className="">
              <h5 className="text-primary m-t-0">建议阅读年龄：3－5岁</h5>
            </div>
            <div className="">
              <h4 className="text-overflow">
                <a href="#" className="text-dark">That's Not My Snowman</a>
              </h4>
              <p className="text-muted text-overflow">页数：24页</p>
              <p className="text-muted text-overflow">会员评价：
                                              
                <i className="fa fa-star text-warning"></i>
                <i className="fa fa-star text-warning"></i>
                <i className="fa fa-star text-warning"></i>
                <i className="fa fa-star text-warning"></i>
                <i className="fa fa-star text-warning"></i>
              </p>
              <div className="m-t-20">
                {actionBtn}                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookItem;

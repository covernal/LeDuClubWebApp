import React,{PropTypes} from 'react';

require("../../../assets/templates/images/books/4.jpg");

class MemberMyBookItem extends React.Component{
  render() {
    return (
      <div className="property-card property-horizontal">
        <div className="row">
          <div className="col-sm-3">
            <div className="property-image" style={{background: "url('/assets/images/4.jpg') center center / cover no-repeat"}}>
            </div>
          </div>

          <div className="col-sm-9">
            <div className="property-content">
              <div className="listingInfo">
                <div className="">
                  <h4 className="text-primary m-t-0">建议阅读年龄：3－5岁</h4>
                </div>
                <div className="">
                  <h3><a href="#" className="text-dark">That's Not My Snowman</a></h3>
                  <p className="text-muted text-overflow">页数：24页</p>
                  <p className="text-muted text-overflow">会员评价：
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                  </p>
                  <p className="text-muted text-overflow">已借阅：3天</p>
                  <p className="text-muted text-overflow"><button type="button" className="btn btn-warning btn-block waves-effect waves-light">我要还书</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
            
    );
  }
}

export default MemberMyBookItem;

import React,{PropTypes} from 'react';

require("../../../assets/templates/images/books/1.jpg");

class MemberRequestItem extends React.Component{
  render() {
    return (
      <div className="property-card property-horizontal">
          <div className="row">
              <div className="col-sm-3">
                  <div className="property-image" style={{background: "url('/assets/images/1.jpg') center center / cover no-repeat"}}>
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
                              <p className="text-muted text-overflow">类型：还书</p>
                              <p className="text-muted text-overflow">状态：已配送（预计于2017年5月4日取书）</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
            
    );
  }
}

export default MemberRequestItem;

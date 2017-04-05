import React,{PropTypes} from 'react';
import ReactStars from 'react-stars';

require("../../../assets/templates/images/books/3.jpg");
require("../../../assets/templates/images/books/4.jpg");

class MemberRequestItem extends React.Component{
  render() {
    let item = this.props.item;
    return (
      <div className="property-card property-horizontal">
          <div className="row">
              <div className="col-sm-3">
                  <div className="property-image" style={{background: `url(${item.image}) center center / cover no-repeat`}}>
                  </div>
              </div>

              <div className="col-sm-9">
                  <div className="property-content">
                      <div className="listingInfo">
                          <div className="">
                              <h4 className="text-primary m-t-0">建议阅读年龄：3－5岁</h4>
                          </div>
                          <div className="">
                              <h3><a href="#" className="text-dark">{item.title}</a></h3>
                              <p className="text-muted text-overflow">页数：{item.pages}页</p>
                              <p className="text-muted pull-left">会员评价： </p>
                              <div className="pull-left" style={{marginTop: "-1px"}}>
                                <ReactStars count={5} size={18} value={item.reviews} edit={false}/>
                              </div> 
                              <p className="text-muted text-overflow">类型：{item.type}</p>
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

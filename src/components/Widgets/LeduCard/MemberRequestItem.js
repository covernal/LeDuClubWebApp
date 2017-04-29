import React,{PropTypes} from 'react';
import ReactStars from 'react-stars';
import moment from 'moment';
class MemberRequestItem extends React.Component{
  render() {
    let item = this.props.item;
    let estimatedDeliveryDate = moment.utc(item.estimatedDeliveryDate).add(8, 'hours').format('YYYY年M月D日');    

    return (
      <div className="property-card property-horizontal">
          <div className="row">
              <div className="col-sm-3">
                  <div className="property-image" style={{background: `url(${item.book.images[0]}) center center / cover no-repeat`}}>
                  </div>
              </div>

              <div className="col-sm-9">
                  <div className="property-content">
                      <div className="listingInfo">
                          <div className="">
                              <h4 className="text-primary m-t-0">建议阅读年龄：{item.book.ageGroup}</h4>
                          </div>
                          <div className="">
                              <h3><a href="#" className="text-dark">{item.book.bookName}</a></h3>
                              <p className="text-muted text-overflow">页数：{item.book.numOfPages}页</p>
                              <p className="text-muted pull-left">会员评价： </p>
                              <div className="pull-left" style={{marginTop: "-1px"}}>
                                <ReactStars count={5} size={20} value={item.book.customerRate} edit={false} color2="#f9c851" color1="#797979"/>
                              </div> 
                              <p className="text-muted text-overflow">类型：{(item.requestType == "borrow") ? "借书" : "还书"}</p>
                              <p className="text-muted text-overflow">状态：已配送（预计于{estimatedDeliveryDate}取书）</p>
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

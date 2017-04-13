import React,{PropTypes} from 'react';
import moment from 'moment';

class PostmanTaskRow extends React.Component{
  constructor(props, context) {
    super(props);

    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
    this.props.handleConfirm(this.props.item.objectId);
  }

  render() {
    if (!this.props) {
      return null;
    }

    let item = this.props.item;
    let estimatedDeliveryDate = moment.utc(item.estimatedDeliveryDate).add(8, 'hours').format('YYYY-MM-DD HH:mm');    
    console.log(item);
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
                  <p><a href="#" className="text-primary">{item.book.bookName}</a>（ISBN：{item.book.ISBN}）</p>
                  <p className="text-muted">配送地址: <a href={`/book/${item.bookId}`}>{item.member.deliveryAddressString}</a></p>
                  <p className="text-muted">会员: {item.member.fullName}（电话<a href={`tel:${item.member.mobilePhoneNumber}`}>{item.member.mobilePhoneNumber}</a>）</p>
                  <p className="text-warning">类型: {(item.requestType == "borrow") ? "借书" : "还书"}</p>
                  <p className="text-muted">需要送达时间: {estimatedDeliveryDate}</p>
                  <p>
                    <button type="button" className="btn btn-warning btn-block waves-effect waves-light" onClick={this.handleConfirm}>检查书籍＋确认完成</button>
                  </p>                                                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostmanTaskRow
;

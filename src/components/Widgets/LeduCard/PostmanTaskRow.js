import React,{PropTypes} from 'react';

require("../../../assets/templates/images/books/1.jpg");
require("../../../assets/templates/images/books/2.jpg");

class PostmanTaskRow extends React.Component{
  constructor(props, context) {
    super(props);

    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
    this.props.handleConfirm(this.props.item);
  }

  render() {
    if (!this.props) {
      return null;
    }

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
                  <p><a href="#" className="text-primary">{item.title}</a>（ISBN：{item.ISBN}）</p>
                  <p className="text-muted">配送地址: <a href="" >{item.address}</a></p>
                  <p className="text-muted">会员: {item.member}（电话<a href={`tel:${item.phone}`}>{item.phone}</a>）</p>
                  <p className="text-warning">类型: {item.type}</p>
                  <p className="text-muted">需要送达时间: {item.date}</p>
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

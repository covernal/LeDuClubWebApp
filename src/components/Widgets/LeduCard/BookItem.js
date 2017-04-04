import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import ReactStars from 'react-stars';

require("../../../assets/templates/images/books/1.jpg");
require("../../../assets/templates/images/books/2.jpg");
require("../../../assets/templates/images/books/3.jpg");
require("../../../assets/templates/images/books/4.jpg");

class BookItem extends React.Component{
  render() {
    let actionBtn = '';
    let item = this.props.item;
    if(this.props.type === "admin") {
      actionBtn = (<Link to={`/admin/book/${item.id}`} className="btn btn-primary btn-block waves-effect waves-light">编辑</Link>);
    }else {
      if(item.status === true) {
        let prefix = (this.props.type === "member") ? "/member": "";
        actionBtn = (<Link to={`${prefix}/book/${item.id}`} className="btn btn-primary btn-block waves-effect waves-light">我要借阅</Link>);
      }else {
        actionBtn = (<button type="button" className="btn btn-grey btn-block waves-effect waves-light">已被借阅</button>);
      }
    }

    return (
      <div className="property-card">
        <div className="property-image" style={{background: `url('${item.image}') center center / cover no-repeat`}}></div>
        <div className="property-content">
          <div className="listingInfo">
            <div className="">
              <h5 className="text-primary m-t-0">建议阅读年龄：{item.recommendAges[0]}－{item.recommendAges[1]}岁</h5>
            </div>
            <div className="">
              <h4 className="text-overflow">
                <a href="#" className="text-dark">{item.title}</a>
              </h4>
              <p className="text-muted text-overflow">页数：{item.pages}页</p>
              <p className="text-muted pull-left">会员评价： </p>
              <div className="pull-left" style={{marginTop: "-1px"}}>
                <ReactStars
                  count={5}
                  size={18}
                  value={item.reviews}                           
                  edit={false}/>
              </div>
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

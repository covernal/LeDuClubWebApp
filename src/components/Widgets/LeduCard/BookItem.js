import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import ReactStars from 'react-stars';
import cookie from 'react-cookie';

class BookItem extends React.Component{
  render() {
    let actionBtn = '';
    let item = this.props.item;
    let detailURL = `/book/${item.objectId}`;
    if(this.props.hideButton && this.props.hideButton === true) {
      actionBtn = '';
    }else {
      if(cookie.load('type') === "admin") {
        detailURL = `/admin/book/${item.objectId}`;
        actionBtn = (<Link to={detailURL} className="btn btn-primary btn-block waves-effect waves-light">编辑</Link>);
      }else {      
        if(item.isAvailableForBorrow === true) {        
          actionBtn = (<button className="btn btn-primary btn-block waves-effect waves-light" onClick={()=>this.props.handleBorrow(item.objectId)}>我要借阅</button>);
        }else {
          actionBtn = (<button type="button" className="btn btn-grey btn-block waves-effect waves-light">已被借阅</button>);
        }
      }
    }

    return (
      <div className="property-card">
        <div className="property-image" style={{background: `url('${item.images[0]}') center center / cover no-repeat`}}></div>
        <div className="property-content">
          <div className="listingInfo">
            <div className="">
              <h5 className="text-primary m-t-0">建议阅读年龄：{item.ageGroup}</h5>
            </div>
            <div className="">
              <h4 className="text-overflow">
                <Link to={detailURL} className="text-dark">{item.bookName}</Link>
              </h4>
              <p className="text-muted text-overflow">页数：{item.numOfPages}页</p>
              <p className="text-muted pull-left">会员评价： </p>
              <div className="pull-left" style={{marginTop: "-1px"}}>
                <ReactStars
                  count={5}
                  size={18}
                  value={item.customerRate}                           
                  edit={false}/>
              </div>
              <div className="clearfix"></div>
              <div className="">
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

import React,{PropTypes} from 'react';

require("../../../assets/templates/images/books/3.jpg");

class PostmanTaskRow extends React.Component{
  render() {
    if (!this.props) {
      return null;
    }

    let taskType = (this.props.taskType == 1) ? "取书" : "送书";
    return (
      <div className="property-card property-horizontal">
        <div className="row">
          <div className="col-sm-3">
            <div className="property-image" style={{background: "url('/assets/images/3.jpg') center center / cover no-repeat"}}>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="property-content">
              <div className="listingInfo">
                <div className="">
                  <p><a href="#" className="text-primary">That's Not My Snowman</a>（ISBN：0375827781）</p>
                  <p className="text-muted">配送地址: <a href="" >青岛彰化路32号2单元601</a></p>
                  <p className="text-muted">会员: 王鹏（电话<a href="">13899990000</a>）</p>
                  <p className="text-warning">类型: {taskType}</p>
                  <p className="text-muted">需要送达时间: 2017-04-19</p>
                  <p>
                    <button type="button" className="btn btn-warning btn-block waves-effect waves-light">检查书籍＋确认完成</button>
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

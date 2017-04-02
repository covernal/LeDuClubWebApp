import React,{PropTypes} from 'react';

class MembersList extends React.Component{
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card-box">

            <div className="table-responsive">
              <table className="table table-hover mails m-0 table table-actions-bar">
                <thead>
                  <tr>
                    <th>孩子年龄组</th>
                    <th>姓名</th>
                    <th>电子邮件</th>
                    <th>配送地址</th>
                    <th>手机号码</th>
                    <th>押金</th>
                    <th>加入日期</th>
                    <th>会员到期</th>
                    <th>操作</th>
                    <th>申请状态</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="">

                    <td>
                      3-5岁
                    </td>

                    <td>
                      王鹏
                    </td>

                    <td>
                      wangpeng@qq.com
                    </td>
                    <td>
                      <a className="text-primary" href="">青岛彰化路32号2单元601</a>
                    </td>
                    <td>
                      1389999000
                    </td>
                    <td>
                      ¥200
                    </td>
                    <td>
                      2016-02-13
                    </td>
                    <td>
                      2017-02-13
                    </td>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-primary btn-sm dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="false"> 操作 <span className="caret"></span> </button>
                        <ul className="dropdown-menu">
                          <li><a href="#">押金支付确认</a></li>
                          <li><a href="#">每月会员费支付</a></li>
                          <li><a href="#">添加／更改手机号码</a></li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <div className="text-primary">已确认</div>
                    </td>
          
                  </tr>
                  <tr className="">

                    <td>
                      3-5岁
                    </td>

                    <td>
                      王鹏
                    </td>

                    <td>
                      wangpeng@qq.com
                    </td>
                    <td>
                      <a className="text-primary" href="">青岛彰化路32号2单元601</a>
                    </td>
                    <td>
                      1389999000
                    </td>
                    <td>
                      -
                    </td>
                    <td>
                      -
                    </td>
                    <td>
                      -
                    </td>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-primary btn-sm dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="false"> 操作 <span className="caret"></span> </button>
                        <ul className="dropdown-menu">
                          <li><a href="#">批准会员</a></li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <div className="">等待批准</div>
                    </td>
          
                  </tr>
                  <tr className="">

                    <td>
                      3-5岁
                    </td>

                    <td>
                      王鹏
                    </td>

                    <td>
                      wangpeng@qq.com
                    </td>
                    <td>
                      <a className="text-primary" href="">青岛彰化路32号2单元601</a>
                    </td>
                    <td>
                      -
                    </td>
                    <td>
                      -
                    </td>
                    <td>
                      -
                    </td>
                    <td>
                      -
                    </td>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-primary btn-sm dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="false"> 操作 <span className="caret"></span> </button>
                        <ul className="dropdown-menu">
                          <li><a href="#">押金支付确认</a></li>
                          <li><a href="#">每月会员费支付</a></li>
                          <li><a href="#">添加／更改手机号码</a></li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <div className="text-warning">等待付款</div>
                    </td>    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MembersList;

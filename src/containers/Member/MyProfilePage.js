import React,{PropTypes} from 'react';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';

import "../../assets/templates/images/users/avatar-1.jpg";

class MyProfilePage extends React.Component{
  render() {
    return (
      <div>
        <header id="topnav">
          <Header isPublic={false} />
          <SubHeader type="member" />
        </header>     

        <div className="wrapper">
          <div className="container">                
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">
                  <h4 className="page-title">账户管理</h4>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-sm-12">
                <div className="card-box">
                  <div className="row">
                    <div className="col-lg-3 col-md-4">
                      <div className="text-center card-box">
                        <div className="member-card">
                          <div className="thumb-xl member-thumb m-b-10 center-block">
                            <img src="/assets/images/avatar-1.jpg" className="img-circle img-thumbnail" alt="profile-image"/>
                          </div>

                          <h4 className="m-b-5">欧阳锋</h4>
                          <p className="text-muted font-13 m-t-20">
                            用户名：<b>ouyangfeng83</b>
                          </p>
                          <p className="text-muted font-13 m-t-20">
                            会员加入日：<b>2018-06-22</b>
                          </p>
                          <p className="text-muted font-13 m-t-20">
                            会员有效期至：<b>2018-06-22</b>
                          </p>
                          <p className="text-muted font-13 m-t-20">
                            押金已付：<b>¥200</b>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-8 col-lg-9">
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <form className="form-horizontal" action="#">
                            <div className="form-group">
                              <div className="col-xs-12">
                                <select className="form-control selectpicker show-tick" data-style="btn-default" defaultValue="0">
                                  <option value="0" disabled>孩子所属年龄组</option>
                                  <option value="1">3-5岁</option>
                                  <option value="1">6-8岁</option>
                                  <option value="2">9-12岁</option>
                                </select>
                              </div>
                            </div>

                            <div className="form-group ">
                              <div className="col-xs-12">
                                <input className="form-control" type="text" required="" placeholder="您的姓名"/>
                              </div>
                            </div>

                            <div className="form-group ">
                              <div className="col-xs-12">
                                <input className="form-control" type="text" required="" placeholder="电子邮件（主要联系方式）"/>
                              </div>
                            </div>

                            <div className="form-group ">
                              <div className="col-xs-12">
                                <input className="form-control" type="text" required="" placeholder="书籍取送地址"/>
                              </div>
                            </div>

                            <div className="form-group ">
                              <div className="col-xs-12">
                                <input className="form-control" type="text" required="" placeholder="手机号码（可选）"/>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-block waves-effect waves-light">保存修改</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfilePage;

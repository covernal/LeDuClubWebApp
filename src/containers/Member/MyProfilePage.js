import React,{PropTypes} from 'react';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import MyProfileForm from '../../components/Widgets/LeduForm/Member/MyProfileForm';
import LeduOverlay from '../../components/Widgets/LeduOverlay';

import "../../assets/templates/images/users/avatar-1.jpg";

class MyProfilePage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false
    };

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(data) {
    console.log(data);
    this.setState({
      sendingRequest: true
    }, () => {
      // call API
      this.setState({
        sendingRequest: false
      });
    });
  }

  render() {
    let overlayClass = (this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';

    return (
      <div>
        <header id="topnav">
          <Header isPublic={false} />
          <SubHeader />
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
                          <MyProfileForm handleSave={this.handleSave} />
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

        <LeduOverlay
          overlayClass={overlayClass}
          message="请稍候..."
        />               
      </div>
    );
  }
}

export default MyProfilePage;

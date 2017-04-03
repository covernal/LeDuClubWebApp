import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import MemberMyBookItem from '../../components/Widgets/LeduCard/MemberMyBookItem';

class MyBooksPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false
    };
  }

  render() {
    if (!this.props) {
      return null;
    }

    let requestsList = [1, 2, 3];
    let overlayClass = (this.state.sendingRequest) ? 'endorsse-overlay show' : 'endorsse-overlay';

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
                  <h4 className="page-title">我的书包</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-10">
                {
                  requestsList.map((item, idx) =>
                    <MemberMyBookItem key={`request-${idx}`} />
                  )
                }
              </div>
            </div>
            
            <div className="row">
              <div className="col-xs-12 m-b-30 text-center m-t-10">
                <button type="button" className="btn btn-default waves-effect w-md waves-light " data-toggle="modal" data-target="#custom-width-modal">显示更多</button>
              </div>
            </div>
            
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

MyBooksPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default MyBooksPage;

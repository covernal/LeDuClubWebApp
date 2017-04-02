import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import BookEditForm from '../../components/Widgets/LeduForm/Admin/BookEditForm';
import BookImageAdder from '../../components/Layouts/Admin/BookImageAdder';

require("../../assets/templates/images/books/1.jpg");

class BookDetailsPage extends React.Component{
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

    let overlayClass = (this.state.sendingRequest) ? 'endorsse-overlay show' : 'endorsse-overlay';

    return (
      <div>
        <header id="topnav">
          <Header isPublic={false} />
          <SubHeader type="admin" />
        </header>     

        <div className="wrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">
                  <h4 className="page-title">图书资料编辑</h4>
                </div>
              </div>
            </div>

            <div className="property-detail-wrapper">
              <div className="row">
                <BookImageAdder />
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <BookEditForm />
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

BookDetailsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BookDetailsPage;

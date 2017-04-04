import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import BookEditForm from '../../components/Widgets/LeduForm/Admin/BookEditForm';
import BookImagesUploader from '../../components/Layouts/Admin/BookImagesUploader';
import LeduOverlay from '../../components/Widgets/LeduOverlay';

require("../../assets/templates/images/books/1.jpg");

class BookDetailsPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      images: ["/assets/images/1.jpg"],
      sendingRequest: false
    };

    this.saveBook = this.saveBook.bind(this);
  }

  saveBook(data) {
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
    if (!this.props) {
      return null;
    }

    let overlayClass = (this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';

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
                <BookImagesUploader images={this.state.images}/>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <BookEditForm saveBook={this.saveBook}/>
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
          message="Please wait..."
        />              
      </div>
    );
  }
}

BookDetailsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BookDetailsPage;

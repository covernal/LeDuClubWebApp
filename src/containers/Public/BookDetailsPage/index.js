import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';
import ImageGallery from 'react-image-gallery';
import './_bookDetailsPage.less';

import Header from '../../../components/Layouts/Common/Header';
import SubHeader from '../../../components/Layouts/Common/SubHeader';
import Footer from '../../../components/Layouts/Common/Footer';
import BookEditForm from '../../../components/Widgets/LeduForm/Admin/BookEditForm';
import BookFeedbackList from '../../../components/Layouts/Member/BookFeedbackList';
import BookCommentForm from '../../../components/Widgets/LeduForm/Member/BookCommentForm';

require("../../../assets/templates/images/books/1.jpg");
require("../../../assets/templates/images/books/2.jpg");
require("../../../assets/templates/images/books/3.jpg");

class BookDetailsPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false
    };

    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  handleImageLoad() {
    
  }

  render() {
    if (!this.props) {
      return null;
    }

    let overlayClass = (this.state.sendingRequest) ? 'endorsse-overlay show' : 'endorsse-overlay';
    let images = [
      {
        original: '/assets/images/1.jpg',
        thumbnail: '/assets/images/1.jpg'
      },
      {
        original: '/assets/images/2.jpg',
        thumbnail: '/assets/images/2.jpg'
      }
    ];

    return (
      <div>
        <header id="topnav">
          <Header isPublic={false} />
          <SubHeader type="public" />
        </header>     

        <div className="wrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">
                  <h4 className="page-title">图书名字</h4>
                </div>
              </div>
            </div>

            <div className="property-detail-wrapper">
              <div className="row">
                <div className="col-md-6">
                  <ImageGallery
                    items={images}
                    autoPlay={true}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    slideDuration={2000}
                    slideInterval={5000}
                    onImageLoad={this.handleImageLoad}/>
                    
                  <div className="m-t-30">
                      <h5 className="text-primary m-t-0">建议阅读年龄：3－5岁</h5>
                      <p className="text-muted text-overflow">页数：24页</p>
                      <p className="m-t-20">
                          这里是编辑评论。 这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。这里是编辑评论。
                      </p>
                  </div>
                  <div className="m-t-20 m-b-30">
                      <button type="button" className="btn-lg btn-primary btn-block waves-effect waves-light">我要借阅</button>
                  </div>
                </div>
                <div className="col-md-6">                                    
                  <BookFeedbackList />
                  <hr/>

                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <BookCommentForm />
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

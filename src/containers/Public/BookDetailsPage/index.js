import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';
import ImageGallery from 'react-image-gallery';
import ReactStars from 'react-stars';
import Find from 'lodash/find';
import SweetAlert from 'sweetalert-react';
import './_bookDetailsPage.less';

import Header from '../../../components/Layouts/Common/Header';
import SubHeader from '../../../components/Layouts/Common/SubHeader';
import Footer from '../../../components/Layouts/Common/Footer';
import BookEditForm from '../../../components/Widgets/LeduForm/Admin/BookEditForm';
import BookFeedbackList from '../../../components/Layouts/Member/BookFeedbackList';
import BookCommentForm from '../../../components/Widgets/LeduForm/Member/BookCommentForm';
import LeduOverlay from '../../../components/Widgets/LeduOverlay';
import {CommonUserActions, MemberUserActions} from '../../../actions';

class BookDetailsPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      firstLoadingRequest: true,
      sendingRequest: false,
      serverError: null,

      skip: 0,
      hasMoreReviews: true,
      isLoadingMore: false,
      isInitTable: true,
      bookReviews: []
    };

    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleBorrow = this.handleBorrow.bind(this);
    this.loadMoreReviews = this.loadMoreReviews.bind(this);
    this._loadReviews = this._loadReviews.bind(this);
  }

  componentDidMount() {
    this.props.getBook({
      id: this.props.params.id,
      cb: () => {
        this.setState({
          firstLoadingRequest: false
        });
        this._loadReviews();
      }
    });
  }

  loadMoreReviews() {
    this.setState({
      isLoadingMore: true
    }, () => {
      this._loadReviews();
    });
  }

  _loadReviews() {
    this.props.getBookReviews({
      skip: this.state.skip,
      bookId: this.state.belongToWarehouseId,
      cb: () => this.loadMoreCallback()
    });
  }

  renderPlayPauseButton(onClick, isPlaying) {
    return (
      <button
        type='button'
        className={
          `image-gallery-play-button${isPlaying ? ' active' : ''}`}
        onClick={onClick}
      />
    );
  }

  loadMoreCallback() {
    if(this.props.serverError != null) {
      this.setState({
        serverError: this.props.serverError,
        isInitTable: false,
        isLoadingMore: false
      });
      return;
    }

    if(this.props.bookReviews.length > 0){
      let limit = 0;
      let tmpRevews = [];
      this.props.bookReviews.forEach((review) => {
        if(this.state.serverError == null) {
          this.props.getUser({
            id: review.memberId,
            cb: () => {
              tmpRevews.push({
                rate: review.rate,
                comment: review.comment,
                objectId: review.objectId,
                fullName: this.props.userDetails.fullName
              });

              limit++;              
              if(this.props.bookReviews.length === limit) {
                let sub_limit = 0;
                tmpRevews.forEach((r) => {
                  let existObj = Find(this.state.bookReviews, (l) => {
                    return l.objectId == r.objectId;
                  });
                  if(existObj == undefined) {
                    this.state.bookReviews.push(r);
                    sub_limit++;          
                  }
                });

                this.setState({
                  skip: this.state.skip + limit,
                  bookReviews: this.state.bookReviews,
                  isInitTable: false,
                  isLoadingMore: false
                });                
              }
            }
          });
        }else {
          this.setState({
            serverError: this.props.serverError,
            isInitTable: false,
            isLoadingMore: false
          });
        }
      });
    }else{
      this.setState({
        hasMoreReviews: false,
        isInitTable: false,
        isLoadingMore: false
      });
    }
  }

  handleImageLoad() {
    
  }

  handleBorrow() {
    this.setState({
      sendingRequest: true
    }, () => {
      this.props.memberNewBookBorrowRequest({
        bookId: this.props.params.id,
        cb: () => {
          this.setState({
            sendingRequest: false,
            serverError: this.props.memberServerError
          });
          if(this.props.memberServerError === null) {
            this.context.router.push('/login');
          }
        }
      });
    });
  }

  handleComment(data) {
    data['bookId'] = this.props.params.id;
    this.setState({
      sendingRequest: true
    }, () => {
      this.props.memberAddComment({
        data: data,
        cb: () => {
          this.setState({
            sendingRequest: false,
            serverError: this.props.memberServerError
          });
          if(this.props.memberServerError === null) {
            this.context.router.push('/login');
          }
        }
      });
    });
  }

  render() {
    if (!this.props) {
      return null;
    }

    let images = [];
    let disabled = (this.state.isLoadingMore || !this.state.hasMoreReviews) ? 'disabled' : '';
    let spinnerClass = (this.state.isLoadingMore) ? 'fa fa-spinner fa-spin-custom' : 'fa fa-spinner fa-spin-custom hidden';
    let overlayClass = (this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';

    if(this.state.sendingRequest === false && this.props.book && this.props.book.images.length > 0) {
      this.props.book.images.forEach((img, idx) => {
        images.push({
          original: img,
          thumbnail: img
        });
      });
    }

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
                  <h4 className="page-title">图书名字</h4>
                </div>
              </div>
            </div>
            {
              (this.state.firstLoadingRequest) ?
              (<LeduOverlay overlayClass='ledu-overlay show' message="请稍候..."/>) :
              (<div className="property-detail-wrapper">
                <div className="row">
                  <div className="col-md-6">
                    {
                      (images.length === 0) ?  (<img src='/assets/images/bookImagePlaceholder.jpg' style={{width: "40%", margin: "0 auto", display: "block"}}/>) : 
                      <ImageGallery
                        items={images}
                        autoPlay={true}
                        showFullscreenButton={false}
                        showPlayButton={true}
                        slideDuration={2000}
                        slideInterval={5000}
                        renderPlayPauseButton={this.renderPlayPauseButton}
                        onImageLoad={this.handleImageLoad}/>
                    }
                    <div className="clearfix"></div>  
                    <div className="m-t-30">
                        <h5 className="text-primary m-t-0">建议阅读年龄：{this.props.book.ageGroup}</h5>
                        <p className="text-muted text-overflow">页数：{this.props.book.numOfPages}页</p>
                        <p className="m-t-20">
                          {this.props.book.editorReview}
                        </p>
                    </div>
                    <div className="m-t-20 m-b-30">
                      { (0) ? 
                        (
                          (this.props.book.isAvailableForBorrow === true) ? 
                          (<button type="button" className="btn-lg btn-primary btn-block waves-effect waves-light" onClick={this.handleBorrow}>我要借阅</button>) : 
                          (<button type="button" className="btn btn-grey btn-block waves-effect waves-light">已被借阅</button>)
                        ) : ''
                      }
                    </div>
                  </div>
                  <div className="col-md-6"> 
                    <div className="row">
                      <div className="col-md-12 col-sm-12">
                        <h4 className="pull-left">会员评价： </h4>
                        <div className="pull-left" style={{marginTop: '1px'}}>
                          <ReactStars count={5} size={25} color2="#f9c851" color1="#797979" value={this.props.book.customerRate} edit={false}/>
                        </div>
                        <div className="clearfix"></div>
                        <BookFeedbackList isInitTable={this.state.isInitTable} bookReviews={this.state.bookReviews}/>
                        <div className=" m-b-10 text-left m-t-30">
                          <button type="button" disabled={disabled} className="btn btn-default waves-effect w-md waves-light m-t-0 m-b-30" onClick={this.loadMoreReviews}><i className={spinnerClass} aria-hidden="true"></i> {(this.state.hasMoreReviews) ? '显示更多评论' : '没有更多评论'}</button>
                        </div>
                      </div>
                    </div>                                                     
                    
                    {
                      (cookie.load('type') !== undefined) ?
                      (
                        <div>
                          <hr/>
                          <div className="row">
                            <div className="col-md-12 col-sm-12">
                              <BookCommentForm handleComment={this.handleComment} />
                            </div>
                          </div>
                        </div>
                      ) : ''
                    }
                  </div>
                </div>
              </div>)
            }
            <Footer />
          </div>
        </div>

        <SweetAlert
          show={this.state.serverError != null}
          type="error"
          title="错误..."
          text={(this.state.serverError != null) ? this.state.serverError.message : ''}
          onConfirm={()=>this.setState({serverError: null})}
        />         

        <LeduOverlay
          overlayClass={overlayClass}
          message="请稍候..."
        />           
      </div>
    );
  }
}

BookDetailsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.CommonUserReducer.userDetails,
    book: state.CommonUserReducer.book,
    bookReviews: state.CommonUserReducer.bookReviews,
    serverError: state.CommonUserReducer.error,
    result: state.MemberUserReducer.result,
    memberServerError: state.MemberUserReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: (req) => {
      dispatch(CommonUserActions.getUser(req.id, req.cb));
    },

    getBook: (req) => {
      dispatch(CommonUserActions.getBook(req.id, req.cb));
    },

    getBookReviews: (req) => {
      dispatch(CommonUserActions.getBookReviews(req.skip, req.bookId, req.cb));
    },

    memberNewBookBorrowRequest: (req) => {
      dispatch(MemberUserActions.memberNewBookBorrowRequest(req.bookId, req.cb));
    }, 

    memberAddComment: (req) => {
      dispatch(MemberUserActions.memberAddComment(req.data, req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsPage);
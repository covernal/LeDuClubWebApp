import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';
import SweetAlert from 'sweetalert-react';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import BookEditForm from '../../components/Widgets/LeduForm/Admin/BookEditForm';
import BookImagesUploader from '../../components/Layouts/Admin/BookImagesUploader';
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import {CommonUserActions, AdminUserActions} from '../../actions';

class BookDetailsPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      book: null,
      images: [],
      warehouses: [],
      sendingRequest: true
    };

    this.setImages = this.setImages.bind(this);
    this.saveBook = this.saveBook.bind(this);    
  }

  componentDidMount() {
    this.props.loadWarehouses({
      cb: () => {
        if(this.props.serverError === null) {
          this.setState({
            warehouses: this.props.warehouses
          }, ()=> {
            if(this.props.params.id) {
              this.props.getBook({
                id: this.props.params.id,
                cb: () => {
                  this.setState({
                    sendingRequest: false,
                    book: this.props.book,
                    images: this.props.book.images
                  });
                }
              });
            }else {
              this.setState({
                sendingRequest: false
              });              
            }
          });
        }
      }
    });    
  }

  setImages(images) {
    this.setState({
      images: images
    });
  }

  saveBook(data) {
    data['images'] = this.state.images;  
    let args = {
      data: data,
      cb: () => {
        this.setState({
          sendingRequest: false,
          serverError: this.props.adminServerError
        });

        if(this.props.adminServerError === null) {
          this.context.router.push('/browsebooks');
        }
      }
    };
    
    this.setState({
      sendingRequest: true
    }, () => {
      if(this.props.params.id) {
        args.data['bookId'] = this.props.params.id;
        this.props.updateBook(args);
      }else {
        this.props.createBook(args);
      }
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
          <SubHeader />
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
            {
              (this.state.sendingRequest === false) ?
              (
                <div className="property-detail-wrapper">
                  <div className="row">
                    <BookImagesUploader images={this.state.images} setImages={this.setImages}/>
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <BookEditForm saveBook={this.saveBook} warehouses={this.state.warehouses} book={this.state.book}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : ''
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
    warehouses: state.CommonUserReducer.warehouses,
    book: state.CommonUserReducer.book,
    serverError: state.CommonUserReducer.error,
    adminServerError: state.AdminUserReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBook: (req) => {
      dispatch(CommonUserActions.getBook(req.id, req.cb));
    },
    loadWarehouses: (req) => {
      dispatch(CommonUserActions.loadWarehouses(req.cb));
    },
    updateBook: (req) => {
      dispatch(AdminUserActions.adminUpdateBook(req.data, req.cb));
    },
    createBook: (req) => {
      dispatch(AdminUserActions.adminCreateBook(req.data, req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsPage);
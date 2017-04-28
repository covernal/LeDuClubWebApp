import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';
import Find from 'lodash/find';
import SweetAlert from 'sweetalert-react';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import PublicBookSearchForm from '../../components/Widgets/LeduForm/Member/BookSearchForm';
import AdminBookSearchForm from '../../components/Widgets/LeduForm/Admin/BookSearchForm';
import BookItem from '../../components/Widgets/LeduCard/BookItem';
import {MemberUserActions, CommonUserActions} from '../../actions';

class ThisWeekPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {   
      isInitTable: true,
      bookboxes: [],
      books: []
    };
  }

  componentDidMount() {
    let books = [];
    this.props.loadBookBoxes({
      cb: () => {
        this.setState({
          serverError: this.props.serverError,
          bookboxes: this.props.bookboxes          
        });     

        if(this.props.serverError === null) {          
          if(this.props.bookboxes.length > 0) {
            let limit = 0;
            this.props.bookboxes.forEach((box, idx) => {
              this.props.getBookBox({
                id: box.bookBoxId,
                cb: () => {
                  this.setState({
                    serverError: this.props.commonServerError
                  });

                  if(this.props.commonServerError !== null) {
                    this.setState({
                      isInitTable: false
                    });
                    return;                    
                  }

                  limit++;
                  let sub_limit = 0;
                  this.props.bookbox.books.forEach((bookId, idx) => {
                    this.props.getBook({
                      id: bookId,
                      cb: () => {
                        if(this.props.commonServerError !== null) {
                          this.setState({
                            isInitTable: false
                          });
                          return;                    
                        }

                        sub_limit++;
                        books.push(this.props.book);
                        if(this.props.bookboxes.length === limit && this.props.bookbox.books.length === sub_limit) {
                          this.setState({
                            books: books,
                            isInitTable: false
                          });
                        }
                      }
                    });
                  });
                }
              });
            });
          }else {
            //If it's empty.
            this.setState({
              isInitTable: false
            });
          }

        }else {
          this.setState({
            isInitTable: false
          });
        }   
      }
    });
  }

  render() {
    if (!this.props) {
      return null;
    }

    let loadingClass = (this.state.isInitTable || this.state.isInitTable == undefined) ? 'loading' : 'loading hidden';

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
                  <h4 className="page-title">本周阅读</h4>
                </div>
              </div>
            </div>
            
            <div className="row">              
              {
                this.state.books.map((item, idx) =>
                  <div key={`book-${idx}`} className="col-md-3 col-sm-4">
                    <BookItem type="member" item={item} handleBorrow={this.handleBorrow} hideButton={true}/>
                  </div>
                )
              }
              <div className="clearfix"></div>
              <div className={loadingClass}>
                <i className="fa fa-spinner fa-spin-custom" aria-hidden="true"></i>
              </div>               
            </div>

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
      </div>
    );
  }
}

ThisWeekPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    book: state.CommonUserReducer.book,
    bookbox: state.CommonUserReducer.bookbox,
    bookboxes: state.MemberUserReducer.bookboxes,
    serverError: state.MemberUserReducer.error,
    commonServerError: state.CommonUserReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBook: (req) => {
      dispatch(CommonUserActions.getBook(req.id, req.cb));
    },    
    getBookBox: (req) => {
      dispatch(CommonUserActions.getBookBox(req.id, req.cb));
    },    
    loadBookBoxes: (req) => {
      dispatch(MemberUserActions.memberGetThisWeekBookBox(req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThisWeekPage);
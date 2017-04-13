import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';
import Find from 'lodash/find';
import SweetAlert from 'sweetalert-react';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import MemberMyBookItem from '../../components/Widgets/LeduCard/MemberMyBookItem';
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import {MemberUserActions} from '../../actions';

class MyBooksPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false,      
      isInitTable: true,
      books: []
    };
  }

  componentDidMount() {
    this.props.loadBooks({
      cb: () => {
        console.log(this.props.books);
        this.setState({
          serverError: this.props.serverError,
          isInitTable: false
        });          
        if(this.props.serverError === null) {

          this.setState({
            books: this.props.books
          });
        }
      }
    });
  }

  render() {
    if (!this.props) {
      return null;
    }

    let overlayClass = (this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';
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
                  <h4 className="page-title">我的书包</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-10">
                {
                  this.state.books.map((item, idx) =>
                    <MemberMyBookItem key={`book-${idx}`} item={item} />
                  )
                }
              </div>
            </div>

            <div className="clearfix"></div>
            <div className={loadingClass}>
              <i className="fa fa-spinner fa-spin-custom" aria-hidden="true"></i>
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

        <LeduOverlay
          overlayClass={overlayClass}
          message="请稍候..."
        />              
      </div>
    );
  }
}

MyBooksPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    books: state.MemberUserReducer.books,
    serverError: state.MemberUserReducer.error,
    result: state.MemberUserReducer.result
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: (req) => {     
      dispatch(MemberUserActions.memberGetMyBorrowedBooks(req.cb));
    },

    memberNewBookReturnRequest: (req) => {
      dispatch(MemberUserActions.memberNewBookReturnRequest(req.bookId, req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooksPage);
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
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import {CommonUserActions} from '../../actions';

class BooksPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: true,      
      skip: 0,
      hasMoreBooks: true,
      isLoadingMore: false,
      isInitTable: true,

      books: [],
      warehouses: [],

      searchData: {
        belongToWarehouseId: '',
        ageGroup: '',
        customerRate: '',
        bookName: '',
        ISBN: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
    this.loadMoreBooks = this.loadMoreBooks.bind(this);
    this._loadBooks = this._loadBooks.bind(this);
  }

  handleChange(type, value) {
    let searchData = this.state.searchData;
    searchData[type] = value;
    this.setState({
      searchData: searchData
    });
  }

  searchBooks(opt) {
    this.setState({
      skip: 0,
      books: [],
      isInitTable: true,
      isLoadingMore: false,
      hasMoreBooks: true
    }, () => {
      this._loadBooks();
    });
  }

  componentDidMount() {
    this.props.loadWarehouses({
      cb: () => {
        this.setState({
          sendingRequest: false
        });        

        if(this.props.serverError === null) {
          let searchData = this.state.searchData;
          searchData.belongToWarehouseId = (cookie.load('belongToWarehouseId') !== "undefined") ? cookie.load('belongToWarehouseId') : this.props.warehouses[0].objectId;
          this.setState({
            warehouses: this.props.warehouses,
            searchData: searchData
          }, ()=> {
            this.refs.bookSearchForm.setState({
              belongToWarehouseId: searchData.belongToWarehouseId
            });
            this.searchBooks();
          });
        }
      }
    });
  }

  loadMoreBooks() {
    this.setState({
      isLoadingMore: true
    }, () => {
      this._loadBooks();
    });
  }

  _loadBooks() {
    let data = Object.assign(this.state.searchData);
    data.skip = this.state.skip;
    this.props.loadBooks({
      data: data,
      cb: () => this.loadMoreCallback()
    });
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

    if(this.props.books.length > 0){
      let limit = 0;
      this.props.books.forEach((book) => {
        let existObj = Find(this.state.books, (l) => {
          return l.objectId == book.objectId;
        });
        if(existObj == undefined) {
          this.state.books.push(book);
          limit++;
        }
      });

      this.setState({
        skip: this.state.skip + limit,
        books: this.state.books,
        isInitTable: false,
        isLoadingMore: false
      });
    }else{
      this.setState({
        hasMoreBooks: false,
        isInitTable: false,
        isLoadingMore: false
      });
    }
  }

  render() {
    if (!this.props) {
      return null;
    }

    let disabled = (this.state.isLoadingMore || !this.state.hasMoreBooks) ? 'disabled' : '';
    let spinnerClass = (this.state.isLoadingMore) ? 'fa fa-spinner fa-spin-custom' : 'fa fa-spinner fa-spin-custom hidden';
    let overlayClass = 'ledu-overlay'; //(this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';
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
                  <h4 className="page-title">浏览图书</h4>
                </div>
              </div>
            </div>
            
            <div className="row text-center">
              <div className="col-sm-12">
                <h3 className="m-t-20">搜索图书</h3>
                <div className="border center-block m-b-20"></div>
              </div>
            </div>      
            <div className="row">
              <div className="col-sm-12">
                {
                  (cookie.load('type') === 'admin') ?
                  (
                    <AdminBookSearchForm 
                      ref="bookSearchForm"
                      warehouses={this.state.warehouses} 
                      searchData={this.state.searchData} 
                      handleChange={this.handleChange}
                      searchBooks={this.searchBooks} />
                  ) :
                  (
                    <PublicBookSearchForm 
                      ref="bookSearchForm"
                      warehouses={this.state.warehouses} 
                      searchData={this.state.searchData} 
                      handleChange={this.handleChange}
                      searchBooks={this.searchBooks} />
                  )
                }
              </div>
            </div>
            <hr/>

            <div className="row">              
              {
                this.state.books.map((item, idx) =>
                  <div key={`book-${idx}`} className="col-md-3 col-sm-4">
                    <BookItem type="member" item={item}/>
                  </div>
                )
              }
              <div className="clearfix"></div>
              <div className={loadingClass}>
                <i className="fa fa-spinner fa-spin-custom" aria-hidden="true"></i>
              </div>               
              <div className="col-xs-12 m-b-30 text-center m-t-10">
                <button type="button" disabled={disabled} className="btn btn-default waves-effect w-md waves-light" onClick={this.loadMoreBooks}><i className={spinnerClass} aria-hidden="true"></i> {(this.state.hasMoreBooks) ? '显示更多' : '没有更多'}</button>
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

        <LeduOverlay
          overlayClass={overlayClass}
          message="请稍候..."
        />              
      </div>
    );
  }
}

BooksPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    warehouses: state.CommonUserReducer.warehouses,
    books: state.CommonUserReducer.books,
    serverError: state.CommonUserReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: (req) => {
      if(req.data.ageGroup === "") {
        delete req.data.ageGroup;
      }
      if(req.data.customerRate === "") {
        delete req.data.customerRate;
      }
      if(req.data.bookName === "") {
        delete req.data.bookName;
      }
      if(req.data.ISBN === "") {
        delete req.data.ISBN;
      }      
      dispatch(CommonUserActions.loadBooks(req.data, req.cb));
    },

    loadWarehouses: (req) => {
      dispatch(CommonUserActions.loadWarehouses(req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);
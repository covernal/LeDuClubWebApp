import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import BookSearchForm from '../../components/Widgets/LeduForm/Admin/BookSearchForm';
import BookItem from '../../components/Widgets/LeduCard/BookItem';
import LeduOverlay from '../../components/Widgets/LeduOverlay';

//Dummy data
import DummyData from '../../constants/DummyData';

class BooksPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false,
      
      skip: 0,
      hasMoreBooks: true,
      isLoadingMore: false,
      isInitTable: true,
      booksData: DummyData.BOOKS,

      searchData: null
    };

    this.searchBooks = this.searchBooks.bind(this);
    this.loadMoreBooks = this.loadMoreBooks.bind(this);
  }

  searchBooks(opt) {
    console.log(opt);
    this.setState({
      searchData: opt,
      sendingRequest: true
    }, () => {
      // call API
      this.setState({
        sendingRequest: false
      });
    });
  }

  loadMoreBooks() {

  }

  render() {
    if (!this.props) {
      return null;
    }

    let disabled = (this.state.isLoadingMore || !this.state.hasMoreBooks) ? 'disabled' : '';
    let spinnerClass = (this.state.isLoadingMore) ? 'fa fa-spinner fa-spin-custom' : 'fa fa-spinner fa-spin-custom hidden';
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
                  <h4 className="page-title">图书管理</h4>
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
                <BookSearchForm searchBooks={this.searchBooks} />
              </div>
            </div>
            <hr/>

            <div className="row">              
              {
                this.state.booksData.map((item, idx) =>
                  <div key={`book-${idx}`} className="col-md-3 col-sm-4">
                    <BookItem type="admin" item={item} />
                  </div>
                )
              }
              <div className="col-xs-12 m-b-30 text-center m-t-10">
                <button type="button" disabled={disabled} className="btn btn-default waves-effect w-md waves-light" onClick={this.loadMoreBooks}><i className={spinnerClass} aria-hidden="true"></i> {(this.state.hasMoreBooks) ? '显示更多' : '没有更多'}</button>
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

BooksPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BooksPage;

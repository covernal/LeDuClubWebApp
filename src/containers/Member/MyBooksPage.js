import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import MemberMyBookItem from '../../components/Widgets/LeduCard/MemberMyBookItem';
import LeduOverlay from '../../components/Widgets/LeduOverlay';

//Dummy data
import DummyData from '../../constants/DummyData';

class MyBooksPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false,
      
      skip: 0,
      hasMoreBooks: true,
      isLoadingMore: false,
      isInitTable: true,
      booksData: DummyData.BOOKS
    };

    this.loadMoreBooks = this.loadMoreBooks.bind(this);
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
                  this.state.booksData.map((item, idx) =>
                    <MemberMyBookItem key={`book-${idx}`} item={item} />
                  )
                }
              </div>
            </div>
            
            <div className="row">
              <div className="col-xs-12 m-b-30 text-center m-t-10">
                <button type="button" disabled={disabled} className="btn btn-default waves-effect w-md waves-light" onClick={this.loadMoreBooks}><i className={spinnerClass} aria-hidden="true"></i> {(this.state.hasMoreBooks) ? '显示更多' : '没有更多'}</button>
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

import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import TaskSearchForm from '../../components/Widgets/LeduForm/Postman/TaskSearchForm';
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import PostmanTaskRow from '../../components/Widgets/LeduCard/PostmanTaskRow';

//Dummy data
import DummyData from '../../constants/DummyData';

class MyRequestPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false,
      
      skip: 0,
      hasMoreTasks: true,
      isLoadingMore: false,
      isInitTable: true,
      tasksData: DummyData.POSTMAN_TASKS,

      searchType: ''
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.searchTasks = this.searchTasks.bind(this);
    this.loadMoreTasks = this.loadMoreTasks.bind(this);
  }

  searchTasks(type) {
    console.log(type);
    this.setState({
      searchType: type,
      sendingRequest: true
    }, () => {
      // call API
      this.setState({
        sendingRequest: false
      });
    });
  }

  loadMoreTasks() {

  }

  handleConfirm(item) {
    console.log(item);
  }

  render() {
    if (!this.props) {
      return null;
    }

    let disabled = (this.state.isLoadingMore || !this.state.hasMoreTasks) ? 'disabled' : '';
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
                  <h4 className="page-title">我的配送任务</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <TaskSearchForm searchTasks={this.searchTasks}/>
              </div>
            </div>
            <hr/>

            <div className="row">
              <div className="col-md-10">
              {
                this.state.tasksData.map((task, idx) =>
                  <PostmanTaskRow key={`task-${idx}`} item={task} handleConfirm={this.handleConfirm}/>
                )
              }
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 m-b-30 text-center m-t-10">
              <button type="button" disabled={disabled} className="btn btn-default waves-effect w-md waves-light" onClick={this.loadMoreTasks}><i className={spinnerClass} aria-hidden="true"></i> {(this.state.hasMoreTasks) ? '显示更多' : '没有更多'}</button>
              </div>
            </div>
            
            <Footer />
          </div>
        </div>

        <LeduOverlay
          overlayClass={overlayClass}
          message="请稍候..."
        />

      </div>
    );
  }
}

MyRequestPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default MyRequestPage;

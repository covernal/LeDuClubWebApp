import React,{PropTypes} from 'react';

class TaskSearchForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      requestType: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.searchRequests(this.state.requestType);
  }

  handleChange(e) {
    this.setState({
      requestType: e.target.value
    });
  }

  render() {
    return (      
      <form role="form" className="row" onSubmit={this.handleSubmit}>
        <div className="col-sm-6 col-md-4">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.requestType} onChange={this.handleChange}>
              <option value="none" disabled>选择任务类型</option>
              <option value="return">还书</option>
              <option value="borrow">借书</option>
              <option value="">全部</option>
            </select>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <button type="submit" className="btn btn-primary waves-effect waves-light"><i className="mdi mdi-magnify m-r-5"></i>显示配送任务</button>
        </div>
      </form>
    );
  }
}

export default TaskSearchForm;

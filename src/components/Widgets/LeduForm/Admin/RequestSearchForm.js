import React,{PropTypes} from 'react';

class RequestSearchForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      store: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.searchRequests(this.state.store);
  }

  handleChange(e) {
    this.setState({
      store: e.target.value
    });
  }

  render() {
    return (
      <form role="form" className="row" onSubmit={this.handleSubmit}>
        <div className="col-sm-6 col-md-4">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.store} onChange={this.handleChange}>
              <option value="" disabled>选择仓库</option>
              <option value="1">仓库1</option>
              <option value="2">仓库2</option>
            </select>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <button type="submit" className="btn btn-primary waves-effect waves-light"><i className="mdi mdi-magnify m-r-5"></i>显示配送请求</button>
        </div>
      </form>
    );
  }
}

export default RequestSearchForm;

import React,{PropTypes} from 'react';

class BookSearchForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      store: 0,
      ISBN: '',
      bookName: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.searchBooks(this.state);
  }

  handleChange(type, e) {
    let state = this.state;
    state[type] = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <form role="form" className="row" onSubmit={this.handleSubmit.bind(this)}>
        <div className="col-sm-6 col-md-4">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.store} onChange={this.handleChange.bind(this, 'store')}>
              <option value="0" disabled>仓库（必选）</option>
              <option value="1">仓库1</option>
              <option value="1">仓库2</option>
            </select>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="form-group ">
            <input className="form-control" type="text" placeholder="ISBN" value={this.state.ISBN} onChange={this.handleChange.bind(this, 'ISBN')}/>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="form-group ">
            <input className="form-control" type="text" placeholder="书名" value={this.state.bookName} onChange={this.handleChange.bind(this, 'bookName')}/>
          </div>
        </div>
        <div className="col-xs-12 m-b-30 text-center m-t-10">
          <button type="submit" className="btn btn-primary waves-effect waves-light">
            <i className="mdi mdi-magnify m-r-5"></i>搜索
          </button>
        </div>
      </form>
    );
  }
}

export default BookSearchForm;

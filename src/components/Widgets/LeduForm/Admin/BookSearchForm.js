import React,{PropTypes} from 'react';

class BookSearchForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      belongToWarehouseId: '',
      ISBN: '',
      bookName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(type, e) {
    let state = this.state;
    state[type] = e.target.value;
    this.setState(state);

    this.props.handleChange(type, e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchBooks();
  }

  render() {
    return (
      <form role="form" className="row" onSubmit={this.handleSubmit.bind(this)}>
        <div className="col-sm-6 col-md-4">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.belongToWarehouseId} onChange={this.handleChange.bind(this, 'belongToWarehouseId')}>
              <option value="" disabled>仓库（必选）</option>
              {
                this.props.warehouses.map((item, idx) =>
                  <option key={`warehouse-${idx}`} value={item.objectId}>{item.addressString}</option>
                )
              }
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

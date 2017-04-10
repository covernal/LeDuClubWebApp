import React,{PropTypes} from 'react';
import AgesRangeSelector from '../../LeduInput/AgesRangeSelector';

class BookSearchForm extends React.Component{
  constructor(props, context) {
    super(props);
    this.state = {
      belongToWarehouseId: '',
      ageGroup: '',
      customerRate: '',
      bookName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(type, e) {
    let state = this.state;
    state[type] = (type === "customerRate") ? parseFloat(e.target.value) : e.target.value;
    this.setState(state);

    this.props.handleChange(type, state[type]);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchBooks();
  }

  render() {
    return (
      <form role="form" className="row" onSubmit={this.handleSubmit.bind(this)}>
        <div className="col-sm-6 col-md-3">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.belongToWarehouseId} onChange={this.handleChange.bind(this, 'belongToWarehouseId')}>
              <option value="" disabled>所在城市</option>
              {
                this.props.warehouses.map((item, idx) =>
                  <option key={`warehouse-${idx}`} value={item.objectId}>{item.addressString}</option>
                )
              }
            </select>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="form-group">
            <AgesRangeSelector value={this.state.ageGroup} placeholder="年龄范围" handleChange={this.handleChange.bind(this, 'ageGroup')}/>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.customerRate} onChange={this.handleChange.bind(this, 'customerRate')}>
              <option value="">会员评价</option>
              <option value="5">五星</option>
              <option value="4">四星以上</option>
              <option value="3">三星以上</option>
              <option value="2">二星以上</option>
              <option value="1">一星以上</option>
            </select>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="form-group ">
            <input className="form-control" type="text" placeholder="书名" value={this.state.bookName} onChange={this.handleChange.bind(this, 'bookName')}/>
          </div>
        </div>
        
        <div className="col-xs-12 m-b-30 text-center m-t-10">
          <button type="submit" className="btn btn-primary waves-effect waves-light"><i className="mdi mdi-magnify m-r-5"></i>搜索</button>
        </div>
      </form>
    );
  }
}

export default BookSearchForm;

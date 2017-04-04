import React,{PropTypes} from 'react';

class BookSearchForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      city: '',
      ageRange: '',
      reviews: '',
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
        <div className="col-sm-6 col-md-3">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.city} onChange={this.handleChange.bind(this, 'city')}>
              <option value="" disabled selected>所在城市</option>
              <option value="1">默认选择该用户所属仓库</option>
              <option value="2">青岛</option>
              <option value="3">上海</option>
            </select>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.ageRange} onChange={this.handleChange.bind(this, 'ageRange')}>
              <option value="" disabled>年龄范围</option>
              <option value="1">3-5岁</option>
              <option value="2">6-8岁</option>
              <option value="3">9-12岁</option>
            </select>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.reviews} onChange={this.handleChange.bind(this, 'reviews')}>
              <option value="">会员评价</option>
              <option value="1">五星</option>
              <option value="2">四星以上</option>
              <option value="3">三星以上</option>
              <option value="4">二星以上</option>
              <option value="5">一星以上</option>
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

import React,{PropTypes} from 'react';
import parsley from 'parsleyjs';
import $ from 'jquery';

class BookEditForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      store: '',
      bookName: '',
      ISBN: '',
      barCode: '',
      pages: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();    
    let validation = $('#book-form').parsley().validate();
    console.log(validation);
    if(validation != true) {
      return;
    }

    this.props.saveBook(this.state);
  }      

  handleChange(type, e) {
    let state = this.state;
    state[type] = e.target.value;
    this.setState(state);
  }

  render() {
    return (      
      <form className="form-horizontal" action="#" id="book-form" data-parsley-validate noValidate onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <div className="col-xs-12">
            <select className="selectpicker form-control show-tick" data-style="btn-default" required value={this.state.store} onChange={this.handleChange.bind(this, 'store')}>
              <option value="" disabled>所属仓库</option>
              <option value="1">仓库一</option>
              <option value="1">仓库二</option>
            </select>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required placeholder="书名" value={this.state.bookName} onChange={this.handleChange.bind(this, 'bookName')}/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required placeholder="ISBN" value={this.state.ISBN} onChange={this.handleChange.bind(this, 'ISBN')}/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" placeholder="条形码（可选）" value={this.state.barCode} onChange={this.handleChange.bind(this, 'barCode')}/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required placeholder="页数" value={this.state.pages} onChange={this.handleChange.bind(this, 'pages')}/>
          </div>
        </div>

        <div className="col-xs-12">
          <div className="form-group">
            <select className="selectpicker form-control show-tick" data-style="btn-default" defaultValue="0">
              <option value="0" disabled>年龄范围</option>
              <option value="1">3-5岁</option>
              <option value="1">6-8岁</option>
              <option value="2">9-12岁</option>
            </select>
          </div>
        </div>

        <div className="col-xs-12">
          <div className="form-group">
            <select className="selectpicker form-control show-tick" data-style="btn-default" defaultValue="0">
              <option value="0" disabled>语言</option>
              <option value="1">英语</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <textarea className="form-control" rows="10" placeholder="编辑评论"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-4">
            <div className="text-center m-b-30">
              <button type="submit" className="btn btn-primary btn-block waves-effect waves-light">保存修改</button>
            </div>
          </div>
        </div>        
      </form>
    );
  }
}

export default BookEditForm;

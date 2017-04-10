import React,{PropTypes} from 'react';
import parsley from 'parsleyjs';
import 'parsleyjs/dist/i18n/zh_cn';
import $ from 'jquery';
import AgesRangeSelector from '../../LeduInput/AgesRangeSelector';

window.Parsley.setLocale('zh-cn');

class BookEditForm extends React.Component{
  constructor(props, context) {
    super(props);
    this.state = {
      belongToWarehouseId: ((this.props.book) ? this.props.book.belongToWarehouseId : ''),
      bookName: ((this.props.book) ? this.props.book.bookName:  ''),
      ISBN: ((this.props.book) ? this.props.book.ISBN:  ''),
      barCode: ((this.props.book) ? this.props.book.barCode:  ''),
      numOfPages: ((this.props.book) ? this.props.book.numOfPages:  ''),
      ageGroup: ((this.props.book) ? this.props.book.ageGroup:  ''),
      language: ((this.props.book) ? this.props.book.language:  ''),
      editorReview: ((this.props.book) ? this.props.book.editorReview : '')
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();    
    let validation = $('#book-form').parsley().validate();
    if(validation != true) {
      return;
    }

    this.props.saveBook(this.state);
  }      

  handleChange(type, e) {
    let state = this.state;
    state[type] = (type === "numOfPages") ? parseInt(e.target.value, 10) : e.target.value;
    this.setState(state);
  }

  render() {
    return (      
      <form className="form-horizontal" action="#" id="book-form" data-parsley-validate noValidate onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <div className="col-xs-12">
            <select className="selectpicker form-control show-tick" data-style="btn-default" required value={this.state.belongToWarehouseId} onChange={this.handleChange.bind(this, 'belongToWarehouseId')}>
              <option value="" disabled>所属仓库</option>
              {
                this.props.warehouses.map((item, idx) =>
                  <option key={`warehouse-${idx}`} value={item.objectId}>{item.addressString}</option>
                )
              }
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
            <input className="form-control" type="text" required placeholder="页数" value={this.state.numOfPages} onChange={this.handleChange.bind(this, 'numOfPages')}/>
          </div>
        </div>

        <div className="col-xs-12">
          <div className="form-group">
            <AgesRangeSelector value={this.state.ageGroup} required={true} placeholder="年龄范围" handleChange={this.handleChange.bind(this, 'ageGroup')}/>
          </div>
        </div>

        <div className="col-xs-12">
          <div className="form-group">
            <select className="selectpicker form-control show-tick" data-style="btn-default" required value={this.state.language} onChange={this.handleChange.bind(this, 'language')}>
              <option value="" disabled>语言</option>
              <option value="english">英语</option>
              <option value="chinese">中国语</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <textarea className="form-control" rows="10" placeholder="编辑评论" value={this.state.editorReview} onChange={this.handleChange.bind(this, 'editorReview')}></textarea>
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

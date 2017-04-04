import React,{PropTypes} from 'react';
import ReactStars from 'react-stars';
import parsley from 'parsleyjs';
import $ from 'jquery';

class BookCommentForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      rating: 0,
      comment: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let validation = $('#comment-form').parsley().validate();
    if(validation != true) {
      return;
    }    

    this.props.handleComment(this.state);
  }

  handleChange(type, e) {
    let state = this.state;
    if(type === "comment") {
      state[type] = e.target.value;
    }else {
      state["rating"] = type;
    }
    this.setState(state);
  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} data-parsley-validate id="comment-form">
        <div className="form-group">
          <div className="col-xs-12">
            <textarea className="form-control" rows="3" placeholder="我说几句" required value={this.state.comment} onChange={this.handleChange.bind(this, 'comment')}></textarea>
            <ReactStars count={5} size={20} value={this.state.rating} onChange={(v)=>this.handleChange(v, 'rating')}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="text-center m-b-30">
              <button type="submit" className="btn btn-default btn-block waves-effect waves-light">发表评论和打分</button>
            </div>
          </div>
        </div>                        
      </form>
    );
  }
}

export default BookCommentForm;

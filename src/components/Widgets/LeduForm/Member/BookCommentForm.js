import React,{PropTypes} from 'react';

class BookCommentForm extends React.Component{
  render() {
    return (
      <form className="form-horizontal" action="#">
        <div className="form-group">
          <div className="col-xs-12">
            <textarea className="form-control" rows="3" placeholder="我说几句"></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="text-center m-b-30">
              <button type="submit" className="btn btn-default btn-block waves-effect waves-light">发表评论</button>
            </div>
          </div>
        </div>                        
      </form>
    );
  }
}

export default BookCommentForm;

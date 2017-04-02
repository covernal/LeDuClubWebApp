import React,{PropTypes} from 'react';

class BookImageAdder extends React.Component{
  render() {
    return (
      <div className="col-md-4">
        <div className="text-center card-box">
          <div className="member-card">
            <div className="thumb-xl member-thumb m-b-10">
              <img src="/assets/images/1.jpg" className="img-thumbnail" alt="profile-image"/>
            </div>
            <p className="text-muted font-13 m-t-20">
              <button type="submit" className="btn btn-default btn-block waves-effect waves-light">添加图片</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default BookImageAdder;

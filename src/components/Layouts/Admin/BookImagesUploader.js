import React,{PropTypes} from 'react';
// import {Uploader} from 'react-file-upload';

class BookImagesUploader extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      imagesData: this.props.images,
      sendingRequest: false
    };

    // this.saveBook = this.saveBook.bind(this);
  }

  render() {
    let images = [];
    if(this.state.imagesData) {
      this.state.imagesData.forEach((image, idx) => {
        images.push(
          <div key={`img-${idx}`} className="thumb-xl member-thumb m-b-10">
            <img src="/assets/images/1.jpg" className="img-thumbnail" alt="profile-image"/>
          </div>
        );
      });
    }

    return (
      <div className="col-md-4">
        <div className="text-center card-box">
          <div className="member-card">
            {images}            
            <p className="text-muted font-13 m-t-20">
              <button type="submit" className="btn btn-default btn-block waves-effect waves-light">添加图片</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default BookImagesUploader;

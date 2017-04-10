import React,{PropTypes} from 'react';
import $ from 'jquery';
import LeduOverlay from '../../Widgets/LeduOverlay';

let AV = global.AV;
class BookImagesUploader extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      imagesData: this.props.images,
      sendingRequest: false
    };

    this.handleSelectedFiles = this.handleSelectedFiles.bind(this);
    this.handleOpenFiles = this.handleOpenFiles.bind(this);
  }

  handleOpenFiles() {
    $('#file-input').trigger('click');
  }

  handleSelectedFiles(e) {
    let _this = this;
    let files = e.target.files;
    let images = [];
    let uploaded = 0;
    let i = 0;

    this.setState({
      sendingRequest: true
    }, () => {
      for (i=0; i<files.length; i++) {
        let leancloudFile = new AV.File(files[i].name, files[i]);
        leancloudFile.save().then((res) => {
          console.log(res.attributes.url);
          images.push(res.attributes.url);
          uploaded++;
          if(uploaded === files.length) {
            _this.setState({
              sendingRequest: false,
              imagesData: images
            });

            _this.props.setImages(images);
          }
        });
      }
    });
  }

  render() {
    let overlayClass = (this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';

    let images = [];
    if(this.state.imagesData) {
      this.state.imagesData.forEach((image, idx) => {
        images.push(
          <div key={`img-${idx}`} className="member-thumb m-b-10">
            <img src={image} className="img-thumbnail" alt="profile-image" style={{width: "100%"}}/>
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
              <button className="btn btn-default btn-block waves-effect waves-light" onClick={this.handleOpenFiles}>添加图片</button>
              <input id="file-input" type="file" name="name" accept="image/*" multiple style={{opacity:"0"}} onChange={this.handleSelectedFiles}/>
            </p>
          </div>
        </div>
        <LeduOverlay
          overlayClass={overlayClass}
          message="请稍候..."
        />
      </div>
    );
  }
}

export default BookImagesUploader;

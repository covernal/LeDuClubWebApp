import React,{PropTypes} from 'react';
import $ from 'jquery';
import swal from 'sweetalert';
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
    this.deleteImage = this.deleteImage.bind(this);
  }

  handleOpenFiles() {
    $('#file-input').trigger('click');
  }

  handleSelectedFiles(e) {
    let _this = this;
    let files = e.target.files;
    let images = this.state.imagesData;
    let uploaded = 0;
    let i = 0;

    this.setState({
      sendingRequest: true
    }, () => {
      for (i=0; i<files.length; i++) {
        let leancloudFile = new AV.File(files[i].name, files[i]);
        leancloudFile.save().then((res) => {
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

  deleteImage(image) {
    console.log(image);
    let _this = this;
    swal({
      title: "你确定?",
      text: "您将无法恢复图像文件!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "是的, 删除它!",
      cancelButtonText: "取消",
      closeOnConfirm: true
    },
    function(){
      let images = [];
      _this.state.imagesData.forEach((img, idx) => {
        if(img !== image) {
          images.push(img);
        }
      });
      _this.setState({
        imagesData: images
      });
      _this.props.setImages(images);
    });
  }

  render() {
    let overlayClass = (this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';

    let images = [];
    if(this.state.imagesData) {
      this.state.imagesData.forEach((image, idx) => {
        images.push(
          <div key={`img-${idx}`} className="member-thumb m-b-10">
            <a className="img-delete-btn" onClick={()=>this.deleteImage(image)}><i className="fa fa-times"></i></a>
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

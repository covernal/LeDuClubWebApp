if (process.env.BROWSER) {
  require('./_leduOverlay.less');
}
import React, {Component, PropTypes} from 'react';

class LeduOverlay extends Component {
  render() {
    if (!this.props) {
      return null;
    }else{
      return (
        <div className={this.props.overlayClass}>
          <i className="fa fa-spinner fa-spin-custom" aria-hidden="true"></i>
          <h6>{this.props.message}</h6>
        </div>
      );
    }
  }
}

LeduOverlay.propTypes = {
  overlayClass: PropTypes.string.isRequired,
  message: PropTypes.string
};

export default LeduOverlay;

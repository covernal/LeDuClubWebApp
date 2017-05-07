import React, {Component, PropTypes} from 'react';

class Footer extends Component {
  render() {
    if (!this.props) {
      return null;
    }

    return (
      <footer className="footer text-right">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center text-muted">
              <a href="/faq" target="_blank" className="text-muted">常见问题</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="mailto:support@leduclub.com" className="text-muted">联系我们</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/about-us" target="_blank" className="text-muted">关于我们</a>&nbsp;&nbsp;&nbsp;&nbsp;© 2017 青岛爱乐读网络科技有限公司
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

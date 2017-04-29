import React,{PropTypes} from 'react';

class AgesRangeSelector extends React.Component{
  render() {
    return (
      <select className="form-control selectpicker show-tick" required={this.props.required} disabled={(this.props.disabled) ? true : false} data-style="btn-default" value={this.props.value} onChange={this.props.handleChange}>
        <option value="">{this.props.placeholder}</option>
        <option value="3-5岁">3-5岁</option>
        <option value="6-8岁">6-8岁</option>
        <option value="9-12岁">9-12岁</option>
      </select>          
    );
  }
}

export default AgesRangeSelector;

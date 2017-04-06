import React,{PropTypes} from 'react';

class AgesRangeSelector extends React.Component{
  render() {
    return (
      <select className="form-control selectpicker show-tick" data-style="btn-default" required value={this.props.value} onChange={this.props.handleChange}>
        <option value="" disabled>{this.props.placeholder}</option>
        <option value="1">3-5岁</option>
        <option value="2">6-8岁</option>
        <option value="3">9-12岁</option>
      </select>          
    );
  }
}

export default AgesRangeSelector;

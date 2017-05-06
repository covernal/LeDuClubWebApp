import React,{PropTypes} from 'react';
import moment from 'moment';
import {Link} from 'react-router';

class MembersList extends React.Component{
  render() {
    let loadingClass = (this.props.isInitTable || this.props.isInitTable == undefined) ? 'loading' : 'loading hidden';
    let rows = [];

    this.props.members.forEach((member, index) => {
      let operation = '';
      if(member.membershipStatus === "waitingForApproval") {
        operation = (<ul className="dropdown-menu"> <li><a onClick={()=>this.props.adminApproveMemberApplication(member.objectId)}>批准会员</a></li> </ul>);  
      }else {
        let startExpLink = (member.allowTrial === true) ? <li><a onClick={()=>this.props.adminConfirmMemberStartTrial(member.objectId)}>开始体验</a></li> : '';
        operation = (
          <ul className="dropdown-menu">
            {(parseInt(member.deposit, 10) > 0) ? '' : <li><a onClick={()=>this.props.adminConfirmMemberDeposit(member.objectId)}>押金支付确认</a></li>}
            {startExpLink}
            <li><a onClick={()=>this.props.adminConfirmMemberMonthlyFee(member.objectId)}>每月会员费支付</a></li>
            <li><a onClick={()=>this.props.adminEditMemberProfile(member.objectId)}>更改会员信息</a></li>
          </ul>
        );
      }

      rows.push(
        <tr key={`member-${member.objectId}`} className="">
          <td>{member.childrenAgeGroup}</td>
          <td>{member.fullName}</td>
          <td>{member.email}</td>
          <td>
            <a className="text-primary" href="">{member.deliveryAddressString}</a>
          </td>
          <td>{(member.mobilePhoneNumber) ? member.mobilePhoneNumber : '-'}</td>
          <td>{(member.membershipStatus === "confirmed") ? `¥${member.deposit}` : '-'}</td>
          <td>{(member.membershipStatus === "confirmed") ? moment(member.membershipStartDate).format('YYYY-MM-DD') : '-'}</td>
          <td>{(member.membershipStatus === "confirmed") ? moment(member.membershipExpireOn).format('YYYY-MM-DD') : '-'}</td>
          <td>
            <div className="btn-group">
              <button type="button" className="btn btn-primary btn-sm dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="false"> 操作 <span className="caret"></span> </button>
              {operation}
            </div>
          </td>
          <td>
          {
            (member.membershipStatus === "confirmed") ? (<div className="text-primary">已确认</div>) :
            (member.membershipStatus === "cancelled") ? (<div className="text-error">已取消</div>) :
            (member.membershipStatus === "waitingForApproval") ? (<div className="">等待批准</div>) :
            (member.membershipStatus === "pendingForPayment") ? (<div className="text-warning">等待付款</div>) : ''
          }
          </td>

        </tr>        
      );
    });

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card-box">

            <div className="table-responsive">
              <table className="table table-hover mails m-0 table table-actions-bar">
                <thead>
                  <tr>
                    <th>孩子年龄组</th>
                    <th>姓名</th>
                    <th>电子邮件</th>
                    <th>配送地址</th>
                    <th>手机号码</th>
                    <th>押金</th>
                    <th>加入日期</th>
                    <th>会员到期</th>
                    <th>操作</th>
                    <th>申请状态</th>
                  </tr>
                </thead>

                <tbody>
                  {rows}                  
                </tbody>
              </table>
            </div>

            <div className={loadingClass}>
              <i className="fa fa-spinner fa-spin-custom" aria-hidden="true"></i>
            </div> 
                       
          </div>
        </div>
      </div>
    );
  }
}

export default MembersList;

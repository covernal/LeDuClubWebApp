import React,{PropTypes} from 'react';
import PostmanTaskRow from '../../Widgets/LeduCard/PostmanTaskRow';

class TasksList extends React.Component{
  render() {
    if (!this.props) {
      return null;
    }

    let tasksList = [{
      taskType: 1
    }, {
      taskType: 2
    }, {
      taskType: 1
    }];

    let rows = [];
    tasksList.forEach((task, index) => {
      rows.push(
        <PostmanTaskRow taskType={task.taskType}/>
      );
    });

    return (
      <div className="row">
        <div className="col-md-10">
          {rows}
        </div>
      </div>
    );
  }
}

export default TasksList
;

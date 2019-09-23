import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Task = props => (
  <tr>
    <td>{props.task.taskName}</td>
    <td>{props.task.description}</td>
    <td>{props.task.dueDate ? props.task.dueDate.substring(0,10) : ""}</td>
    <td>
      <Link to={"/update/"+props.task._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>Delete</a>
    </td>
  </tr>
)

export default class TasksList extends Component {

  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this)

    this.state = {tasks: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tasks/')
      .then(response => {
        this.setState({ tasks: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTask(id) {
    axios.delete('http://localhost:5000/tasks/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    })
  }

  taskList() {
    return this.state.tasks.map(currentTask => {
      return <Task task = {currentTask} deleteTask={this.deleteTask} key={currentTask._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Tasks</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.taskList() }
          </tbody>
        </table>
      </div>
    )
  }
}
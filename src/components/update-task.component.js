import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class UpdateTask extends Component {

    constructor(props){
        super(props);

        this.onChangeTaskname = this.onChangeTaskname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuedate = this.onChangeDuedate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            taskName : '',
            description: '',
            duedate: new Date()
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/tasks/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              taskName: response.data.taskName,
              description: response.data.description,
              dueDate: new Date(response.data.dueDate)
            })   
          })
          .catch(function (error) {
            console.log(error);
        })
    }

    onChangeTaskname(e) {
        this.setState({
            taskName: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuedate(e) {
        this.setState({
            dueDate: e.target ? e.target.value : new Date()
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const task = {
          taskName: this.state.taskName,
          description: this.state.description,
          dueDate: this.state.dueDate
        }
        console.log(task);
        axios.post('http://localhost:5000/tasks/update/' + this.props.match.params.id, task)
            .then(res => console.log(res.data));
        window.location = '/';
    }

    render(){
        return(
            <div>
                <h3>Update Task</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Task Name:</label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.taskName}
                            onChange={this.onChangeTaskname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Due Date:</label>
                        <div>
                            <DatePicker
                            selected={this.state.dueDate}
                            onChange={this.onChangeDuedate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>    
        )
    }
}
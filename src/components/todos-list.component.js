import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

//this Todo will display single row of single element
const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            {/*this Link component refer to the edit part 
            and we are passing the prop id as an input*/}
            <Link to={"/edit/" + props.todo._id}>Edit
            </Link>
        </td>
    </tr>
)
//display what date we have in database
export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] }      //create 
    }

    //used to retrieve data from the db
    componentDidMount() {
        axios.get('http://localhost:4000/todos/').
            then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidUpdate() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({
                    todos: response.data
                });
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    todoList() {
        //calling callback func to map
        return this.state.todos.map(function (currentTodo,
            i) {
            //this component is passed into a prop
            //todo and todo contains the currentToDo
            return <Todo todo={currentTodo} key={i} />;
        });
    }
    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-stripped"
                    style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>  {/*  edit item */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
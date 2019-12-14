import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateToDo from './components/create-todo.component'
import EditToDo from './components/edit-todo.component';
import TodosList from './components/todos-list.component';
import logo from './logo.svg'

function App() {
  return (
    <Router>
      <div className="container">        {/*container is a boostrap class*/}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
            <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
          </a>
          <Link to="/" className="navbar-brand">MERN-Stack to Do App</Link>
          <div >
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">ToDo</Link>    {/* this Link routes to the localhost:3000 
                component */}
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">CreateToDo</Link>
              </li>
            </ul>
          </div>
        </nav>
        <h2>MERN STACK</h2>
        <Route path="/" exact component={TodosList} /> {/*path is a url extension that should be 
      matched by the route, when url is accessed, exact attribute displays the component described 
      we have connected the default link to the todoslist component*/}
        <Route path="/edit/:id" component={EditToDo} />               {/*here the edit is accepting a parameter in the url and  */}
        {/* that parameter is an id of a todolist that will be passed to the component EditToDo via the URL */}
        <Route path="/create" component={CreateToDo} />
      </div>

    </Router>
  );
}

export default App;

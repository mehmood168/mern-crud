import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import CreateTask from "./components/create-task.component";
import TasksList from "./components/tasks-list.component";
import Navbar from "./components/navbar.component"
import UpdateTask from "./components/update-task.component";

 
function App() {
  return (
    <Router>
      <div className = "container">
        <Navbar />
        <Route path="/" exact component={TasksList} />
        <Route path="/add" exact component={CreateTask} />
        <Route path="/update/:id" exact component={UpdateTask} />  
      </div>
    </Router>
  );
}

export default App;

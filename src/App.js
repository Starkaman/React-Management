import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/taskForm";
import Control from "./components/Search&Sort";
import List from "./components/taskList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // id : unique, name, status
      isDisplayForm: true
    };
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x100000)
      .toString(16)
      .substring(2);
  }

  generateID() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-"
    );
  }

  onToggleForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    });
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  };

  onSubmit = data => {
    var { tasks } = this.state;
    data.id = this.generateID();
    tasks.push(data);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onUpdateStatus = id => {
    var { tasks } = this.state;
    var index = this.FindIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem(tasks, JSON.stringify(tasks));
    }
  };

  FindIndex = id => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((tasks, index) => {
      if (tasks.id === id) {
        result = index;
      }
    });
    return result;
  };
  onDelete = id => {
    var { tasks } = this.state;
    var index = this.FindIndex(id);
    console.log(index)
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem(tasks, JSON.stringify(tasks));
    }
  };

  onUpdate = id =>{
    console.log(id)
  }
  render() {
    var { tasks, isDisplayForm } = this.state; // var tasks = this.state.tasks
    var elmDisplayFrom = isDisplayForm ? (
      <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} />
    ) : (
      ""
    );
    return (
      <div className="App">
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div
              className={
                isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
              }
            >
              {/* Form */}
              {elmDisplayFrom}
            </div>
            <div
              className={
                isDisplayForm
                  ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                  : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
              }
            >
              <button
                type="button"
                className="btn btn-primary dblock"
                onClick={this.onToggleForm}
              >
                <span className="fa fa-search mr-5"></span>Thêm Công Việc
              </button>
              <Control />
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <List
                    tasks={tasks}
                    onUpdateStatus={this.onUpdateStatus}
                    onDelete={this.onDelete}
                    onUpdate={this.onUpdate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

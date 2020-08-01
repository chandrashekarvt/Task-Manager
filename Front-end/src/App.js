import React from 'react';
import './App.css';
import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tasks from './containers/TasksPage/Tasks'
import CompletedTasks from './components/TaskComponents/CompletedTasks'
import NewTask from './components/TaskComponents/NewTask'
import InProgressTasks from './components/TaskComponents/InProgressTasks'
import moment from 'moment'

class App extends React.Component {

  state = {
    token: '',
  }

  updateToken = (token) => {
    this.setState({
      token: token
    })
    if (token) {
      localStorage.setItem('Token', token);
    }
  }

  logoutHandler = (history) => {
    localStorage.clear();
    this.setState({
      token: ''
    })
    localStorage.clear()
    history.push('/');

  }

  formatDate = (date) => {
    return moment(date).format("Do MMMM, YYYY")
  }


  render() {

    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={(props) => <Login {...props} updateToken={this.updateToken} />} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/tasks" component={(props) =>
            <Tasks {...props}
              token={this.state.token}
              logout={this.logoutHandler}
              formatDate={this.formatDate} />}
          />

          <Route exact path="/completed" component={(props) =>
            <CompletedTasks {...props}
              token={this.state.token}
              logout={this.logoutHandler}
              formatDate={this.formatDate} />}
          />


          <Route exact path="/new" component={(props) =>
            <NewTask {...props}
              token={this.state.token}
              logout={this.logoutHandler}
              formatDate={this.formatDate} />}
          />


          <Route exact path="/inProgress" component={(props) =>
            <InProgressTasks {...props}
              token={this.state.token}
              logout={this.logoutHandler}
              formatDate={this.formatDate} />} />

        </Router>
      </div>
    );
  }
}

export default App;

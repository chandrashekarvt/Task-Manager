import React from 'react'
import NavBarForTask from '../NavBar/NavBarForTask'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AddTaskModal from '../../components/Modal/AddTaskModal'


class CompletedTasks extends React.Component {

    state = {
        tasks_completed: [],
    }

    fetchData = ()=>{
        axios.get('http://127.0.0.1:8000/api/tasks/completed/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('Token')}`,
            }
        }).then(response => {
            this.setState({
                tasks_completed: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    deleteHandler = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('Token')}`
          }
        }).then(response => {
          this.fetchData()
        }).catch(error => {
          console.log(error)
        })
    }


    render() {

        const tasks = this.state.tasks_completed;
        const token = localStorage.getItem('Token');

        return (
            <div>
                {token ?
                    <div>
                        <AddTaskModal fetchData = {this.fetchData} />
                        <NavBarForTask owner={localStorage.getItem('owner')} logout={() => this.props.logout(this.props.history)} />
                        <nav class="navbar navbar-light navbar-expand-lg" style={{backgroundColor: "#e3f2fd"}}>
                        <Link  className="nav-link" to="/tasks">All Tasks</Link> 
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText1" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarText1">
                                <ul class="navbar-nav mr-auto">
                                    <li class="nav-item" role="presentation">
                                    <Link className="nav-link" to="/new">New</Link>
                                    </li>
                                    <li class="nav-item">
                                    <Link className="nav-link" to="/inProgress">In-Progress</Link>
                                    </li>
                                    <li class="nav-item">
                                    <Link className="nav-link  active" to="/completed">Completed</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        {this.state.tasks_completed.length>0 ?

                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '30px' }}>

                            {tasks.map((task, index) => {

                                return (

                                    <div key={index} className="card text-white bg-dark mb-3" style={{ maxWidth: '20rem', margin: '10px',boxShadow:'0px 2px 30px 1px rgba(3,0,97,1)' }}>
                                        <div className="card-header">
                                            <p style={{ margin: '0', padding: '0', fontWeight: '900', opacity: '0.4' }}>Created on {this.props.formatDate(task.date_added)}</p>
                                            <p style={{ margin: '0', padding: '0', fontWeight: '900', opacity: '0.4' }}>{task.label} TASK</p>
                                        </div>
                                        <div className="card-body" style={{ textAlign: 'center' }}>
                                            <h5 className="card-title">{task.task_content}</h5>
                                            <div>
                                                <div style={{ paddingTop: '10px' }}>
                                                    <button type="button" onClick={() => this.deleteHandler(task.id)} className="btn btn-outline-danger btn-sm">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-header">
                                         <p style={{ margin: '0', padding: '0', fontWeight: '900', display: 'inline', color: 'skyblue' }}>Completed on {this.props.formatDate(task.due_date)}</p>
                                        </div>

                                    </div>
                                );
                            })}


                        </div>: null}

                    </div> :

                    <h2 style={{ textAlign: 'center',color:'white' }}>You are not Authorized</h2>}

            </div>
        );
    }
}

export default CompletedTasks;
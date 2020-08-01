import React from 'react'
import NavBarForTask from '../NavBar/NavBarForTask'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AddTaskModal from '../../components/Modal/AddTaskModal'
import EditTaskModal from '../../components/Modal/EditTaskModal'
import moment from 'moment'


class InProgressTasks extends React.Component {

    state = {
        inProgress_tasks: [],
        task_to_edit:'',

    }

    fetchData = () => {
        axios.get('http://127.0.0.1:8000/api/tasks/inProgress/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('Token')}`,
            }
        }).then(response => {
            this.setState({
                inProgress_tasks: response.data
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

    setAsCompleteHandler = (task)=>{
        let updated_task = task
        updated_task['status'] = 'COMPLETED'
        updated_task['due_date'] = moment(new Date()).format('YYYY-MM-DD')

        axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`,updated_task,{
            headers:{
                'Authorization':`Token ${localStorage.getItem('Token')}`
            }
        }).then(response =>{
            console.log(response)
            this.fetchData()
        }).catch(error=>{
            console.log(error)
        })
    }

    handleSomethingBig = (task)=>{
        this.setState({
            task_to_edit: task,
        })
    }

    handleSomethingPrettyBig = (e)=>{
        const query = e.target.name;

        if(query){
        axios.get(`http://127.0.0.1:8000/api/tasks/${query}`,{
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        }).then(response =>{
            this.setState({
                inProgress_tasks: response.data
            })
        }).catch(error =>{
            console.log(error)
        })
    }else{
        this.fetchData()
    }

    }


    render() {
        const tasks = this.state.inProgress_tasks
        const token = localStorage.getItem('Token');
        return (
            <div>
                {token ?
                    <div>
                        <AddTaskModal fetchData={this.fetchData} />
                        <EditTaskModal task = {this.state.task_to_edit} fetchData = {this.fetchData} />

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
                                    <Link className="nav-link active" to="/inProgress">In-Progress</Link>
                                    </li>
                                    <li class="nav-item">
                                    <Link className="nav-link" to="/completed">Completed</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div>
                            <ul style={{display:'flex',justifyContent:'center',paddingTop:'10px'}} className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <p style={{fontWeight:'bold', color:'#919190'}} className="nav-link " id="pills-home-tab" role="tab" aria-controls="pills-home" aria-selected="true">Filter by:</p>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a style={{color:'#ffffff'}} onClick={this.handleSomethingPrettyBig} name="" className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">All</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a style={{color:'#00fff5'}} onClick={this.handleSomethingPrettyBig} name="personal_task" className="nav-link" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Personal</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a style={{color:'#00fff5'}} onClick={this.handleSomethingPrettyBig} name="work"  className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Work</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a style={{color:'#00fff5'}} onClick={this.handleSomethingPrettyBig} name="shopping"  className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Shopping</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a style={{color:'#00fff5'}} onClick={this.handleSomethingPrettyBig} name="others"  className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Others</a>
                            </li>
                            </ul>

                    </div>
                        {this.state.inProgress_tasks.length>0 ?


                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '30px' }}>

                            {tasks.map((task, index) => {
                                return (
                                    <>
                                    {task.status==="IN-PROGRESS" ? 
                                    <div key={index} className="card text-white bg-dark mb-3" style={{ maxWidth: '18rem', margin: '10px',boxShadow:'0px 2px 30px 1px rgba(3,0,97,1)' }}>
                                        <div className="card-header">
                                            <i data-toggle="modal" onClick={()=>this.handleSomethingBig(task)} data-target="#EditTaskModal"  style={{float:'right', cursor:'pointer',color:'lightblue',fontSize:'larger', paddingLeft:'3px'}} className="far fa-edit"></i>
                                            <p style={{margin: '0', padding: '0', fontWeight: '900', opacity: '0.4', display:"inline" }}>Created on {this.props.formatDate(task.date_added)}</p>
                                        </div>
                                        <div className="card-body" style={{ textAlign: 'center' }}>
                                            <h5 className="card-title">{task.task_content}</h5>
                                            <div>
                                                <button type="button" onClick={() => this.setAsCompleteHandler(task)} className="btn btn-outline-info">Mark as Complete</button>
                                                <div style={{ paddingTop: '10px' }}>
                                                    <button type="button" onClick={() => this.deleteHandler(task.id)} className="btn btn-outline-danger btn-sm">Remove task</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-header">
                                            Due Date: <p style={{ margin: '0', padding: '0', fontWeight: '900', display: 'inline', color: '#ff3d3d' }}>{this.props.formatDate(task.due_date)}</p>
                                        </div>

                                    </div>:null}
                                    </>
                                );
                                })}


                        </div>:null}


                    </div> :

                    <h2 style={{ textAlign: 'center',color:'white' }}>You are not Authorized</h2>}

            </div>
        );
    }
}

export default InProgressTasks;

import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import axios from 'axios'

class EditTaskModal extends React.Component {

    state = {
        task_to_be_edited:this.props.task,
        date_para : new Date(),
    }
    static getDerivedStateFromProps(props, state) {
        const task = props.task;
        // const toko = sessionStorage.getItem('Token')
        if (task) {
            return {
                task_to_be_edited: task,
            };
        }
        return null;
    }

    handleDateChange = date => {
        const new_format_date =  moment(date).format('YYYY-MM-DD');

        const task = this.state.task_to_be_edited;
        task['due_date'] = new_format_date

        this.setState({
            task_to_be_edited:task,
            date_para: date
        });
    };


    onChangeHandler = (e)=>{
        const inputs = this.state.task_to_be_edited
        inputs[e.target.name] = e.target.value;
        this.setState(inputs)
    }

    onSubmitHandler = (e)=>{
        e.preventDefault();
        const updated_task = this.state.task_to_be_edited;
        const token = localStorage.getItem('Token')
        if(token){
            axios.put(`http://127.0.0.1:8000/api/tasks/${updated_task.id}/`, this.state.task_to_be_edited,{
                headers:{
                    'Authorization':`Token ${token}`
                }
            }).then(response =>{
                this.props.fetchData();
            }).catch(error=>{
                console.log(error)
            })
        }
    }


    render() {

        return (
            <div>
                <div className="modal fade" id="EditTaskModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Edit Task</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            {/* {this.state.pop_up?
                            <div style={{textAlign:'center'}} class="alert alert-success" role="alert">
                                Task Added !
                            </div>: null} */}

                                <form onSubmit={this.onSubmitHandler} style={{textAlign:'center'}}>
                                    <div className="form-group">
                                        <label htmlFor="taskName">Task name:</label>
                                        <input onChange={this.onChangeHandler} type="text" name="task_content" value={this.state.task_to_be_edited.task_content} className="form-control" placeholder="Task..." id="taskName"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                                        </div>
                                        <select name="status" onChange={this.onChangeHandler} value={this.state.task_to_be_edited.status} className="custom-select" id="inputGroupSelect01">
                                            <option value="NEW">New</option>
                                            <option value="IN-PROGRESS">In progress</option>
                                            <option value="COMPLETED">Completed</option>
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Label</label>
                                        </div>
                                        <select name="label" onChange={this.onChangeHandler} className="custom-select" id="inputGroupSelect01" value={this.state.task_to_be_edited.label}>
                                            <option value="PERSONAL">Personal</option>
                                            <option value="WORK">Work</option>
                                            <option value="SHOPPING">Shopping</option>
                                            <option value="OTHERS">Others</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h5 style = {{textAlign:'left', color:'#8d9196'}}>Due Date : {moment(this.state.task_to_be_edited.due_date).format("Do MMMM, YYYY")}</h5>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Change Due Date :</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">
                                            <DatePicker
                                            selected={this.state.date_para}
                                            onChange={date => this.handleDateChange(date) }
                                            dateFormat="dd/MM/yyyy"
                                            />
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </form>



                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditTaskModal;
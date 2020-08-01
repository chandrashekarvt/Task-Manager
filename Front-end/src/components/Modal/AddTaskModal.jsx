import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import axios from 'axios'

class AddTaskModal extends React.Component {

    state = {

        post_data:{
            task_content: "",
            status: 'NEW',
            label: 'PERSONAL',
            due_date: moment(new Date()).format('YYYY-MM-DD')
        },

        date_para : new Date(),
        
    }

    handleDateChange = date => {
        const new_format_date =  moment(date).format('YYYY-MM-DD');

        const cred = this.state.post_data;
        cred['due_date'] = new_format_date

        this.setState({
            post_data:cred,
            date_para: date
        });
    };


    onChangeHandler = (e)=>{
        const inputs = this.state.post_data
        inputs[e.target.name] = e.target.value;
        this.setState(inputs)
    }

    onSubmitHandler = (e)=>{
        e.preventDefault();
        const token = localStorage.getItem('Token')
        if(token){
            axios.post('http://127.0.0.1:8000/api/tasks/', this.state.post_data,{
                headers:{
                    'Authorization':`Token ${token}`
                }
            }).then(response =>{
                console.log(response)
                this.props.fetchData()
            }).catch(error=>{
                console.log(error)
            })
        }
    }


    render() {
        return (
            <div>
                <div className="modal fade" id="AddTaskModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Add Task</h5>
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
                                        <input onChange={this.onChangeHandler} type="text" name="task_content" value={this.state.task_content} className="form-control" placeholder="Task..." id="taskName"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                                        </div>
                                        <select name="status" onChange={this.onChangeHandler} className="custom-select" id="inputGroupSelect01">
                                            <option value="NEW">New</option>
                                            <option value="IN-PROGRESS">In progress</option>
                                            <option value="COMPLETED">Completed</option>
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Label</label>
                                        </div>
                                        <select name="label" onChange={this.onChangeHandler} className="custom-select" id="inputGroupSelect01">
                                            <option value="PERSONAL">Personal</option>
                                            <option value="WORK">Work</option>
                                            <option value="SHOPPING">Shopping</option>
                                            <option value="OTHERS">Others</option>
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Due Date :</label>
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
                                    <button type="submit" className="btn btn-primary">Submit</button>
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

export default AddTaskModal;
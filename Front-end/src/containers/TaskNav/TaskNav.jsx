import React from 'react'
import {Link} from 'react-router-dom'

class TaskNav extends React.Component {
    render() {
        return (

            <div>
            <ul className="nav nav-tabs">

                <li className="nav-item">
                   <Link className="nav-link active" to="/tasks">All Tasks</Link> 
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/new">New</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/inProgress">in-Progress</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/completed">Completed</Link>
                </li>
            </ul>
            </div>
        );
    }
}

export default TaskNav;
import React from 'react';
import {Link} from 'react-router-dom'

const NavBarForTask = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {props.owner?<Link className="navbar-brand" to="#">{props.owner}</Link>
                :null}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    {/*
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li> */}
                </ul>

                {props.owner?
                <span className="navbar-text" style={{paddingRight:'10px'}}>
                    <button  data-toggle="modal" data-target="#AddTaskModal"  className="btn btn-outline-success">Add Task</button>
                </span>:
                null
                }

                {props.owner ? 
                <span className="navbar-text">
                    <button onClick={props.logout} className="btn btn-outline-danger">Logout</button>
                </span>:
                <span className="navbar-text">
                  <Link to="/register"><button className="btn btn-outline-primary">Register</button></Link>
                </span>
                }
            </div>
        </nav>
    );
}

export default NavBarForTask;
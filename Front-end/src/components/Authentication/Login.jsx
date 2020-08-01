import React from 'react';
import styles from './Login.module.css'
// import {Link} from 'react-router-dom'
import axios from 'axios'
import NavBarForTask from '../NavBar/NavBarForTask'



class Login extends React.Component {

    state = {
        credentials:{
            username:'',
            password:''
        },
        token:''
    }

    loginHandler =async ()=>{
        axios.post('http://127.0.0.1:8000/api/rest-auth/login/', this.state.credentials)
        .then(response =>{
            // this.setState({
            //     token:response.data.key
            // })
            this.props.updateToken(response.data.key)
            this.props.history.push("/tasks");
            localStorage.setItem('owner',this.state.credentials.username)

        }).catch(error =>{
            console.log(error)
        })
    }


    onchangeHandler = (e)=>{
        let cred = this.state.credentials;
        cred[e.target.name] = e.target.value;

        this.setState({
            credentials:cred
        })
    }

    onSubmitHandler = (e)=>{
        e.preventDefault();
        console.log(this.state.credentials)
        this.loginHandler();
    }

    render() {
        return (
            <div>
            <NavBarForTask/>
            <div className={styles.Login}>
                <h2 className={styles.center}>Login</h2>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input onChange={this.onchangeHandler} name="username" type="text" className="form-control" aria-describedby="emailHelp"/>
                    </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input onChange={this.onchangeHandler} name="password" type="password" className="form-control" />
                    </div>
                    <div className={styles.center}>
                    <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default Login;

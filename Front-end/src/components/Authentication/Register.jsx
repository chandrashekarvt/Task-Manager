import React from 'react';
import styles from './Register.module.css'
import axios from 'axios'

class Register extends React.Component {

    state = {
        credentials:{
            username: "",
            email: "",
            password1: "",
            password2: ""
        }
    }

    onChangeHandler = (e)=>{
        let cred = this.state.credentials
        cred[e.target.name] = e.target.value;
        this.setState({
            credentials:cred
        })
    }

    onSubmitHandler = (e)=>{
        e.preventDefault()
        if(this.state.credentials.password1!==this.state.credentials.password2){
            console.log("Passwords dont match son !")
        }
        else{
            axios.post('http://127.0.0.1:8000/api/rest-auth/registration/', this.state.credentials)
            .then(response=>{
                console.log(response)
                this.props.history.push('/')
            }).catch(error =>{
                console.log(error)
            })
        }
    }

    render() {
        return (
            <div className={styles.Register}>
                <h2 className={styles.center}>Register</h2>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input onChange={this.onChangeHandler} name="username" type="text" className="form-control" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input onChange={this.onChangeHandler} name="email" type="email" className="form-control" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={this.onChangeHandler} name="password1" type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Re-enter Password</label>
                        <input onChange={this.onChangeHandler} name="password2" type="password" className="form-control" />
                    </div>
                    <div className={styles.center}>
                    <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;

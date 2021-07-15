import React, { Component } from 'react';
import methods from './../../service.js';
import './../../App.css';
import './../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';

const INITIAL_STATE = {
    login: '',
    password: ''
}
export default class SignIn extends Component {

    constructor(props) {
        super(props);    
        this.state = INITIAL_STATE;
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    loginUser = event =>{
        let User = {
            login: this.state.login,
            password: this.state.password
        }
        methods.loginUser(User).then(res => {
            res.json().then(data=>{
                console.log(data)
            })
        });
    }

    render(){
        return (
            <div className="login-container">
                <div className="logo-container">   
                </div>
                <div className="child">
                    <label className="member-login">Salvus Login</label>
                    <div className="login-div">
                        <input className="input-user" type="text" name="login" value={this.state.login} onChange={this.onChange} placeholder = "User" required/>
                        <span className="focus-input"></span>
						<span className="symbol-input">
							<i className="fa fa-envelope " aria-hidden="true"></i>
						</span>
                    </div>

                    <div className="login-div" data-validate = "Password is required">
                        <input className="input-pass"  type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder = "Password"
                            minLength="8" required/>
                        <span className="focus-input"></span>
						<span className="symbol-input">
							<i className="fa fa-lock"  aria-hidden="true"></i>
						</span>
                    </div>
                    <div className="container-login-button">
                        <button className="login-button" onClick={this.loginUser}>Login</button>
                    </div> 
                    <div className="text-center">
						<span class="txt1">
							Forgot 
						</span>
						<a className="txt2" href="#">
							Username / Password?
						</a>
					</div>
                    
                    <div class="text-center c-a">
						<a class="txt2" href="#">
							Create your Account
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
                </div>
            </div>
        )
    }

}
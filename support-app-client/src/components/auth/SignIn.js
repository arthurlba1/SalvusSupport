import React, { Component } from 'react';
import methods from './../../service.js';

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
            <div className="userLogin">
                <div>
                    <label name="user">Login:</label>
                    <input type="text" name="login" value={this.state.login} onChange={this.onChange} placeholder = "Insira seu login"/>
                </div>
                <div>
                    <label name="password">Senha</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder = "Insira sua senha"/>
                </div>
                <div>
                    <button onClick={this.loginUser}>Login</button>
                </div>
            </div>
            
        )
    }

}
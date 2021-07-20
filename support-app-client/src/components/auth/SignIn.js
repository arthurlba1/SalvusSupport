import React, { Component } from 'react';
import methods from './../../service.js';
import { createBrowserHistory } from 'history';
import './../../App.css';
import './../../css/signIn.css';

const INITIAL_STATE = {
    login: '',
    password: ''
}
const history = createBrowserHistory();
export default class SignIn extends Component {

   
    constructor(props) {
        super(props);    
        this.state = INITIAL_STATE;
        this.history = history;
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
                if(data.error){
                    ///
                }else{
                    localStorage.setItem("user_data", JSON.stringify(data));
                    
                    this.history.push('/Dashboard');
                    history.go()
                }        
            })
        });
    }

    render(){
        return (
        <form>
            <div className="login-container">
                <div className="child">
                    <img className="logo" src={process.env.PUBLIC_URL + '/assets/images/salvus-logo-svg.svg'} alt="salvus logo"/> 
                    <div className="introduction-div">
                        <h1 className="text-title">
                            Bem Vindo
                        </h1>
                        <h2 className="text-subtitle">
                            Trabalhando por um sistema de saúde mais eficiente e de qualidade para todos.   
                        </h2>
                        <h3 className="text-txt-1">
                            Faça parte dessa rede de profissionais para que
                            juntos possamos melhorar o cuidado, satisfação e
                            qualidade de vida de quem mais precisa.
                        </h3>
                        <h4 className="text-txt-2">
                            Através do sistema de suporte da Salvus podemos
                            redirecionar profissionais qualificados em diferentes
                            localidades do país, de forma rápida e segura.
                        </h4>
                    </div>
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
                        <button className="login-button" type="submit" onClick={this.loginUser}>Login</button>
                    </div> 
                    <div className="text-center">
						<span class="txt1">
							Forgot 
						</span>
						<a className="txt2" href="#">
							Username / Password?
						</a>
					</div>
                    
                    <div className="text-center c-a">
						<a className="txt2" href="/SignUp">
							Create your Account
							<i className    ="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
                </div>
            </div>
        </form>
        )
    }

}
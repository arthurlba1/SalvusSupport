import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import SideBar from './SideBar';
import './../../App.css';
import './../../css/Dashboard.css';

const history = createBrowserHistory();

export default class Dashboard extends Component { 
    constructor(props){
        super(props);
        this.history = history;
        if(!localStorage.getItem("user_data")){
            this.history.push("/");
            history.go()
        }
        this.user = JSON.parse(localStorage.getItem("user_data"));
    }
    
    logOut = event => {
        localStorage.removeItem("user_data");
       
        this.history.push("/");
        history.go()
    }

    render(){
        return (
        <div className="login-container">
            <div className="children">
                <div>
                    <label className="dashboard-label">Dashboard</label>
                    <img className="user-avatar" src={"http://localhost:3001/"+ this.user.avatar}></img>
                    <label className="user-name">{this.user.name}</label>   
                    <SideBar/>
                    <button className="log-out" type="submit" onClick={this.logOut}>Log Out</button>
                </div>
            </div>
            <div className="children-2">

            </div>
        </div>
        )
    }
}
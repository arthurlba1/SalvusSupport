import React, { Component } from 'react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
export default class Dashboard extends Component { 
    constructor(props){
        super(props);
        this.history = history;
        if(!localStorage.getItem("user_data")){
            this.history.push("/");
            history.go()
        }
    }
    
    logOut = event => {
        localStorage.removeItem("user_data");
       
        this.history.push("/");
        history.go()
    }

    render(){
        return (
        <div>
            <button type="submit" onClick={this.logOut}>Log Out</button>
        </div>
        )
    }
}
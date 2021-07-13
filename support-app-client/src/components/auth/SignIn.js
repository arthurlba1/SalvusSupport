import React, { Component } from 'react';

export default class SignIn extends Component {

    constructor(props) {
        super(props);    
    }

    render(){
        return (
            <div className="userLogin">
                <input type="text" name="user"/>
                <input type="text" name="password"/>
            </div>
        )
    }

}
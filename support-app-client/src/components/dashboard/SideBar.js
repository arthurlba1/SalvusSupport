import React, { Component } from 'react';
import Profile from './Profile';
import UserFiles from './UserFiles';
import './../../css/SideBar.css'
import './../../css/Dashboard.css';

const INITIAL_STATE = {
    step: 0,
  };

export default class SideBar extends Component {
    constructor(props){
        super(props);
        this.state = INITIAL_STATE;
        this.user = JSON.parse(localStorage.getItem("user_data"));
        
    }

    back = event => {
        let value = this.state.step = 0
        this.setState({...this.state, step: value});
    }

    ProfileStep = event =>{
            let value = this.state.step = 1;
            this.setState({...this.state, step: value});
    }

    FilesStep = event => {
        let value = this.state.step = 2
        this.setState({...this.state, step: value});
    }

    formState = () => {
        if(this.state.step === 0) {
            return(
                <div>
                    <a>
                        <button className="myprofile" onClick={this.ProfileStep}>Profile</button>
                    </a>
                    <a>
                        <button className="myfiles" onClick={this.FilesStep}>My Files</button>
                    </a>
                </div>
            )
        }

        if(this.state.step === 1){
            return (
                <div>
                    <Profile/>
                    <button className="back-sidebar fa fa-long-arrow-left" aria-hidden="true" onClick={this.back}/>
                </div>
            )
        }
        if(this.state.step === 2){
            return(
                <div>
                    <UserFiles/>
                    <button className="back-sidebar fa fa-long-arrow-left" aria-hidden="true" onClick={this.back}/>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.formState()}
            </div>
        )
    }
}
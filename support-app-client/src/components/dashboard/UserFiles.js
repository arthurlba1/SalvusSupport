import React, { Component } from 'react';
import methods from '../../service';
import './../../css/Dashboard.css';
import './../../css/UserFiles.css';

const INITIAL_STATE = {
    file_content: [],
}
export default class UserFiles extends Component {
    constructor(props){
        super(props);
        this.state = INITIAL_STATE;
        this.user = JSON.parse(localStorage.getItem("user_data"));
    }

    componentDidMount() {
        
        methods.getFiles(this.user.userid).then(res => {
            res.json().then(data =>{
                 
                this.setState({...this.state, file_content: data});
            })
        })
    }

    docsList(docs) {
        return (docs.map(item => (<a className="a-transform" target="_blank" href={"http://localhost:3001/" + item.file_content}  download ={item.file_name}><li className="li-docs">{item.file_name}</li></a>)))
    }

    render() {
        return(
            <div className="files-div">
                <label className="files">Files</label>
                <ul className="files-list">
                    {this.docsList(this.state.file_content)}
                </ul>
            </div>
        )
    }
}
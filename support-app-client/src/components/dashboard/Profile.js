import React, { Component } from 'react';
import methods from './../../service.js';
import './../../css/Profile.css';
import './../../css/Dashboard.css';

const INITIAL_STATE = {
    displacement: '',
    regNumber: '',
    telephone: '',
    profission: '',
    prof_fk: '',
    speciality: [],
    specialityName: [],
  };

export default class Profile extends Component {
    
    constructor(props){
        super(props);
        this.state = INITIAL_STATE;
        this.user = JSON.parse(localStorage.getItem("user_data"));
    }

    componentDidMount() {
        
        methods.getProfInfo(this.user.prof_id_fk).then(res => {
            res.json().then(data =>{
                methods.getSpec(data.prof_fk).then(result => {
                    result.json().then(data1 => {
                        let aux = [];
                        data.spec.forEach(element => {
                            aux.push(data1.find(e => {
                                return e.specid == element
                            }))
                        });
                        console.log(data);
                        this.setState({...this.state, displacement: data.displacement, regNumber: data.regNumber, telephone: data.number, profission: data.profission,
                            speciality: data.spec, prof_fk: data.prof_fk, specialityName: aux});
                    })
                })
            }) 
        })      
    }

    specList(spec) {
        return (spec.map(item => (<li className="li-spec">{item.spec_name}</li>)))
    }

    render(){
        return (
            <div>
                <label className="user-profission">{this.state.profission}</label>
                <label className="user-gender">{this.user.gender}</label>
                <label className="user-email">{this.user.email}</label>
                <label className="user-telephone">{this.state.telephone}</label>
                <label className="user-displacement">{this.state.displacement}</label>
                <label className="spec-label">Specialties</label>
                <div className="spec-div">
                    <ul>
                        {this.specList(this.state.specialityName)}
                    </ul>
                </div>
                <label className="user-regNumber">{this.state.regNumber}</label>
                <ul>

                </ul>
            </div>
        )
    }
}
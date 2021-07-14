import React, { Component } from 'react';
import Select from 'react-select'
import methods from './../../service.js';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: '',
    name: '',
    birthDate: '',
    gender: '',
    telephone: '',
    profission: '',
    regNumber: '',
    speciality: [],
    location: '',
    displacement: '',
    avatar: null,
    step: 1,
    data: [],
    dataProf: [],
    dataSpec: []

  };

export default class SignUp extends Component {
    
    constructor(props) {
        super(props);    
        this.state = INITIAL_STATE;
    }

    componentDidMount(){
        
        methods.getProfSpec().then(res => {
            res.json().then(data => {
                this.setState({...this.state, data: data});
                let dataProf = []
                data.forEach(v => {
                    if(!dataProf.find(e => e.value === v.prof_id)){
                        dataProf.push( {label: v.prof_name, value: v.prof_id})
                    }
                })
                this.setState({...this.state, dataProf: dataProf});
            });
        });
    }
    

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    onProfChanged = event => {
        let selected = event.value;
        let availableSpec = [];
        this.state.data.forEach(v => {
            if(v.prof_id === selected){
                availableSpec.push( {label: v.spec_name, value: v.specid})
            }
        })
        this.setState({...this.state, dataSpec: availableSpec, profission: selected});
    }
    onSpecChanged = event => {
        let availableSpec = [];
        event.forEach(v => {
            availableSpec.push(v.value); 
        })
        this.setState({...this.state, speciality: availableSpec});
    }
    submitNext = event =>{
        let value = this.state.step + 1;
        this.setState({...this.state, step: value});
    }
    submitPrevious = event =>{
        let value = this.state.step - 1;
        this.setState({...this.state, step: value});
    }
    submitData = event =>{
        let value = this.state.step - 1;
        this.setState({...this.state, step: value});
    }
    submitUser = event =>{
        let User = {
            email: this.state.email,
            password: this.state.password,
            user: this.state.user,
            name: this.state.name,
            birthDate: this.state.birthDate,
            gender: this.state.gender,
            telephone: this.state.telephone,
            profission: this.state.profission,
            regNumber: this.state.regNumber,
            speciality: this.state.speciality,
            location:this.state.location,
            displacement: this.state.displacement,
            avatar: null,
        }
        methods.createUser(User).then(res => {
            console.log(res)
        });
    }
    
    
    formState = () => {
        if(this.state.step === 1){
            return (
            <div className="userForm">
                <form>
                <label>User<input type="text" value={this.state.user} name="user" placeholder="Enter your user" onChange={this.onChange}/></label>
                <label>Name<input type="text" value={this.state.name} name="name" placeholder="Enter your name" onChange={this.onChange}/></label>
                <label>Email<input type="text" value={this.state.email} name="email" placeholder="Enter your email" onChange={this.onChange}/></label>
                <label>Password<input type="password" value={this.state.password} name="password" placeholder="Enter your password" onChange={this.onChange}/></label>
                <input type="button" name="step" value="next" onClick={this.submitNext}/>
                </form>
            </div>
            ) 
        } else if(this.state.step === 2) {
            return (
                <div>
                    <form>
                    <label>Birth Date<input type="date" value={this.state.birthDate} name="birthDate" placeholder="Enter your birth date" onChange={this.onChange}/></label>
                    <label>Gender<input type="text" value={this.state.gender} name="gender" placeholder="Enter your gender" onChange={this.onChange}/></label>
                    <label>Telephone<input type="text" value={this.state.telephone} name="telephone" placeholder="Enter your telephone" onChange={this.onChange}/></label>
                    <input type="button" name="step" value="next" onClick={this.submitNext}/>
                    <input type="button" name="step" value="previous" onClick={this.submitPrevious}/>    
                    </form>
                </div>
            )
        } else if(this.state.step === 3) {
            return (
                <div>
                    <form>
                    <label>Profissão<Select name="profission" onChange={this.onProfChanged} options={this.state.dataProf}/></label>
                    <label>Register Number<input type="text" value={this.state.regNumber} name="regNumber" placeholder="Enter your register number" onChange={this.onChange}/></label>
                    <label>Especialidade<Select  isMulti name="speciality" onChange={this.onSpecChanged} options={this.state.dataSpec}/></label>
                    <label>Location<input type="text" value={this.state.location} name="location" placeholder="Enter your location" onChange={this.onChange}/></label>
                    <input type="button" name="step" value="next" onClick={this.submitNext}/>
                    <input type="button" name="step" value="previous" onClick={this.submitPrevious}/>
                    </form>
                </div>
            )
        } else if(this.state.step === 4){
            return (
                <div>
                    <form>
                    <label>Displacement<input type="text" value={this.state.displacement} name="displacement" placeholder="Enter your displacement" onChange={this.onChange}/></label>
                    <input type="button" name="step" value="next" onClick={this.submitNext}/>
                    <input type="button" name="step" value="previous" onClick={this.submitPrevious}/>
                    </form>
                </div>
            )
        } else if(this.state.step === 5){
            return (
                <div>
                    <form>
                    <label>Documents and certificates<input type="text" value={this.state.displacement} name="Documents" placeholder="upload files" onChange={this.onChange}/></label>
                    <input type="button" name="step" value="submit" onClick={this.submitUser}/>
                    <input type="button" name="step" value="previous" onClick={this.submitData}/>
                    </form>
                </div>
            )
        }
    }

    render(){
        return (this.formState());
    }

}
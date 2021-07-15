import React, { Component } from 'react';
import Select from 'react-select'
import methods from './../../service.js';
import Util from '../../commons/Utils.js';
import InputMask from "react-input-mask";

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
    dataSpec: [],
    validEmail: false
  };

const genders = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Feminino', label: 'Feminino' },
    { value: 'Outro', label: 'Prefiro não dizer' },
    { value: 'Outro', label: 'Outro' }
  ]
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
    }
    onChangeEmail = event => {
        this.setState({ [event.target.name]: event.target.value, validEmail: Util.validEmail(event.target.value)});
    }
    onChangeGender = event => {
        let selected = event.value;
        this.setState({...this.state, gender: selected});
    }
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
                    <div>
                        <label>Usúario</label>
                        <input type="text" value={this.state.user} name="user" placeholder="Insira o usúario" onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>Nome Completo</label>
                        <input type="text" value={this.state.name} name="name" placeholder="Insira seu nome completo" onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>E-mail</label>
                        <input type="text" value={this.state.email} name="email" placeholder="Insira seu e-mail" onChange={this.onChangeEmail}/>
                        {!this.state.validEmail && <p>Email inválido</p>}
                    
                    </div>
                    <div>
                        <label>Senha</label>
                        <input type="password" value={this.state.password} name="password" placeholder="Insira sua senha" onChange={this.onChange}/>
                    </div>
                    <input type="button" name="step" value="next" onClick={this.submitNext}/>
                </form>
            </div>
            ) 
        } else if(this.state.step === 2) {
            return (
                <div>
                <form>
                    <div>
                        <label>Data de nascimento</label>
                        <input type="date" value={this.state.birthDate} name="birthDate" placeholder="Insira sua data de nascimento" onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>Gênero</label>
                        <Select name="gender" placeholder="Como você se identifica ?" onChange={this.onChangeGender} options={genders}/>
                    </div>
                    <div>
                        <label>Telephone</label>
                        <InputMask mask="(99)99999-9999" value={this.state.telephone} name="telephone" placeholder="Qual seu número ?" onChange={this.onChange}/>
                    </div>
                    <input type="button" name="step" value="previous" onClick={this.submitPrevious}/>   
                    <input type="button" name="step" value="next" onClick={this.submitNext}/> 
                </form>
                </div>
            )
        } else if(this.state.step === 3) {
            return (
                <div>
                <form>
                    <div>
                        <label>Profissão</label>
                        <Select name="profission" placeholder="Qual sua profissão ?" onChange={this.onProfChanged} options={this.state.dataProf}/>
                    </div>
                    <div>
                        <label>Register Number</label>
                        <input type="text" value={this.state.regNumber} name="regNumber" placeholder="Enter your register number" onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>Especialidade</label>
                        <Select isMulti name="speciality" onChange={this.onSpecChanged} options={this.state.dataSpec}/>
                    </div>
                    <div>
                        <label>Location</label>
                        <input type="text" value={this.state.location} name="location" placeholder="Enter your location" onChange={this.onChange}/>
                    </div>
                    <input type="button" name="step" value="previous" onClick={this.submitPrevious}/>
                    <input type="button" name="step" value="next" onClick={this.submitNext}/>
                </form>
                </div>
            )
        } else if(this.state.step === 4){
            return (
                <div>
                <form>
                    <div>
                        <label>Displacement</label>
                        <input type="text" value={this.state.displacement} name="displacement" placeholder="Enter your displacement" onChange={this.onChange}/>
                    </div>
                    <input type="button" name="step" value="previous" onClick={this.submitPrevious}/>
                    <input type="button" name="step" value="next" onClick={this.submitNext}/>
                </form>
                </div>
            )
        } else if(this.state.step === 5){
            return (
                <div>
                <form>
                    <div>
                        <label>Documents and certificates</label>
                        <input type="text" value={this.state.displacement} name="Documents" placeholder="upload files" onChange={this.onChange}/>
                    </div>
                    <input type="button" name="step" value="previous" onClick={this.submitData}/>
                    <input type="button" name="step" value="submit" onClick={this.submitUser}/>
                </form>
                </div>
            )
        }
    }

    render(){
        return (this.formState());
    }

}
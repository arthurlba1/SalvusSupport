import React, { Component } from 'react';
import Select from 'react-select'
import methods from './../../service.js';
import Util from '../../commons/Utils.js';
import InputMask from "react-input-mask";
import './../../css/signUp.css';
import './../../App.css';

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
    validEmail: false,
    previewAvatar: null,
    docs: [],

  };

const genders = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Feminino', label: 'Feminino' },
    { value: 'Outro', label: 'Prefiro não dizer' },
    { value: 'Outro', label: 'Outro' }
  ]

  const selectStyle = {
    control: (styles, state) => ({
        ...styles,
        boxShadow: 'none',
        backgroundColor: '#e6e6e6',
        border: 'none',
        width: '260px',
        height: '50px',
        padding: '0 30px 0 0px',
        borderRadius: '25px',
    }),
    option: (provided, state) => ({
        ...provided,
        FocusEvent: state.data.FocusEvent,
        border: state.data.border,
        outline: state.data.outline,
        backgroundColor: state.data.backgroundColor,
        color: state.isSelected ? '#57b846' : '#666666',
        font: state.data.fontFamily, 
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: state.data.color,
    }),
    menuPortal: provided => ({
        ...provided, 
        zIndex: 1, 
        fontFamily: 
        'Poppins-Medium'}),
    menu: provided => ({ 
        ...provided, 
        zIndex: 1 
    }),
    multiValueLabel: provided => ({
        ...provided,
        zIndex: 5, 
        fontFamily: 'Poppins-Medium', 
        fontSize: '15px',
        position: 'relative',
        textAlign: 'center',
        color: '#666666',
        width: '100%',
    }),
  }

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
        if(this.state.step < 5){
            let value = this.state.step + 1;
            this.setState({...this.state, step: value});
        }
    }
    submitButtonProgress = event => {
        this.setState({...this.state, step: Number(event.target.value)});
    }
    submitPrevious = event =>{
        if(this.state.step > 1){
            let value = this.state.step - 1;
            this.setState({...this.state, step: value});
        }
    }
    submitData = event =>{
        let value = this.state.step - 1;
        this.setState({...this.state, step: value});
    }
    submitUser = event =>{
        let User = new FormData() 
        
        User.append("email", this.state.email)
        User.append("password", this.state.password)
        User.append("user", this.state.user)
        User.append("name", this.state.name)
        User.append("birthDate", this.state.birthDate)
        User.append("gender", this.state.gender)
        User.append("telephone", this.state.telephone)
        User.append("profission", this.state.profission)
        User.append("regNumber", this.state.regNumber)
        User.append("speciality", this.state.speciality)
        User.append("location", this.state.location)
        User.append("displacement", this.state.displacement)
        User.append("avatar", this.state.avatar)
        
        methods.createUser(User).then(res => {
            console.log(res)
        });
    }
    avatarSelectedHandler = event => {
        this.setState({...this.state, avatar: event.target.files[0], previewAvatar: URL.createObjectURL(event.target.files[0])});
    }
    docsSelectedHandler = event => {
        let docs = this.state.docs;
        docs.push(event.target.files[0]);
        this.setState({...this.state, docs:docs});
    }
    removeDoc(name){
        let docs = this.state.docs;
        docs = docs.filter(e => {
            return e.name !== name
        }) 
        this.setState({...this.state, docs:docs});
    }
    docsList(docs) {
        let data = (docs.map(item =>(<li className="li-docs" id="item.name">{item.name}<span className="span-docs" style={{color:"#red", cursor: "pointer"}} onClick={this.removeDoc.bind(this, item.name)}>x</span></li>)))
        return data
        
    }

    formState = () => {
        if(this.state.step === 1){
            return (
            <form>    
                <div>
                    <div className="register-div">
                        <input className="input-reg" type="text" value={this.state.user} name="user" placeholder="User" onChange={this.onChange}/>
                        <span className="focus-input"></span>
                        <span className="symbol-input">
                            <i class="fa fa-user" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div className="register-div">
                        <input className="input-fullname" type="text" value={this.state.name} name="name" placeholder="Full Name" onChange={this.onChange} />
                        <span className="focus-input"></span>
                        <span className="symbol-input ">
                            <i class="fa fa-font" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div className="register-div">
                        <input className="input-email" type="text" value={this.state.email} name="email" placeholder="E-mail" onChange={this.onChangeEmail} />
                        {!this.state.validEmail}
                        <span className="focus-input"></span>
                        <span className="symbol-input ">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                    </div>

                    <div className="register-div">
                        <input className="input-password" type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.onChange} />
                        <span className="focus-input"></span>
                        <span className="symbol-input">
                            <i className="fa fa-lock"  aria-hidden="true"></i>
                        </span>
                    </div>
                    </div>
                </form>
            )
        } else if(this.state.step === 2) {
            return (
            <form>
                <div>
                    <div className="register-div">
                        <input className="input-birthdate" type="date" value={this.state.birthDate} name="birthDate" placeholder="Birth Date" onChange={this.onChange} />
                        <span className="focus-input"></span>
                        <span className="symbol-input">
                            <i class="fa fa-calendar-o" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div className="register-div">
                        <InputMask className="input-tel" mask="(99)99999-9999" value={this.state.telephone} name="telephone" placeholder="Telephone" onChange={this.onChange} />
                        <span className="focus-input"></span>
                        <span className="symbol-input">
                            <i class="fa fa-phone" aria-hidden="true"></i>
                        </span>
                    </div>   

                    <div className="register-div">
                        <Select className="input-gender" styles={selectStyle} name="gender" placeholder="Gender" onChange={this.onChangeGender} options={genders} />
                        <span className="focus-input"></span>
                        <span className="symbol-input">
                            <i class="fa fa-mars" aria-hidden="true"></i>
                        </span>
                    </div>
                    
                    <div className="space-div"/>

                </div>
            </form>
            )
        } else if(this.state.step === 3) {
            return (
            <form>
                <div>
                    <div className="register-div">
                        <Select className="input-profession" name="profission" placeholder="Profession" onChange={this.onProfChanged} options={this.state.dataProf}
                        menuPortalTarget={document.body}
                        menuPosition={'fixed'}
                        styles={selectStyle}
                        required/>
                        <span className="focus-input"></span>
                        <span className="symbol-input">
                            <i class="fa fa-address-card" aria-hidden="true"></i>
                        </span>
                    </div>
                    
                    <div className="register-div">
                        <input className="input-displacement" type="text" value={this.state.displacement} name="displacement" placeholder="Displacement" onChange={this.onChange} />
                        <span className="focus-input"></span>
                        <span className="symbol-input">
                            <i class="fa fa-car" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div className="register-div">
                        <input className="input-regnumber" type="text" value={this.state.regNumber} name="regNumber" placeholder="Register Number" onChange={this.onChange} />
                        <span className="focus-input"></span>
                        <span className="symbol-input">
                            <i class="fa fa-id-card" aria-hidden="true"></i>
                        </span>
                    </div>
                
                    <div className="register-multi">
                        <Select className="input-spec" isMulti name="speciality" placeholder="Speciality" onChange={this.onSpecChanged} options={this.state.dataSpec}
                        menuPortalTarget={document.body}
                        menuPosition={'fixed'}
                        multiValueLabel
                        multiValue={document.body}
                        styles={selectStyle} 
                        required/>
                        <span className="focus-input"></span>
                        <span className="symbol-input">
                            <i class="fa fa-list-alt" aria-hidden="true"></i>
                        </span>
                    </div>

                </div>
            </form>
            )
        }else if(this.state.step === 4){
            return (
                <div>
                    <label for="avatar" className="input-avatar">Avatar
                    <input  className="avatar-input" id="avatar" type="file" name="image" accept="image/*" multiple="false" onChange={this.avatarSelectedHandler}/> 
                    <img className="avatar-preview" src={this.state.previewAvatar}/>
                    </label>
                    <label for="file" className="input-file">Documents and Certificates
                    <input className="file-input" type="file" name='files[]' id="file" multiple="false"  accept="application/pdf,application/vnd.ms-excel" onChange={this.docsSelectedHandler}/>
                    </label>
                    <ul className="docs-div">
                        {this.docsList(this.state.docs)}
                    </ul>
                    
                </div>
            )
        }
    }

    render(){
        return (
            <div className="register-container 1">
                <div className="child register">
                <div className = "bar-div"/>
                    <div className="steps-div">
                        <button className={this.state.step === 1 ?  "step-button sb1 focus" : "step-button sb1 "} value={1} name="step" onClick={this.submitButtonProgress}>1</button>
                        <button className={this.state.step === 2 ? "step-button sb2 focus" : "step-button sb2 "}  value= {2} name="step" onClick={this.submitButtonProgress}>2</button>
                        <button className={this.state.step === 3 ? "step-button sb3 focus" : "step-button sb3 "}  value = {3}name="step" onClick={this.submitButtonProgress}>3</button>
                        <button className={this.state.step === 4 ? "step-button sb4 focus" : "step-button sb4 "}  value = {4} name="step" onClick={this.submitButtonProgress}>4</button>
                    </div>
                    <label className="member-register">Register Form</label>
                        {this.formState()}
                        <div className="container-next-button">
                            <button className="next-button" name="step" type="submit" onClick={this.state.step === 4 ? this.submitUser : this.submitNext}/>
                            <span className="focus-input"></span>
                            <span className="symbol-input">
                                <i className={this.state.step === 4 ? "fa fa-2x fa-arrow-right arrow-right b5" : "fa fa-2x fa-arrow-right arrow-right"}  aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="container-prev-button">
                            <button className="prev-button" name="step" onClick={this.submitPrevious}/>
                            <span className="focus-input"></span>
                            <span className="symbol-input">
                                <i className={this.state.step === 4 ? "fa fa-2x fa-arrow-left arrow-left b4" : "fa fa-2x fa-arrow-left arrow-left"} aria-hidden="true"></i>
                            </span>
                        </div>
                </div>
            </div>
            );
    }
}
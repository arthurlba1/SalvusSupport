import React, { Component } from 'react';
import methods from './../../service.js';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: '',
    name: '',
    birthDate: '',
    gender: '',
    telephone: '',
    cep: '',
    profission: '',
    regNumber: '',
    speciality: '',
    location: '',
    displacement: '',
    step: 1
  };


export default class SignUp extends Component {
    



    constructor(props) {
        super(props);    
        this.state = INITIAL_STATE;
    }

    //TODO COMPONENT DIDMOUNT
    componentDidMount(){
        //call static get methods 
    }
    onChange = event => {
      
        this.setState({ [event.target.name]: event.target.value });
      };

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
    
    
    formState = () => {
        if(this.state.step == 1){
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
        } else if(this.state.step == 2) {
            return (
                <div>
                    <form>
                    <label>Birth Date<input type="date" value={this.state.birthDate} name="birthDate" placeholder="Enter your birth date" onChange={this.onChange}/></label>
                    <label>Gender<input type="text" value={this.state.gender} name="gender" placeholder="Enter your gender" onChange={this.onChange}/></label>
                    <label>Telephone<input type="text" value={this.state.telephone} name="telephone" placeholder="Enter your telephone" onChange={this.onChange}/></label>
                    <label>CEP<input type="text" value={this.state.cep} name="cep" placeholder="Enter your cep" onChange={this.onChange}/></label>
                    <input type="button" name="step" value="next" onClick={this.submitNext}/>
                    <input type="button" name="step" value="previous" onClick={this.submitPrevious}/>    
                    </form>
                </div>
            )
        } else if(this.state.step == 3) {
            return (
                <div>
                    <form>
                        {/*TODO change to option/multiple/dropdown*/} 
                    <label>Profission<input type="text" value={this.state.profission} name="profission" placeholder="Enter your profission" onChange={this.onChange}/></label>
                    <label>Register Number<input type="text" value={this.state.regNumber} name="regNumber" placeholder="Enter your register number" onChange={this.onChange}/></label>
                    <label>Speciality<input type="text" value={this.state.speciality} name="speciality"  placeholder="Enter your speciality" onChange={this.onChange}/></label>
                    <label>Location<input type="text" value={this.state.location} name="location" placeholder="Enter your location" onChange={this.onChange}/></label>
                    <input type="button" name="step" value="next" onClick={this.submitNext}/>
                    <input type="button" name="step" value="previous" onClick={this.submitPrevious}/>
                    </form>
                </div>
            )
        } else if(this.state.step == 4){
            return (
                <div>
                    <form>
                    <label>Displacement<input type="text" value={this.state.displacement} name="displacement" placeholder="Enter your displacement" onChange={this.onChange}/></label>
                    <input type="button" name="step" value="next" onClick={this.submitNext}/>
                    <input type="button" name="step" value="previous" onClick={this.submitPrevious}/>
                    </form>
                </div>
            )
        } else if(this.state.step == 5){
            return (
                <div>
                    <form>
                    <label>Documents and certificates<input type="text" value={this.state.displacement} name="displacement" placeholder="upload files" onChange={this.onChange}/></label>
                    <input type="button" name="step" value="next" onClick={this.submitNext}/>
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
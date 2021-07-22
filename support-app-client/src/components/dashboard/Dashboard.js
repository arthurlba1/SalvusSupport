import React, { PureComponent } from 'react';
import { createBrowserHistory } from 'history';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import SideBar from './SideBar';
import methods from './../../service.js';
import './../../App.css';
import './../../css/Dashboard.css';
import './../../css/DashboardGraphs.css';

const history = createBrowserHistory();
const INITIAL_STATE = {}

const dataT =  [
    {name: 'Medic', value: ""},
    {name: 'Audiologist', value: ""},
    {name: 'Nursing Technician', value: ""},
    {name: 'Nurse', value: ""},
    ]

const data2T =[
    {name: "Total", value: ""},
]

export default class Dashboard extends PureComponent { 
    constructor(props){
        super(props);
        this.history = history;
        this.state = INITIAL_STATE
        if(!localStorage.getItem("user_data")){
            this.history.push("/");
            history.go()
        }
        this.user = JSON.parse(localStorage.getItem("user_data"));
    }
    
    componentDidMount() {
        methods.getCount().then(res => {
            res.json().then(data => {
                let data1 = dataT;

                data1[0].value=Number(data.medic);
                data1[1].value=Number(data.audiologist);
                data1[2].value=Number(data.nurseTech);
                data1[3].value=Number(data.nurse);
                let data2 = data2T;
                data2[0].value=Number(data.total);
                this.setState({...this.state, data: data1, data2: data2})
            })
        })
    }

    logOut = event => {
        localStorage.removeItem("user_data");
       
        this.history.push("/");
        history.go()
    }
    charts = () => {
        console.log(this.state.data)
        return (
            <ResponsiveContainer width="100%" height={400} padding-top={255}>   
                <PieChart width={400} height={400}>
                    <Pie data={this.state.data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                    <Pie data={this.state.data2} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>     
        )
    }
    

    render(){
        return (
        <div className="login-container">
            <div className="children">
            <img className="dashboard-logo" src={process.env.PUBLIC_URL + '/assets/images/salvus-logo-svg.svg'} alt="salvus logo"/> 
                <div>
                    <label className="dashboard-label">Dashboard</label>
                    <img className="user-avatar" src={"http://localhost:3001/"+ this.user.avatar}></img>
                    <label className="user-name">{this.user.name}</label>   
                    <SideBar/>
                    <button className="log-out" type="submit" onClick={this.logOut}>Log Out</button>
                </div>
            </div>

            <div className="children-2">
                <label className="dashboard-name">Professionals</label>
                <div className="tables one"><label className="profission-name">Medics</label></div>
                <div className="tables two"><label className="profission-name">Audiologists</label></div>
                <div className="tables three"><label className="profission-name">Nursing technicians</label></div>
                <div className="tables four"><label className="profission-name">Nurses</label></div>      
               { this.state.data? this.charts() : ""}
            </div>  
        </div>
        )
    }
}
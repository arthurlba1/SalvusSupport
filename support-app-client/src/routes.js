import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Switch, Route} from 'react-router-dom';


export default function Routes() {
    return (
        
        <BrowserRouter>
            <Switch> 
                <Route path="/SignIn"> <SignIn/></Route>
                <Route path="/SignUp"> <SignUp/></Route>
                <Route path="/Dashboard"><Dashboard/></Route>
                <Route path="/"> {localStorage.getItem("user_data") != undefined ? <Dashboard/> : <SignIn/>} </Route>
            </Switch>
        </BrowserRouter>
    )
}
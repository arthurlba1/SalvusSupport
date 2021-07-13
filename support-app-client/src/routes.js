import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/SignIn"> <SignIn /></Route>
                <Route path="/SignUp"> <SignUp /></Route>
            </Switch>
        </BrowserRouter>
    )
}
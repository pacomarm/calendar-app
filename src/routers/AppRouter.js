import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
//   Link
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={LoginScreen}></Route>
                    <Route exact path="/" component={CalendarScreen}></Route>

                    <Redirect to="/"></Redirect>
                </Switch>
            </div>
        </Router>
    )
}

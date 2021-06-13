import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
//   Link
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const {checking, uid} = useSelector( state => state.auth );

    useEffect(() => {
        dispatch( startChecking() )
    }, [dispatch])

    if(checking){
        return <h1>Validating your credentials, please wait...</h1>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path="/login" component={LoginScreen} isAuthenticated={!!uid}></PublicRoute>
                    <PrivateRoute exact path="/" component={CalendarScreen} isAuthenticated={!!uid}></PrivateRoute>

                    <Redirect to="/"></Redirect>
                </Switch>
            </div>
        </Router>
    )
}

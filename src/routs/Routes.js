import React from 'react';
import { Route,  Switch } from 'react-router-dom';
import Admin from "../cmp/Admin";
import Login from "../cmp/Login";
import Register from "../cmp/Register";
import ProtectedRoutes from "./ProtectedRoutes"



const Routes = () => (
    
    <div className="outer">
    <div className="inner">
    <Switch>
    <Route exact path='/' component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <ProtectedRoutes path="/admin" component={Admin} /> 
    </Switch>
    </div>
    </div>
  
);

export default Routes;
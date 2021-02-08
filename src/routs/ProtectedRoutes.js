import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoutes extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('usertoken');
      
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
    }
}

export default ProtectedRoutes;
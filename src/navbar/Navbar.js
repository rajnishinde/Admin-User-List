/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { NavLink,Link, withRouter } from 'react-router-dom'


class Navbar extends Component {
  logOut = (e) => {
    e.preventDefault()
    window.localStorage.clear();
    this.props.history.push(`/login`) 
  }

  render() {
    const loginRegLink = (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
           <Link className="navbar-brand" to={"/login"}>Home</Link>
           <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
             <ul className="navbar-nav ml-auto">
               <li className="nav-item">
                 <Link className="nav-link" to={"/login"}> Login</Link>
               </li>
               <li className="nav-item">
                 <Link className="nav-link" to={"/register"}>Register</Link>
               </li>
             </ul>
           </div>
</div>
      </nav>
    )

    //After Login Navbar
    const userLink = (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
           <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
             <li className="nav-item"> 
              <a onClick={this.logOut} className="navbar__link">    
               Logout </a>
             </li>
            </ul>
          </div>
        </div>
     </nav>
    )

    return (
      <nav className="navbar">
           <NavLink
             exact
             activeClassName="navbar__link--active"
             className="navbar__link"
             to="/">
             Home
           </NavLink>
           {localStorage.usertoken ? userLink : loginRegLink}
      </nav>
    )
  }
}

export default withRouter(Navbar)
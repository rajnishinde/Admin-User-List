import React, { Component } from "react";
import URL from "./url";


const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

export default class Register extends Component {
    state = {
        fname: null,
        lname: null,
        email: null,
        password: null,
        status: "",
        errors: {
          fname: "",
          lname: "",
          email: "",
          password: "",
    
        },
      };

      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        const { name, value } = e.target;
        let errors = this.state.errors;
    
        switch (name) {
          case "fname":
            errors.fname =
              value.length < 2 ? "Full Name must be 5 characters long!" : "";
            break;
          case "lname":
            errors.lname =
              value.length < 2 ? "Full Name must be 5 characters long!" : "";
            break;
          case "email":
            errors.email = validEmailRegex.test(value)
              ? ""
              : "Email is not valid!";
            break;
          case "password":
            errors.password =
              value.length < 8 ? "Password must be 8 characters long!" : "";
            break;
          default:
            break;
        }
    
        this.setState({ errors, [name]: value });
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        const { status, ...newUser } = this.state;
        fetch(`${URL}/api/Register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            this.props.history.push(`/login`)
            this.setState({
              status: res.status,
            });
          })
          .catch(console.log);
        if (validateForm(this.state.errors)) {
          console.info("Valid Form");
        } else {
          console.error("Invalid Form");
        }
      };

    render() {
        const { errors } = this.state;
        return (
            <form noValidate onSubmit={this.handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" 
                           className="form-control" 
                           noValidate
                           placeholder="First name"
                           name="fname"
                           value={this.state.fname}
                           onChange={this.handleChange}/>
                            
                            {errors.fname.length > 0 && (
                            <span className="error">{errors.fname}</span>
                )}
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" 
                           className="form-control" 
                           noValidate
                           placeholder="Last name" 
                           name="lname"
                           value={this.state.lname}
                           onChange={this.handleChange}/>
                
                           {errors.lname.length > 0 && (
                           <span className="error">{errors.lname}</span>)}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                           noValidate 
                           className="form-control" 
                           placeholder="Enter email"
                           name="email"
                           value={this.state.email}
                           onChange={this.handleChange} />

                           {errors.email.length > 0 && (
                           <span className="error">{errors.email}</span>)}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" 
                           className="form-control" 
                           noValidate
                           placeholder="Enter password"
                           name="password"
                           value={this.state.password}
                           onChange={this.handleChange} />

                          {errors.password.length > 0 && (
                          <span className="error">{errors.password}</span>)}
                </div>

                <button type="submit" 
                        className="btn btn-dark btn-lg btn-block">
                        Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
        );
    }
}
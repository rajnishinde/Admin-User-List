import React, { Component } from "react";
import URL from "./url"



const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
        email: null,
        password: null,
        status: "",
        errors: {
          email: "",
          password: "",
        },
        
      };
    }
    

      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
         case "email":
                errors.email = validEmailRegex.test(value) ? ""
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
        const { status, ...user } = this.state;
        fetch(`${URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.status === "successful") {
              localStorage.setItem("usertoken", response.token);
               this.props.history.push("/admin");
            } 
            else {
              this.setState({
                status: response.status,
              });
            }
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

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" 
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
                           placeholder="Enter password"
                           name="password"
                           value={this.state.password}
                           onChange={this.handleChange} />

                           {errors.password.length > 0 && (
                           <span className="error">{errors.password}</span>
                )}
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                
            </form>
        );
    }
}
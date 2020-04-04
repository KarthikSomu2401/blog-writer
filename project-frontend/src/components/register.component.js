import React, { Component } from "react";
import FormErrors from "../FormErrors";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      emailId: null,
      password: null,
      confirm: null,
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    /* data.append("fullName", event.target.fullName.value);
    data.append("emailId", event.target.emailId.value);
    data.append("password", event.target.password.value); */
    var baseUrl = process.env.REACT_APP_API_URL;
    console.log(data);
    fetch(baseUrl + "/users/createuser", {
      method: "POST",
      body: data,
    }).then(function (res, err) {
      if (err) alert("Error");
      else {
        alert(res);
      }
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "emailId":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    });
  }

  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Register</h3>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>

        <div className="form-group">
          <label>Full name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            placeholder="First name"
            onChange={this.myChangeHandler}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            name="emailId"
            placeholder="Enter email address"
            onChange={this.myChangeHandler}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter password"
            onChange={this.myChangeHandler}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirm"
            placeholder="Enter confirm password"
            onChange={this.myChangeHandler}
          />
        </div>

        <button
          disabled={!this.state.formValid}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Register
        </button>

        <p className="forgot-password text-right">
          Already registered? <a href="/sign-in">sign in</a>
        </p>
      </form>
    );
  }
}

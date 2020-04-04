import React, { Component } from "react";
import { FaUserPlus } from "react-icons/fa";
import { BrowserRouter as Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class Login extends Component {
  render() {
    return (
      <form>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        <hr />
        <Button href="/register" className="btn btn-warning btn-block">
          <FaUserPlus /> Register
        </Button>
      </form>
    );
  }
}

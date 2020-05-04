import React, { Component } from "react";
import { FaUserPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
import NavHeader from "./navbar.component";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
const cookies = new Cookies();
export default class Logout extends Component {


  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      articles: [],
    };
  }
  async componentDidMount() {

    fetch(`${process.env.REACT_APP_API_URL}/users/logoutuser`, {
      credentials: "include",
    })
      .then(() => console.log('Logged Out successfully'))
      .catch(() => console.log("Logout Failed in logout component"))
      
          cookies.remove("emailId");
          cookies.remove("fullName");


  }

  render() {
    return (
      window.location.pathname = "/sign-in"
         );
  }
}

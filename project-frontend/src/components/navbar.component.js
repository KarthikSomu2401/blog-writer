import React, { Component } from "react";
import { FaSearch, FaEnvelope, FaBars } from "react-icons/fa";
import Cookies from "js-cookie";
/* import {
  NavDropdown,
  Nav,
  Button,
  Form,
  FormControl,
  Navbar,
  NavItem,
} from "react-bootstrap"; */

class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      user: {
        name: Cookies.get("fullName"),
        email: Cookies.get("emailId"),
      },
    };
  }

  /* async componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/users/userdetails`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            user: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  } */

  render() {
    const iconPath = process.env.PUBLIC_URL + "/images/";
    const { user } = this.state;
    return (
      <div>
        <nav className="mb-1 navbar navbar-expand-lg navbar-loght bg-light">
          <a className="navbar-brand nav-title" href="/dashboard">
            Structured Stories
          </a>
          <span
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-555"
            aria-controls="navbarSupportedContent-555"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <FaBars />
          </span>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-555"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link nav-title" href="/dashboard">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-title" href="/add-article">
                  Add Article
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link nav-title" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-title" href="#">
                  Pricing
                </a>
              </li> */}
              {/* <li className="nav-item">
                <span className="searchBox">
                  <input
                    className="searchInput"
                    type="text"
                    name=""
                    placeholder="Search"
                  />
                  <button className="searchButton" href="#">
                    <i className="material-icons">
                      <FaSearch />
                    </i>
                  </button>
                </span>
              </li> */}
            </ul>
            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item">
                <a className="nav-link waves-effect waves-light">
                  1 <FaEnvelope />
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link nav-title dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user.name}
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <span className="dropdown-header dropdown-header-center">
                    <img src={`${iconPath}user-profile.png`} alt="Avatar" />
                    <br />
                    {user.name}
                  </span>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/profile">
                    Profile
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/about">
                    About
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/logout-user">
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default () => (
  <div>
    <NavHeader />
  </div>
);

import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavLink } from "react-bootstrap";

export default class Dashboard extends Component {
  render() {
    return (
      <Navbar>
        <NavbarBrand>WebSiteName</NavbarBrand>
        <Nav>
          <NavLink>Home</NavLink>
          <NavLink>About</NavLink>
          <NavLink>Accout</NavLink>
          <NavLink>Logout</NavLink>
        </Nav>
      </Navbar>
    );
  }
}

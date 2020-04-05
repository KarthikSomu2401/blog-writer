import React, { Component } from "react";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavbarBrand, NavItem, Nav, NavLink } from "react-bootstrap";

export default class Dashboard extends Component {
  render() {
    return (
      <Navbar>
        <NavbarBrand>WebSiteName</NavbarBrand>
        <Nav>
          <NavLink>Home</NavLink>
          <NavLink>Page 1</NavLink>
          <NavLink>Page 2</NavLink>
          <NavLink>Page 3</NavLink>
        </Nav>
      </Navbar>
    );
  }
}

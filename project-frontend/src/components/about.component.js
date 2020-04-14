import React, { Component } from "react";
import NavHeader from "./navbar.component";

class About extends Component {
  render() {
    return (
      <div>
        <NavHeader />
        <h1>About</h1>
      </div>
    );
  }
}

export default () => (
  <div>
    <About />
  </div>
);

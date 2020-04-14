import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "../node_modules/mdbootstrap/css/bootstrap.min.css";
//import "../node_modules/mdbootstrap/css/mdb.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Dashboard from "./components/dashboard.component";
import About from "./components/about.component";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/sign-in" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

  
import React from 'react';
import { Image, Jumbotron, Button, } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class ProfileView extends Component{
  state = {
    error: null,
    isLoaded: false,
    profile: {
      email: Cookies.get("emailId"),
      birthday: "",
      city: "",
      occupation: "",
      interests: "",
      bio: "",
    },
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.userId = params.id;
    fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        let profileObj = {};
        Object.keys(data).forEach(function (item) {
          profileObj[item] = data[item];
        });
        console.log(profileObj);
        this.setState({ profile: profileObj });
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.profile),
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/profile`,
      requestOptions
    )
      .then((response) => response.json())
      .then(function (data) {
        const promise1 = new Promise(function (resolve, reject) {
          resolve();
        });
        promise1.then(function (value) {
          window.location.pathname = "/dashboard";
        });
      });
  }

render(){
    return (
        <div>
          <Jumbotron>
            <h2 style={{ textAlign: 'center' }}>Welcome  {this.state.name}</h2>
            <hr />
            <div style={Style} className="container col-md-2">
                <h2>Information</h2>
                <p><b>Name:</b>  {this.state.name}</p>
                <p><b>Email:</b>{this.state.email}</p>
                <p><b>Birthday:</b>{this.state.birthday}</p>
                <p><b>City:</b>{this.state.city}</p>
                <p><b>Occupation:</b>{this.state.occupation}</p>
                <p><b>Interests:</b>{this.state.interests}</p>
                <p><b>Bio:</b>{this.state.bio}</p>

                <Link to='/editprofile'>Edit Profile</Link>
            </div>
            <hr />   
                </Jumbotron>
            </div>
    )
}}

export { ProfileView };
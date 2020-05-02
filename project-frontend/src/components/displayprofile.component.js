import React, { Component } from "react";
import { Image, Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import NavHeader from "./navbar.component";

/* const Style = {
  backgroundColor: "#eff0f2",
  paddingTop: "0px",
};
const Style2 = {
  width: "100%",
  height: "50%",
}; */

class DisplayProfile extends Component {
  state = {
    error: null,
    isLoaded: false,
    profile: {
      _id: "",
      emailId: Cookies.get("emailId"),
      profile: {
        fullName: "",
        birthday: "",
        city: "",
        occupation: "",
        bio: "",
        tags: [],
      },
      //interest: "",
    },
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //const { params } = this.props.match;
    //this.profileId = params.id;
    fetch(`${process.env.REACT_APP_API_URL}/profile/displayprofile`, {
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
      `${process.env.REACT_APP_API_URL}/profile/editprofile/${this.profileId}`,
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

  render() {
    return (
      <div>
        <NavHeader />

        <Jumbotron>
          <h2 /* style={{ textAlign: "center" }} */>
            Welcome {this.state.profile.profile.fullName}
          </h2>
          <hr />
          <div /* style={Style} */ className="container col-md-2">
            <h2>Information</h2>
            <p>
              <b>Email: </b>
              {this.state.profile.emailId}
            </p>
            <p>
              <b>Birthday:</b>
              {this.state.profile.profile.birthday}
            </p>
            <p>
              <b>City: </b>
              {this.state.profile.profile.city}
            </p>
            <p>
              <b>Occupation: </b>
              {this.state.profile.profile.occupation}
            </p>
            {this.state.profile.profile.tags ? (
              this.state.profile.profile.tags.length > 0 ? (
                <p>
                  <b>Interests:</b>
                  {""}
                  {this.state.profile.profile.tags
                    .map((val) => val.value)
                    .join(", ")}
                </p>
              ) : (
                <span></span>
              )
            ) : (
              <span></span>
            )}
            <p>
              <b>Bio: </b>
              {this.state.profile.profile.bio}
            </p>
            <Link to={{ pathname: `/editprofile/${this.state.profile._id}` }}>
              Edit Profile
            </Link>
          </div>
          <hr />
        </Jumbotron>
      </div>
    );
  }
}

export default DisplayProfile;

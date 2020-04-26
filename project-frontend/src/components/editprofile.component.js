import React, { Component } from "react";
import NavHeader from "./navbar.component";
import ReactHtmlParser from "react-html-parser";

class EditProfile extends Component {
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
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  myChangeHandler = (event) => {
    var profile = { ...this.state.profile };
      let { name, value } = event.target;
      profile[name] = value;
    this.setState({ profile });
  };

  componentDidMount() {
    const { params } = this.props.match;
    this.email = params.email;
    fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        let profileObj = {};
        Object.keys(data).forEach(function (item) {
          profileObj[item] = data[item];
        });
        this.setState({ article: profileObj });
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
      `${process.env.REACT_APP_API_URL}/profile/editprofile`,
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
        <div className="conatiner">
          <h1> Edit Profile </h1>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="birthday"> Birthday</label>
              <input
                type="text"
                name="birthday"
                value={this.state.article.birthday}
                className="form-control"
                placeholder="Birthday"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                value={this.state.article.city}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={this.state.article.occupation}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="occupation"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interests">Interests</label>
              <input
                type="text"
                name="interests"
                value={this.state.article.interests}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="interests"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                name="bio"
                value={this.state.article.bio}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="bio"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;

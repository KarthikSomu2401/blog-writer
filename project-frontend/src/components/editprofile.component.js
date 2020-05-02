import React, { Component } from "react";
import NavHeader from "./navbar.component";
import Cookies from "js-cookie";

import CreatableMulti from "./multiselect.component";

const createOption = (label) => ({
  label,
  value: label,
});

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      profile: {
        _id: "",
        email: Cookies.get("emailId"),
        birthday: "",
        city: "",
        occupation: "",
        //interest: "",
        bio: "",
        //image:"",
        tags: [],
        inputVlaue: "",
      },
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    //this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleImageChange=this.handleImageChange(this);
  }
 /*  handleImageChange= (event) =>{
    console.log(events.target.Files[0])
    console.log(events.target.Files[0].fileName)
  } */
  handleCreate = (options) => {
    var profile = { ...this.state.profile };
    profile["tags"] = options || [];
    this.setState({ profile });
  };

  handleInputChange = (inputValue) => {
    var profile = { ...this.state.profile };
    profile["inputValue"] = inputValue;
    this.setState({ profile });
  };

  handleKeyDown = (event) => {
    var profile = { ...this.state.profile };
    if (!profile.inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        var newArt = {
          inputValue: "",
          tags: [...profile.tags, createOption(profile.inputValue)],
        };
        profile["inputValue"] = newArt.inputValue;
        profile["tags"] = newArt.tags;
        this.setState({ profile });
        event.preventDefault();
    }
  };

  myChangeHandler = (event) => {
    var profile = { ...this.state.profile };
    let { name, value } = event.target;
    profile[name] = value;
    this.setState({ profile });
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/profile/displayprofile`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.noprofile === undefined) {
          let profileObj = {};
          Object.keys(data).forEach(function (item) {
            if (data[item] === null && item === "tags") {
              profileObj[item] = [];
            } else {
              profileObj[item] = data[item];
            }
          });
          this.setState({ profile: profileObj });
        }
      });
  }

  handleSubmit(event) {
    const { params } = this.props.match;
    this.profileId = params.id;
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
          window.location.pathname = "/profile/displayprofile";
        });
      });
  }

  render() {
    return (
      <div>
        <NavHeader />
        <div className="container">
          <h1> Edit Profile </h1>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="email"> Email</label>
              <input
                type="text"
                name="email"
                value={this.state.profile.email}
                className="form-control"
                placeholder="Email"
                onChange={this.myChangeHandler}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="text"
                name="birthday"
                value={this.state.profile.birthday}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Birthday"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                value={this.state.profile.city}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={this.state.profile.occupation}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Occupation"
              />
            </div>
            {/*  <div className="form-group">
              <label htmlFor="interest">Interest</label>
              <input
                type="text"
                name="interest"
                value={this.state.profile.interest}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Your interest"
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                name="bio"
                value={this.state.profile.bio}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Say something about yourself"
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                //value={this.state.profile.image}
                onChange={
                  ( e ) => {      
                    e.preventDefault();
                    const { fields } = this.props;
                    // convert files to an array
                    const files = [ ...e.target.files ];
                    fields.image.handleChange(files);
                  }}
                  onChange={this.handleImageChange}
                className="form-control"
              /> */}
            {/* </div> */}
            <div className="form-group">
              <label htmlFor="profileTags">Interest</label>
              <CreatableMulti
                name="profileTags"
                value={this.state.profile.tags}
                inputValue={this.state.profile.inputValue}
                onChange={this.handleCreate}
                onInputChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                className="form-control"
                placeholder="Select/Create some tags you are interested in"
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

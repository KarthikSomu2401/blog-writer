import React, { Component } from "react";
import NavHeader from "./navbar.component";
import Cookies from "js-cookie";

class AddArticle extends Component {
  state = {
    error: null,
    isLoaded: false,
    article: {
      authorname: Cookies.get("fullName"),
      title: "",
      article: "",
    },
  };

  constructor(props) {
    super(props);
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.article),
    };
    fetch(`${process.env.REACT_APP_API_URL}/articles/add`, requestOptions)
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

  myChangeHandler = (event) => {
    var article = { ...this.state.article };
    let { name, value } = event.target;
    article[name] = value;
    this.setState({ article });
  };

  render() {
    return (
      <div>
        <NavHeader />
        <div className="conatiner">
          <h1> Add Article </h1>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="authorname">Author Name</label>
              <input
                type="text"
                name="authorname"
                value={this.state.article.authorname}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Author Name"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={this.state.article.title}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Article</label>
              <textarea
                name="article"
                value={this.state.article.article}
                onChange={this.myChangeHandler}
                className="form-control"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Post Article
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default () => (
  <div>
    <AddArticle />
  </div>
);

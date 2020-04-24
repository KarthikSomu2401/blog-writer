import React, { Component } from "react";
import NavHeader from "./navbar.component";
import ReactHtmlParser from "react-html-parser";
import RichTextEditor from "./richtexteditor.component";

class EditArticle extends Component {
  articleId = "";
  state = {
    error: null,
    isLoaded: false,
    article: {
      _id: "",
      authorname: "",
      title: "",
      article: "",
    },
  };

  constructor() {
    super();
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  myChangeHandler = (event) => {
    var article = { ...this.state.article };
    if (event.target === undefined) {
      let value = event;
      article["article"] = value;
    } else {
      let { name, value } = event.target;
      article[name] = value;
    }
    this.setState({ article });
  };

  componentDidMount() {
    const { params } = this.props.match;
    this.articleId = params.id;
    fetch(`${process.env.REACT_APP_API_URL}/articles/${this.articleId}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        let articleObj = {};
        Object.keys(data).forEach(function (item) {
          articleObj[item] = data[item];
        });
        this.setState({ article: articleObj });
      })
      .catch(function(err) {
        alert('The Requested Article is in use');
        window.location.pathname = "/dashboard";
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.article),
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/articles/update/${this.articleId}`,
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
          <h1> Edit Article </h1>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="authorname">Author Name</label>
              <input
                type="text"
                name="authorname"
                value={this.state.article.authorname}
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
              <label htmlFor="article">Article</label>
              <RichTextEditor
                name="article"
                value={this.state.article.article}
                onChange={this.myChangeHandler}
                className="form-control"
              />
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

export default EditArticle;

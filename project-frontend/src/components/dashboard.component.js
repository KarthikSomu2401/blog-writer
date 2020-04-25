import React, { Component, useState } from "react";
import NavHeader from "./navbar.component";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import ReactHtmlParser from "react-html-parser";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      currentPage: 1,
      postsPerPage: 10,
      articles: [],
      articlesFiltered: [],
    };
    this.handleArticleFilter = this.handleArticleFilter.bind(this);
  }

  async componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/articles/all`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            articles: result,
            articlesFiltered: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  deleteAlert(articleId) {
    confirmAlert({
      title: "Delete Confirmation",
      message: "Are you sure to delete this Article?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteArticle(articleId),
        },
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  }

  handleArticleFilter = function (event) {
    let searchVal = event.target.value;
    let filteredValues = this.state.articles.filter((article) => {
      if (searchVal === null) {
        return article;
      } else if (
        article.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        article.tags
          .map((p) => p.value)
          .join(",")
          .toLowerCase()
          .includes(searchVal.toLowerCase()) ||
        article.authorname.toLowerCase().includes(searchVal.toLowerCase())
      ) {
        return article;
      }
    });
    this.setState({ articlesFiltered: filteredValues });
  };

  deleteArticle(articleId) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/articles/${articleId}`,
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

  //pagination
  //indexOfLastPost = this.state.currentPage * this.state.postsPerPage;

  render() {
    return (
      <div>
        <NavHeader />
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="jumbotron">
                <h1>All Stories</h1>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleArticleFilter}
                    placeholder="Type to search for articles..."
                  />
                </div>
                <hr />
                {this.state.articlesFiltered.map((article, key) => (
                  <div key={key}>
                    <div className="row">
                      <div className="col-lg-8 col-md-8 inline text-break">
                        <Link
                          to={{
                            pathname: `/view/${article._id}`,
                          }}
                        >
                          <h2>{article.title}</h2>
                        </Link>
                        <span className="badge badge-secondary p-2">
                          {article.authorname}
                        </span>
                        {article.tags.length > 0 ? (
                          <p>
                            <br />
                            Tags:
                            {article.tags.map((val, key) => (
                              <span
                                key={key}
                                className="badge badge-secondary p-2"
                              >
                                {val.value}
                              </span>
                            ))}
                          </p>
                        ) : (
                          <p key={key}>
                            <br />
                            No tags
                          </p>
                        )}
                      </div>
                      <div className="col-lg-4 col-md-4 inline">
                        <span>
                          <Link
                            to={`/article/${article._id}`}
                            className="btn btn-outline-success"
                          >
                            Edit Article
                          </Link>
                        </span>
                        <span className="col-lg col-md">
                          <button
                            onClick={() => this.deleteAlert(article._id)}
                            className="btn btn-outline-danger"
                          >
                            Delete Article
                          </button>
                        </span>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="article-pre">
                          {ReactHtmlParser(article.article)}
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <Link
                          className="read-more-bt"
                          to={{
                            pathname: `/view/${article._id}`,
                          }}
                        >
                          Full Article >
                        </Link>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4 col-lg-4">
              <div className="jumbotron">
                <h1>Your Interests</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

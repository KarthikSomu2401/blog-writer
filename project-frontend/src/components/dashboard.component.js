import React, { Component } from "react";
import NavHeader from "./navbar.component";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import ReactHtmlParser from "react-html-parser";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      articles: [],
    };
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
                <hr />
                {this.state.articles.map((article, key) => (
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

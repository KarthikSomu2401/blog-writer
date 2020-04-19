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
        <div className="container container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <h1>All stories</h1>
              <hr />
              <br />
              {this.state.articles.map((article, key) => (
                <div key={key}>
                  <Link
                    to={{
                      pathname: `/view/${article._id}`,
                    }}
                  >
                    <h2 className="">{article.title}</h2>
                  </Link>
                  <div className="article-pre">
                    {ReactHtmlParser(article.article)}
                  </div>
                  <span className="badge badge-secondary p-2">
                    {article.authorname}
                  </span>
                  <div className="row my-3">
                    <div className="col-sm-2">
                      <Link
                        to={`/article/${article._id}`}
                        className="btn btn-outline-success"
                      >
                        Edit Article
                      </Link>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={() => this.deleteAlert(article._id)}
                        className="btn btn-outline-danger"
                      >
                        Delete Article
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            <div className="col-lg-4 col-lg-4">
              <h1>your interests</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

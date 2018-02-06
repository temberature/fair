import React, { Component } from "react";
import styles from "./App.css";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import CSSModules from "react-css-modules";
import classNames from "classnames/bind";

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);
let cx = classNames.bind(styles);

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/topics" component={Topics} />
            <div className={styles["mint-tabbar"] + " " + styles["is-fixed"]}>
              <NavLink to="/" activeClassName={styles["is-selected"]} className={styles["mint-tab-item"]}>
                <div className="mint-tab-item-icon">
                  <svg
                    version="1.1"
                    role="presentation"
                    width="10.285714285714286"
                    height="9.142857142857142"
                    viewBox="0 0 1152 1024"
                  >
                    <path
                      d="M992.11072 599.008v374.976a51.2 51.2 0 0 1-13.184 35.2c-8.8 9.856-19.2 14.816-31.264 14.816h-274.112v-192.896a96 96 0 0 0-96-96h-3.616a96 96 0 0 0-96 96V1024H204.59072c-12.032 0-22.464-4.96-31.264-14.848A51.2 51.2 0 0 1 160.11072 973.984V599.04c0.576-3.392 0.704-4.16 0.704-4.704L576.11072 224.16l415.296 370.144a12.096 12.096 0 0 1 0.704 4.704z m96-31.488a23.488 23.488 0 0 1-14.816 8.384c-8.224 0-13.152-1.76-16.928-5.344L576.11072 130.56 80.55872 570.56c-5.632 4.096-11.264 5.856-16.928 5.344a23.488 23.488 0 0 1-14.784-8.384L5.13472 511.072a26.144 26.144 0 0 1-4.96-17.92 22.784 22.784 0 0 1 7.776-16.416L514.89472 19.84C529.93472 6.624 555.43872 0 576.11072 0c20.672 0 30.912 6.624 45.952 19.84l172.032 155.616 181.344 162.88M992.11072 352l152.288 154.784a26.816 26.816 0 0 1 7.648 18.304 32 32 0 0 1-4.896 19.968L1104.04672 608"
                      stroke="transparent"
                    />
                  </svg>
                </div>{" "}
                <div className={styles["mint-tab-item-label"]}> OA学院</div>
              </NavLink>{" "}
              <NavLink to="/profile" activeClassName={styles["is-selected"]} className={styles["mint-tab-item"]}>
                <div className={styles["mint-tab-item-icon"]}>
                  <svg
                    version="1.1"
                    role="presentation"
                    width="9.142857142857142"
                    height="9.142857142857142"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      d="M621.28 576.48h-218.56C215.552 576.608 63.904 731.872 64 923.296v22.4C64 1023.904 215.68 1024 402.72 1024h218.56C808.32 1024 960 1021.12 960 945.664v-22.4c0.096-191.392-151.552-346.656-338.72-346.784z m-120.192-39.456c144.864-0.128 262.24-120.32 262.176-268.48C763.264 120.16 645.888 0 501.12 0c-69.6 0-136.32 28.32-185.504 78.688A271.456 271.456 0 0 0 238.848 268.48c0 148.256 117.44 268.48 262.24 268.48v0.064z"
                      stroke="transparent"
                    />
                  </svg>
                </div>{" "}
                <div className={styles["mint-tab-item-label"]}> 个人中心</div>
              </NavLink>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

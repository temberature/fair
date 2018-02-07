import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import classNames from "classnames/bind";
import Course from './course/Course'
import TabBar from './components/tabbar/TabBar'
import EntryForm from './entryform/EntryForm'
import { ActionSheet, WingBlank, Button, Toast } from "antd-mobile";
import "./App.less";

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

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/course/:id" component={Course} />
            <Route path="/course/:id/entryForm" component={EntryForm} />
            <Route exact path="/" component={TabBar} />
            <Route path="/profile" component={TabBar} />
            
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

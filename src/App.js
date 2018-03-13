import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./home/Home";
import Profile from "./profile/Profile";
// import classNames from "classnames/bind";
import Course from "./course/Course";
import TabBar from "./components/tabbar/TabBar";
import EntryForm from "./entryform/EntryForm";
import "./App.less";
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";
import MyCourses from "./mycourses/MyCourses";
import About from "./about/About";
import Invitation from "./invitation/Invitation";
import Settings from "./settings/Settings";
import ScrollToTop from "./components/ScrollToTop";
import Swarming from "./swarming/Swarming";
import Agenda from "./agenda/Agenda";

class App extends React.Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/course/:id" component={Course} />
            <Route path="/swarming" component={Swarming} />
            <Route path="/agenda/:id" component={Agenda} />
            <Route exact path="/course/:id/entryForm" component={EntryForm} />
            <Route exact path="/" component={TabBar} />
            <Route path="/profile" component={TabBar} />
            <Route path="/swarming" component={TabBar} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/me/courses" component={MyCourses} />
            <Route path="/about" component={About} />
            <Route path="/invitation" component={Invitation} />
            <Route path="/settings" component={Settings} />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;

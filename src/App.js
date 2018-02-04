import React, { Component } from "react";
import logo from "./logo.svg";
import banner from "./assets/banner.png";
import "./App.css";
import { Button } from "antd-mobile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import Img from "react-image";
import { ListView } from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";

function CourseList(props) {
  const courses = props.courses;
  const courseItems = courses.map(course => (
    <li key={course.course_id} className="course">
      {/* <img className="banner" src={require(course.event_frontcover_filepath)} /> */}
      <img
        width="87"
        height="130"
        className="cover"
        src={course.event_frontcover_filepath}
        alt=""
      />
      <div className="info">
        <div className="name">{course.title}</div>
        <div className="time">
          <label htmlFor="">时间：</label>
          {course.event_start_date}
        </div>
        <div className="address">
          <label htmlFor="">地点：</label>
          {course.address}
        </div>
        <div className="quota">
          <label htmlFor="">人数：</label>
          限{course.max_attendence}人
        </div>
        <div className="period">
          <img
            v-if="period === 0"
            src="../assets/home/img/period_enrolling.png"
            alt=""
          />
          <img
            v-else-if="period === 1"
            src="../assets/home/img/period_ongoing.png"
            alt=""
          />
          <img
            v-else-if="period === 2"
            src="../assets/home/img/period_finish.png"
            alt=""
          />
        </div>
      </div>
    </li>
  ));
  return <ul>{courseItems}</ul>;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: [] };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    axios
      .get(
        "https://easy-mock.com/mock/5a3c67260df23b51b3614cfb/RetrieveEventServlet"
      )
      .then(response => {
        console.log(response);
        this.setState(() => ({
          courses: response.data
        }));
      });
  }

  handleClick() {
    console.log(11);
  }

  render() {
    return (
      <div className="home">
        <header>
          <img className="banner" src={require("./assets/banner.png")} />
          {/* <img className="banner" src="assets/banner.png" /> */}
        </header>
        <main>
          <section className="courses">
            <header className="tabs">
              <div className="tabs-list">
                <a onClick={this.handleClick}>
                  <span>全部</span>
                </a>
                <a>
                  <span>报名中</span>
                </a>
                <a>
                  <span>哲学</span>
                </a>
                <a>
                  <span>艺术</span>
                </a>
                <a>
                  <span>历史</span>
                </a>
                <a>其他</a>
              </div>
            </header>
            <CourseList courses={this.state.courses} />
            <mt-spinner v-if="loading" type="snake" />
          </section>
        </main>
      </div>
    );
  }
}

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

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//         <Button>Start</Button>
//       </div>
//     );
//   }
// }

export default App;

/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from "react";
import { ListView } from "antd-mobile";
import axios from "../utils/customAxios";
import "./MyCourses.less";
import { Link } from "react-router-dom";
import Moment from "moment";
import Period from "../components/period/Period";
import classNames from "classnames/bind";

class Home extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      type: 0
    };
  }
  componentDidMount() {
    axios.get("/RetrieveMyEventsServlet").then(response => {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.setState({
        dataSource: ds.cloneWithRows(response.data)
      });
    });
  }
  row(course) {
    return (
      <Link
        to={"/course/" + course.course_id}
        key={course.course_id}
        className="course"
      >
        <img
          className="cover"
          src={
            "https://www.jieshu.mobi:8181" + course.event_frontcover_filepath
          }
          alt=""
        />
        <div className="info">
          <div className="name">{course.title}</div>
          <div className="time">
            <label htmlFor="">时间：</label>
            {Moment(course.event_start_date).format("YYYY/MM/DD")} ～{" "}
            {Moment(course.event_end_date).format("YYYY/MM/DD")}
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
            <Period
              course={course}
              images={[
                require("./assets/period_enrolling.png"),
                require("./assets/period_ongoing.png"),
                require("./assets/period_finish.png")
              ]}
            />
          </div>
        </div>
      </Link>
    );
  }
  header() {
    return (
      <header className="tabs">
        <span
          className={classNames({ active: this.state.type === 0 })}
          onClick={this.filter.bind(this, 0)}
        >
          全部<span className="mark" />
        </span>
        <span
          className={classNames({ active: this.state.type === 1 })}
          onClick={this.filter.bind(this, 1)}
        >
          哲学<span className="mark" />
        </span>
        <span
          className={classNames({ active: this.state.type === 2 })}
          onClick={this.filter.bind(this, 2)}
        >
          艺术<span className="mark" />
        </span>
        <span
          className={classNames({ active: this.state.type === 3 })}
          onClick={this.filter.bind(this, 3)}
        >
          历史<span className="mark" />
        </span>
        <span
          className={classNames({ active: this.state.type === 4 })}
          onClick={this.filter.bind(this, 4)}
        >
          文学<span className="mark" />
        </span>
        <span
          className={classNames({ active: this.state.type === 5 })}
          onClick={this.filter.bind(this, 5)}
        >
          科技<span className="mark" />
        </span>
      </header>
    );
  }
  filter = type => {
    this.setState({
      type
    });
    type = ["", "哲学", "艺术", "历史", "文学", "科技"][type];
    axios
      .get("/RetrieveMyEventsServlet", {
        params: {
          event_tag: encodeURIComponent(type)
        }
      })
      .then(response => {
        var ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({
          dataSource: ds.cloneWithRows(response.data)
        });
      });
  };
  separator = (sectionID, rowID) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: "#E5E5E5",
        width: 335,
        height: 1,
        margin: "0 auto",
        border: 0
      }}
    />
  );
  footer () {
    return <div style={{ padding: 20, textAlign: "center" }}>
    {this.state.isLoading ? "加载中..." : "你来到了宇宙的边界"}
  </div>
  }
  render() {
    return (
      <div id="mycourses">
        <ListView
          dataSource={this.state.dataSource}
          renderRow={course => this.row(course)}
          renderHeader={() => this.header()}
          renderSeparator={this.separator}
          renderFooter={() => this.footer()}
          useBodyScroll
        />
      </div>
    );
  }
}

export default Home;

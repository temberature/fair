import React from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import axios from "axios";
import { Button, List } from "antd-mobile";
import OAIcon from "../components/icon/Icon";
import Period from "../components/period/Period";
import "./Course.less";

const Item = List.Item;

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {}
    };
  }
  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    axios
      .get(
        "https://www.jieshu.mobi:8181/YanglaoServer-war/RetrieveEventByEventIdServlet?event_id=" +
          this.props.match.params.id
      )
      .then(response => {
        console.log(response);
        // data = data.response
        this.setState(() => ({
          course: response.data
        }));
      });
  }
  generateNewLine(inString) {
    if (inString !== null && typeof inString !== 'undefined') {
      let outString = inString.replace(/\n/g, '<br/>');
      outString = outString.replace(/\r/g, '<br/>');
      return outString;
    }
  }
  render() {
    const course = this.state.course;

    return (
      <div key={course.id} id="course">
        <div className="coverContainer">
          <div
            style={{
              backgroundImage:
                "url(https://www.jieshu.mobi:8181" +
                course.event_frontcover_filepath +
                ")"
            }}
            className="blurCover"
          />
          <img
            className="cover"
            src={
              "https://www.jieshu.mobi:8181" + course.event_frontcover_filepath
            }
            alt=""
          />
        </div>

        <div className="info">
          <div className="title">
            <span className="name">{course.title}</span>
          </div>
          <div className="deadline">
            报名截止至：{Moment(course.event_start_date).format("YYYY/MM/DD")}
            <Period
                course={course}
                images={[
                  require("./assets/period_enrolling.png"),
                  require("./assets/period_ongoing.png"),
                  require("./assets/period_finish.png")
                ]}
              />
          </div>
          <List>
            <Item
              extra={
                "已报" +
                course.enrolled_already +
                "人/限制" +
                course.max_attendence +
                "人"
              }
              onClick={() => {}}
            >
              报名人数
            </Item>
            <Item
              extra={
                Moment(course.startDate).format("YYYY/MM/DD") +
                " ~ " +
                Moment(course.endDate).format("YYYY/MM/DD")
              }
              onClick={() => {}}
            >
              活动时间
            </Item>
            <Item
              extra={
                <div>
                  <OAIcon size="xxs" style={{color: '#9b9b9b'}} type={require("../assets/icon_place.svg")} />
                  {course.address}
                </div>
              }
              arrow="horizontal"
              onClick={() => {}}
            >
              活动地点
            </Item>
            <Item extra="免费" onClick={() => {}}>
              费用
            </Item>
          </List>
          <div className="detail" dangerouslySetInnerHTML={{__html: course.event_main_content ? this.generateNewLine(course.event_main_content) : "活动详情"}}>
          </div>
        </div>

        {new Date().getTime() < course.event_register_deadline &&
          (course.enrolled ? (
            <Button
              disabled
              className="enrollBtn"
              type="primary"
              size="large"
            >
              已报名
            </Button>
          ) : (
            <Link to="./entryForm" append>
              <Button
                className="enrollBtn"
                type="primary"
                size="large"
              >
                立即报名
              </Button>
            </Link>
          ))}
      </div>
    );
  }
}

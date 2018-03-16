import React from "react";
import Moment from "moment";
import axios from "../utils/customAxios";
import { Button, List } from "antd-mobile";
import OAIcon from "../components/icon/Icon.js";
import Period from "../components/period/Period";
import "./Course.less";
import WebConstants from "../web_constants";

const Item = List.Item;

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      already_joined_event: false
    };
  }
  componentDidMount() {
    document.title = "OA学院";

    axios
      .get("/courses/" + this.props.match.params.id, {
        params: {
          event_id: this.props.match.params.id,
          [WebConstants.TOKEN]: sessionStorage.getItem(WebConstants.TOKEN)
        }
      })
      .then(response => {
        console.log(response);

        this.setState(() => ({
          course: response.data
        }));
      })
      .catch(function(error) {
        console.log(error);
      });
    if (!sessionStorage.getItem(WebConstants.TOKEN)) {
      console.log(111);
      return;
    }
    axios
      .get("/RetrieveEventParticipantsServlet", {
        params: {
          event_id: this.props.match.params.id,
          [WebConstants.TOKEN]: sessionStorage.getItem(WebConstants.TOKEN)
        },
        validateStatus: function(status) {
          return +status === 200;
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.already_joined_event) {
          this.setState(() => ({
            already_joined_event: true
          }));
        }
      })
      .catch(function(error) {
        if (!error.response) {
          sessionStorage.removeItem(WebConstants.TOKEN);
        }
      });
  }
  generateNewLine(inString) {
    if (inString !== null && typeof inString !== "undefined") {
      let outString = inString.replace(/\n/g, "<br/>");
      outString = outString.replace(/\r/g, "<br/>");
      return outString;
    }
  }
  toEntry = () => {
    if (!sessionStorage.getItem(WebConstants.TOKEN)) {
      this.props.history.push("/signin");
    } else {
      this.props.history.push(this.props.match.url + "/entryForm");
    }
  };
  render() {
    const course = this.state.course;

    return (
      <div key={course.id} id="course">
        <div className="coverContainer">
          <div
            style={{
              backgroundImage:
                "url(" +
                course.cover +
                ")"
            }}
            className="blurCover"
          />
          <img
            className="cover"
            src={
              course.cover
            }
            alt=""
          />
        </div>

        <div className="info">
          <div className="title">
            <span className="name">{course.name}</span>
          </div>
          <div className="deadline">
            报名截止至：{Moment(course.startDate).format("YYYY/MM/DD")}
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
                course.quota +
                "人"
              }
            >
              报名人数
            </Item>
            <Item
              extra={
                Moment(course.startDate).format("YYYY/MM/DD") +
                " ~ " +
                Moment(course.endDate).format("YYYY/MM/DD")
              }
              wrap
            >
              活动时间
            </Item>
            <Item
              extra={
                <div>
                  <OAIcon
                    size="xxs"
                    style={{ color: "#9b9b9b" }}
                    type={require("../assets/icon_place.svg")}
                  />
                  {course.address}
                </div>
              }
              arrow="horizontal"
            >
              活动地点
            </Item>
            <Item extra="免费">费用</Item>
          </List>
          <div
            className="detail"
            dangerouslySetInnerHTML={{
              __html: course.event_main_content
                ? this.generateNewLine(course.event_main_content)
                : "活动详情"
            }}
          />
        </div>

        {new Date().getTime() < course.event_register_deadline &&
          (this.state.already_joined_event ? (
            <Button disabled className="enrollBtn" type="primary" size="large">
              已报名
            </Button>
          ) : (
            <Button
              className="enrollBtn"
              type="primary"
              size="large"
              onClick={this.toEntry}
            >
              立即报名
            </Button>
          ))}
      </div>
    );
  }
}

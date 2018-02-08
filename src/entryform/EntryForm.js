import React from "react";
import { List, InputItem, WhiteSpace } from "antd-mobile";
import { createForm } from "rc-form";
import {
  ActionSheet,
  WingBlank,
  Button,
  Toast,
  DatePicker,
  TextareaItem,
  Result
} from "antd-mobile";
import "./EntryForm.less";
import axios from "../utils/customAxios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import WebConstants from "../web_constants";

const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault()
  };
}

class EntryForm extends React.Component {
  state = {
    type: "money",
    name: "",
    sex: "请选择",
    birthdate: "",
    education: "",
    profession: "",
    feedback: false,
    enrolled: false
  };
  showActionSheet = (type, BUTTONS) => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        maskClosable: true,
        "data-seed": "logId",
        wrapProps
      },
      buttonIndex => {
        console.log(type, BUTTONS);
        if (buttonIndex !== BUTTONS.length - 1) {
          this.setState({ [type]: BUTTONS[buttonIndex] });
        }
      }
    );
  };
  enroll = () => {
    axios
      .get("/ApplyEventServlet", {
        params: {
          event_id: this.props.match.params.id,
          [WebConstants.TOKEN]: sessionStorage.getItem(WebConstants.TOKEN)
        }
      })
      .then(response => {
        console.log(response.data.retdesc);
        this.setState({ feedback: true });
        if (response.data.apply_event_status === WebConstants.SUCCESS) {
          this.setState({ enrolled: true });
        }
      });
  };
  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    const Item = List.Item;
    return (
      <div id="entryForm">
        {this.state.feedback &&
          (this.state.enrolled ? (
            <div className="result">
              <Result
                img={<img src={require("./assets/enroll_success.png")} />}
                title="报名申请成功"
                buttonText="我知道了"
                buttonType="primary"
                onButtonClick={() => {
                  this.props.history.push("/");
                }}
              />
            </div>
          ) : (
            <div className="result">
              <Result
                img={<img src={require("./assets/enroll_fail.png")} />}
                title="报名失败"
                message="报名人员已满，看看其他课程吧"
                buttonText="我知道了"
                buttonType="primary"
                onButtonClick={() => {
                  this.props.history.push("/");
                }}
              />
            </div>
          ))}
        {!this.state.feedback && (
          <div>
            <List>
              <InputItem
                {...getFieldProps("autofocus")}
                ref={el => (this.autoFocusInst = el)}
                clear
              >
                姓名
              </InputItem>
              <Item
                onClick={this.showActionSheet.bind(this, "sex", [
                  "男",
                  "女",
                  "取消"
                ])}
                extra={this.state.sex}
                arrow="horizontal"
              >
                性别
              </Item>
              <DatePicker
                value={this.state.date}
                onChange={date => this.setState({ date })}
              >
                <Item onClick={() => {}} arrow="horizontal">
                  出生年月
                </Item>
              </DatePicker>

              <Item arrow="horizontal" onClick={() => {}}>
                学历
              </Item>
              <Item onClick={() => {}} arrow="horizontal">
                职业
              </Item>
              <TextareaItem
                {...getFieldProps("count", {
                  initialValue: ""
                })}
                placeholder="记录一下参加理由吧"
                rows={5}
                count={100}
              />
            </List>
            <Button
              onClick={this.enroll}
              type="primary"
              className="enrollBtn"
              size="large"
            >
              马上报名
            </Button>
            <div className="hint">
              为了保证课程质量和体验，OA活动会控制合适的参与人数及质量。
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default createForm()(EntryForm);

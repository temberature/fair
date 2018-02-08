import React from "react";
import { List, InputItem } from "antd-mobile";
import { createForm } from "rc-form";
import {
  ActionSheet,
  Button,
  DatePicker,
  TextareaItem,
  Result,
  ActivityIndicator
} from "antd-mobile";
import "./EntryForm.less";
import axios from "../utils/customAxios";
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
    enrolled: false,
    animating: false
  };
  componentDidMount() {
    document.title = "我要报名";
  }
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
    this.setState({
      animating: true
    });

    axios
      .get("/ApplyEventServlet", {
        params: {
          event_id: this.props.match.params.id,
          [WebConstants.TOKEN]: sessionStorage.getItem(WebConstants.TOKEN)
        }
      })
      .then(response => {
        this.setState({
          animating: false
        });
        console.log(response.data.retdesc);
        this.setState({ feedback: true });
        if (response.data.apply_event_status === WebConstants.SUCCESS) {
          this.setState({ enrolled: true });
        }
      });
  };
  render() {
    const { getFieldProps } = this.props.form;
    const Item = List.Item;
    return (
      <div id="entryForm">
        {this.state.feedback &&
          (this.state.enrolled ? (
            <div className="result">
              <Result
                img={
                  <img src={require("./assets/enroll_success.png")} alt="" />
                }
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
                img={<img src={require("./assets/enroll_fail.png")} alt="" />}
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
              mode="date"
                value={this.state.date}
                onChange={date => this.setState({ date })}
              >
                <Item onClick={() => {}} arrow="horizontal" wrap>
                  出生年月日
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
            <ActivityIndicator toast animating={this.state.animating} />
          </div>
        )}
      </div>
    );
  }
}

export default createForm()(EntryForm);

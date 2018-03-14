import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  List,
  InputItem,
  Toast,
  Modal,
  TextareaItem,
  WhiteSpace
} from "antd-mobile";
import { createForm } from "rc-form";
import "./Swarming.less";
import axios from "../utils/customAxios";
import jsSHA from "jssha";
import WebConstants from "../web_constants";

class SignIn extends React.Component {
  state = {
    text: "",
    modal: false,
    modalTip: "",
    id: null
  };
  main = () => {
    this.setState({
      animating: true
    });

    axios
      .post("/agenda", {
        text: this.state.text
      })
      .then(response => {
        this.setState({
          animating: false
        });
        console.log(response.data.retdesc);
        const json = response.data;
        if (json.data.id) {
          this.setState({
            id: json.data.id
          });
        } else {
          this.setState({
            modal: true,
            modalTip: json.retdesc
          });
        }
      });
  };
  onErrorClick = msg => {
    Toast.info(msg);
  };
  onChange = text => {
    this.setState({
      text: text
    });
  };
  onPasswordChange = password => {
    if (password.replace(/\s/g, "").length < 11) {
      this.setState({
        hasPasswordError: true
      });
    } else {
      this.setState({
        hasPasswordError: false
      });
    }
    this.setState({
      password
    });
  };
  onCodeChange = code => {
    if (code.replace(/\s/g, "").length < 6) {
      this.setState({
        hasCodeError: true
      });
    } else {
      this.setState({
        hasCodeError: false
      });
    }
    this.setState({
      code
    });
  };
  sendCode = () => {
    this.setState({
      animating: true
    });
    axios
      .get("/GenerateValidationCodeServlet", {
        params: {
          user_mobilephone_number: this.state.user_mobilephone_number
        }
      })
      .then(response => {
        this.setState({
          animating: false
        });
        console.log(response.data.retdesc);
        if (response.data.validation_token) {
          this.setState({
            validationToken: response.data.validation_token
          });
          Toast.info("验证码发送成功～");
        } else {
          this.setState({
            modal: true,
            modalTip: "请重试"
          });
        }
      });
  };
  render() {
    return (
      <div id="swarming">
        <List>
          <TextareaItem
            onChange={this.onChange}
            placeholder="议程主题（必填）"
            autoHeight
          />
        </List>
        <WhiteSpace />
        <Button onClick={this.main} className="mainBtn" type="primary">
          发起讨论
        </Button>
        <Modal
          visible={this.state.modal}
          transparent
          maskClosable={false}
          title="温馨提示"
          footer={[
            {
              text: "确认",
              onPress: () => {
                this.setState({
                  modal: false
                });
              }
            }
          ]}
        >
          {this.state.modalTip}
        </Modal>
        {this.state.id !== null ? (
          <Redirect
            to={"/agenda/" + this.state.id + this.props.location.hash}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default createForm()(SignIn);

import React from "react";
import { Link } from "react-router-dom";
import { Button, List, InputItem, Toast, Modal } from "antd-mobile";
import { createForm } from "rc-form";
import "./Agenda.less";
import axios from "../utils/customAxios";
import jsSHA from "jssha";
import WebConstants from "../web_constants";

class SignIn extends React.Component {
  state = {
    user_mobilephone_number: "",
    code: null,
    password: null,
    hasPhoneError: false,
    hasCodeError: false,
    hasPasswordError: false,
    animating: false,
    validationToken: "1111",
    modal: false,
    modalTip: ""
  };
  signup = () => {
    this.setState({
      animating: true
    });
    const shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(this.state.password);
    const encryptedPassword = shaObj.getHash("HEX");
    axios
      .get("/RegisterServlet", {
        params: {
          user_mobilephone_number: this.state.user_mobilephone_number,
          password: encryptedPassword,
          validation_code: this.state.code,
          validation_token: this.state.validationToken
        }
      })
      .then(response => {
        this.setState({
          animating: false
        });
        console.log(response.data.retdesc);
        const json = response.data;
        if (json.registration_result === WebConstants.SUCCESS) {
          Toast.info("注册成功～");
        } else {
          let modalTip = "注册失败";
          // if (json.already_registered) {
          //   modalTip += "该手机号已注册";
          // }
          // if (!json.valid_phonenumber) {
          //   modalTip += "无效的手机号";
          // }
          // if (json.validation_code_valid && !json.validation_code_valid) {
          //   modalTip += "无效的验证码";
          // }
          this.setState({
            modal: true,
            modalTip
          });
        }
      });
  };
  onErrorClick = msg => {
    Toast.info(msg);
  };
  onChange = user_mobilephone_number => {
    if (user_mobilephone_number.replace(/\s/g, "").length < 11) {
      this.setState({
        hasPhoneError: true
      });
    } else {
      this.setState({
        hasPhoneError: false
      });
    }
    this.setState({
      user_mobilephone_number
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
            modalTip: '请重试'
          });
        }
      });
  };
  render() {
    return (
      <div id="swarming">
        <List>
          <InputItem
            type="text"
            placeholder="议题来源（必填）"
            // error={this.state.hasPhoneError}
            onErrorClick={this.onErrorClick.bind(
              this,
              "Please enter 11 digits"
            )}
            onChange={this.onChange}
            value={this.state.user_mobilephone_number}
            clear
          />
          <InputItem
            type="text"
            placeholder="议题"
            error={this.state.hasCodeError}
            onErrorClick={this.onErrorClick.bind(this, "Please enter 6 digits")}
            onChange={this.onCodeChange}
            value={this.state.code}
          />
          <InputItem
            type="password"
            placeholder="议题"
            error={this.state.hasPasswordError}
            onErrorClick={this.onErrorClick.bind(this, "Please enter 6~11 ")}
            onChange={this.onPasswordChange}
            value={this.state.password}
          />
        </List>
        <Button
          onClick={this.signup}
          className="signupBtn"
          size="small"
          inline
        >
          添加选项
        </Button>
        <div className="tip">
          已有账号？
          <Link to="/signin">立即登录</Link>
        </div>
        <div className="agreementsTip tip">
          点击“注册”按钮，即表示您同意<a href="">《服务与隐私协议》</a>
        </div>
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
      </div>
    );
  }
}

export default createForm()(SignIn);

import React from "react";
import { Link } from "react-router-dom";
import { Button, List, InputItem, Toast } from "antd-mobile";
import { createForm } from "rc-form";
import "./SignUp.less";
import axios from "axios";
class SignIn extends React.Component {
  state = {
    user_mobilephone_number: "",
    code: 0,
    password: "",
    hasPhoneError: false,
    hasCodeError: false,
    hasPasswordError: false
  };
  signin = () => {
    axios
      .post(
        "https://easy-mock.com/mock/5a3c67260df23b51b3614cfb/RegisterServlet?user_mobilephone_number=" +
          this.state.user_mobilephone_number
      )
      .then(response => {
        console.log(response.data.retdesc);
        if (response.data.registration_result) {
          Toast.info("注册成功～");
        }
      });
  };
  onErrorClick = (msg) => {
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
  render() {
    return (
      <div id="signup">
        <List>
          <InputItem
            type="phone"
            placeholder="手机号"
            error={this.state.hasPhoneError}
            onErrorClick={this.onErrorClick.bind(this, "Please enter 11 digits")}
            onChange={this.onChange}
            value={this.state.user_mobilephone_number}
          />
          <InputItem
            type="number"
            placeholder="验证码"
            error={this.state.hasCodeError}
            onErrorClick={this.onErrorClick.bind(this, "Please enter 6 digits")}
            onChange={this.onCodeChange}
            value={this.state.code}
            extra="获取验证码"
          />
          <InputItem
            type="password"
            placeholder="密码（6-16位数字、字母）"
            error={this.state.hasPasswordError}
            onErrorClick={this.onErrorClick.bind(this, "Please enter 6~11 ")}
            onChange={this.onPasswordChange}
            value={this.state.password}
          />
        </List>
        <Button
          onClick={this.signin}
          type="primary"
          className="signupBtn"
          size="large"
        >
          注册
        </Button>
        <div className="tip">
          已有账号？
          <Link to="/signin">立即登录</Link>
        </div>
        <div className="agreementsTip tip">
          点击“注册”按钮，即表示您同意<a href="">《服务与隐私协议》</a>
        </div>
      </div>
    );
  }
}

export default createForm()(SignIn);

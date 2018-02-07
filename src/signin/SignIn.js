import React from "react";
import { Link } from "react-router-dom";
import { Button, List, InputItem, WhiteSpace, Toast } from "antd-mobile";
import { createForm } from "rc-form";
import "./SignIn.less";
import axios from "axios";

class SignIn extends React.Component {
  state = {
    user_mobilephone_number: "",
    password: "",
    hasError: false
  };
  signin = () => {
    axios
      .post(
        "https://easy-mock.com/mock/5a3c67260df23b51b3614cfb/LoginServlet?user_mobilephone_number=" +
          this.state.user_mobilephone_number
      )
      .then(response => {
        console.log(response.data.retdesc);
        if (response.data.login_success) {
          Toast.info("登录成功～");
        }
      });
  }
  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info("Please enter 11 digits");
    }
  };
  onChange = user_mobilephone_number => {
    if (user_mobilephone_number.replace(/\s/g, "").length < 11) {
      this.setState({
        hasError: true
      });
    } else {
      this.setState({
        hasError: false
      });
    }
    this.setState({
      user_mobilephone_number
    });
  };
  onPasswordChange = password => {
    if (password.replace(/\s/g, "").length < 11) {
      this.setState({
        hasError: true
      });
    } else {
      this.setState({
        hasError: false
      });
    }
    this.setState({
      password
    });
  };
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div id="signin">
        <List>
          <InputItem
            type="phone"
            placeholder="手机号"
            error={this.state.hasError}
            onErrorClick={this.onErrorClick}
            onChange={this.onChange}
            value={this.state.user_mobilephone_number}
          />
          <InputItem
            type="password"
            placeholder="密码"
            error={this.state.hasError}
            onErrorClick={this.onErrorClick}
            onChange={this.onPasswordChange}
            value={this.state.password}
          />
        </List>
        <Button
          onClick={this.signin}
          type="primary"
          className="signinBtn"
          size="large"
        >
          登录
        </Button>
        <div className="toSignupTip tip">
          <Link to="/signup">快速注册</Link>
        </div>
      </div>
    );
  }
}

export default createForm()(SignIn);

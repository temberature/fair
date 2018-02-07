import React from "react";
import { Link } from "react-router-dom";
import { Button, List, InputItem, WhiteSpace, Toast } from "antd-mobile";
import { createForm } from "rc-form";
import "./SignIn.less";
import axios from "../utils/customAxios";
import jsSHA from 'jssha'
import WebConstants from '../web_constants'

class SignIn extends React.Component {
  state = {
    user_mobilephone_number: "15910707069",
    password: "tember158569",
    hasPhoneError: false,
    hasPasswordError: false
  };
  signin = () => {
    const shaObj = new jsSHA('SHA-256', 'TEXT');
    shaObj.update(this.state.password);
    const encryptedPassword = shaObj.getHash('HEX');
    axios
      .post(
        "/LoginServlet?user_mobilephone_number=" +
          this.state.user_mobilephone_number.replace(/\s/g, '') + '&password=' + encryptedPassword
      )
      .then(response => {
        console.log(response.data.retdesc);
        const loginResult = response.data;
        if (loginResult.login_success) {
          Toast.info("登录成功～");
          sessionStorage.setItem(WebConstants.TOKEN, loginResult[WebConstants.TOKEN]);
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

import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  List,
  InputItem,
  Toast,
  Modal,
  TextareaItem
} from "antd-mobile";
import { createForm } from "rc-form";
import "./Agenda.less";
import axios from "../utils/customAxios";
import jsSHA from "jssha";
import WebConstants from "../web_constants";

class SignIn extends React.Component {
  state = {
    topics: [],
    totalVoteNumber: 0
  };
  componentDidMount() {
    document.title = "OA学院";

    axios
      .get("/agenda/" + this.props.match.params.id, {
        params: {
          [WebConstants.TOKEN]: sessionStorage.getItem(WebConstants.TOKEN)
        }
      })
      .then(response => {
        console.log(response);

        this.setState(() => ({
          topics: response.data.data.topics,
          totalVoteNumber: response.data.data.totalVoteNumber
        }));
      })
      .catch(function(error) {
        console.log(error);
      });
  }
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
            modalTip: "请重试"
          });
        }
      });
  };
  render() {
    const Item = List.Item;
    const Brief = Item.Brief;

    return (
      <div id="agenda">
        <h1>《失控》</h1>
        <List>
          {this.state.topics.map(topic => {
            return (
              <Item key={topic.id}
                extra={
                  (topic.voted ? "✓ " : "") +
                  topic.voteNumber +
                  "票 " +
                  Number(
                    topic.voteNumber / this.state.totalVoteNumber * 100
                  ).toFixed(1) +
                  "%"
                }
                wrap
              >
                {topic.text}
              </Item>
            );
          })}
          <TextareaItem placeholder="新增议题" autoHeight clear />
        </List>
        <Button onClick={this.signup} className="signupBtn" size="small" inline>
          添加
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
      </div>
    );
  }
}

export default createForm()(SignIn);

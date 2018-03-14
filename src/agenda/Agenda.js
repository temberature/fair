import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  List,
  InputItem,
  Toast,
  Modal,
  TextareaItem,
  SegmentedControl
} from "antd-mobile";
import { createForm } from "rc-form";
import "./Agenda.less";
import axios from "../utils/customAxios";
import jsSHA from "jssha";
import WebConstants from "../web_constants";

class SignIn extends React.Component {
  state = {
    text: '',
    topics: [],
    totalVoteNumber: 0,
    newTopic: ''
  };
  componentDidMount() {
    document.title = "OA学院";

    this.get();
  }
  get = () => {
    axios
      .get("/agenda/" + this.props.match.params.id, {
        params: {
          [WebConstants.TOKEN]: sessionStorage.getItem(WebConstants.TOKEN)
        }
      })
      .then(response => {
        console.log(response);
        const json = response.data;
        this.setState(() => ({
          text: json.data.text,
          topics: json.data.topics,
          totalVoteNumber: json.data.totalVoteNumber
        }));
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  addTopic = () => {
    this.setState({
      animating: true
    });

    axios
      .post("/agenda/" + this.props.match.params.id, {
        topic: this.state.newTopic
      })
      .then(response => {
        this.setState({
          animating: false
        });
        console.log(response.data.retdesc);
        const json = response.data;
        if (+json.retcode === 200) {
          Toast.info("添加成功～");
          this.get();
          this.setState({
            newTopic: ''
          })
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
  onChange = newTopic => {
    this.setState({
      newTopic: newTopic
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
  sort = (value) => {
    console.log(value.nativeEvent.selectedSegmentIndex);
    const orderIndex = value.nativeEvent.selectedSegmentIndex;
    if (orderIndex === 1) {
      this.setState((prevState) => {
        return {
          topics: prevState.topics.sort((a, b) => {
            return a.voteNumber < b.voteNumber;
          })
        }
      })
    } else if (orderIndex === 0) {
      this.get();
    }
    
  };
  vote = id => {
    this.setState({
      animating: true
    });
    axios
      .post("/topic/" + id, {
        params: {}
      })
      .then(response => {
        this.setState({
          animating: false
        });
        console.log(response.data.retdesc);
        if (+response.data.retcode === 200) {
          Toast.info("投票成功");
          this.get();
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
        <h1>{this.state.text}</h1>
        <SegmentedControl onChange={this.sort} values={['默认排序', '票数排序']} />
        <List>
          {this.state.topics.map(topic => {
            return (
              <Item
                onClick={this.vote.bind(this, topic.id)}
                key={topic.id}
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
          <TextareaItem value={this.state.newTopic} onChange={this.onChange} placeholder="新增议题" autoHeight clear />
        </List>
        <Button
          onClick={this.addTopic}
          className="signupBtn"
          size="small"
          inline
        >
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

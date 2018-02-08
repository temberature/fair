import React from "react";
import { List, Icon, Button, Toast } from "antd-mobile";
import "./Settings.less";
import OAIcon from "../components/icon/Icon";
import axios from "../utils/customAxios";
import WebConstants from "../web_constants";

const Item = List.Item;

class Profile extends React.Component {
  componentDidMount() {
    document.title = "设置";
  }
  logout = () => {
    sessionStorage.removeItem(WebConstants.TOKEN);
    Toast.success("注销成功", 1, () => {
      this.props.history.push("/");
    });
  };
  render() {
    return (
      <div id="settings">
        <List>
          <Item
            arrow="horizontal"
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            帮助与反馈
          </Item>
        </List>
        <Button onClick={this.logout} className="logoutBtn">
          退出登录
        </Button>
      </div>
    );
  }
}

export default Profile;

import React from "react";
import { List, Icon } from "antd-mobile";
import "./Profile.less";
import OAIcon from '../components/icon/Icon';

const Item = List.Item;

class Profile extends React.Component {
  render() {
    return (
      <div id="profile">
        <header>
          <img
            className="avatar"
            src={require("./assets/avatar_default.png")}
            alt=""
          />
        </header>
        <main>
          <List>
            <Item
              thumb={<OAIcon type={require('./assets/icon_course.svg')} />}
              arrow="horizontal"
              onClick={() => {}}
            >
              我的活动
            </Item>
            <Item
              thumb={<OAIcon type={require('./assets/icon_invite.svg')} />}
              onClick={() => {}}
              arrow="horizontal"
            >
              邀请好友
            </Item>
            <Item
              thumb={<OAIcon type={require('./assets/icon_about.svg')} />}
              arrow="horizontal"
              onClick={() => {}}
            >
              关于OA
            </Item>
            <Item
              thumb={<OAIcon type={require('./assets/icon_setting.svg')} />}
              onClick={() => {}}
              arrow="horizontal"
            >
              设置
            </Item>
          </List>
        </main>
      </div>
    );
  }
}

export default Profile;

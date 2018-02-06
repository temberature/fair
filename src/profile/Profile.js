import React from "react";
import { Icon, Grid } from "antd-mobile";
import { List } from "antd-mobile";
import OAIcon from '../components/icon/Icon';
import CSSModules from 'react-css-modules';
import styles from './Profile.less';

const Item = List.Item;
const Brief = Item.Brief;
class Profile extends React.Component {
  render() {
    return (     
      <div className="user">
        <header>
          <img
          className="avatar"
            src={require('./assets/avatar_default.png')}
            alt=""
          />
        </header>
        <main>
          <List>
            <Item
              thumb={require('./assets/icon_course.svg')}
              arrow="horizontal"
              onClick={() => {}}
            >
              我的活动
            </Item>
            <Item
              thumb={require('./assets/icon_invite.svg')}
              onClick={() => {}}
              arrow="horizontal"
            >
              邀请好友
            </Item>
            <Item
              thumb={require('./assets/icon_about.svg')}
              arrow="horizontal"
              onClick={() => {}}
            >
            关于OA
            </Item>
            <Item
              thumb={require('./assets/icon_setting.svg')}
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

export default CSSModules(Profile, styles, {allowMultiple: true} );

import React from "react";
import { Icon, Grid } from "antd-mobile";
import { List } from "antd-mobile";
import OAIcon from '../components/icon/icon';

const Item = List.Item;
const Brief = Item.Brief;
class Profile extends React.Component {
  render() {
    const icon = <img src="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" />;
    return (
      <div className="user">
        <header>
          <img
            className="avatar"
            src="../assets/user/img/avatar_default.png"
            alt=""
          />
        </header>
        <main>
          <List renderHeader={() => "Icon in the left"}>
            <Item
              thumb={<OAIcon type={require('./assets/icon_course.svg')} name="icon_course" />}
              arrow="horizontal"
              onClick={() => {}}
            >
              我的活动
            </Item>
            <Item
              thumb={<Icon type="check" name="icon_course" />}
              onClick={() => {}}
              arrow="horizontal"
            >
              邀请好友
            </Item>
            <Item
              thumb={<Icon type="check" name="icon_course" />}
              arrow="horizontal"
              onClick={() => {}}
            >
            关于OA
            </Item>
            <Item
              thumb={<Icon type="check" name="icon_course" />}
              onClick={() => {}}
              arrow="horizontal"
            >
            设置
            </Item>
          </List>
          <router-link to="/me/courses">
            <mt-cell title="我的活动" is-link>
              <span />
              <Icon type="check" name="icon_course" />
            </mt-cell>
          </router-link>
          <mt-cell title="邀请好友" is-link>
            <span />
            <Icon type="check" name="icon_course" />
          </mt-cell>
          <mt-cell title="关于OA" is-link>
            <span />
            <Icon type="check" name="icon_course" />
          </mt-cell>
          <router-link to="/settings">
            <mt-cell title="设置" is-link>
              <span />
              <Icon type="check" name="icon_course" />
            </mt-cell>
          </router-link>
        </main>
      </div>
    );
  }
}

export default Profile;

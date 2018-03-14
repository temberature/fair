import React from "react";
import "./TabBar.less";
import { NavLink } from "react-router-dom";
import OAIcon from "../icon/Icon";
class OATabBar extends React.Component {
  render() {
    return (
      <div className="oa-tabbar is-fixed">
        <NavLink exact to="/" className="oa-tab-item">
          <div className="oa-tab-item-icon">
            <OAIcon type={require("./assets/icon_home.svg")} />
          </div>
          <div className="oa-tab-item-label"> 共识学院</div>
        </NavLink>
        <NavLink exact to="/swarming" className="oa-tab-item">
          <div className="oa-tab-item-icon">
            <OAIcon type={require("./assets/icon_home.svg")} />
          </div>
          <div className="oa-tab-item-label"> 议程设置</div>
        </NavLink>
        <NavLink to="/profile" className="oa-tab-item">
          <div className="oa-tab-item-icon">
            <OAIcon type={require("./assets/icon_profile.svg")} />
          </div>
          <div className="oa-tab-item-label"> 个人中心</div>
        </NavLink>
      </div>
    );
  }
}

export default OATabBar;

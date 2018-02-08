import React from "react";
import "./TabBar.less";
import {
  NavLink
} from "react-router-dom";
import OAIcon from "../icon/Icon";
class OATabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "redTab",
      hidden: false,
      fullScreen: true
    };
  }

  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          textAlign: "center"
        }}
      >
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
        <a
          style={{
            display: "block",
            marginTop: 40,
            marginBottom: 20,
            color: "#108ee9"
          }}
          onClick={e => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a
          style={{ display: "block", marginBottom: 600, color: "#108ee9" }}
          onClick={e => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }

  render() {
    return (
      <div className="mint-tabbar is-fixed">
        <NavLink to="/" activeClassName="is-selected" className="mint-tab-item">
          <div className="mint-tab-item-icon">
            <OAIcon type={require("./assets/icon_home.svg")} />
          </div>
          <div className="mint-tab-item-label"> OA学院</div>
        </NavLink>
        <NavLink
          to="/profile"
          activeClassName="is-selected"
          className="mint-tab-item"
        >
          <div className="mint-tab-item-icon">
            <OAIcon type={require("./assets/icon_profile.svg")} />
          </div>
          <div className="mint-tab-item-label"> 个人中心</div>
        </NavLink>
      </div>
    );
  }
}

export default OATabBar;

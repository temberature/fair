import React from "react";
import { ActionSheet, WingBlank, Button, Toast } from "antd-mobile";
import './Invitation.less';

export default class Invitation extends React.Component {
  render() {
    return (
      <div id="invitation">
        <header>
          <img
            className="avatar"
            src={require("./assets/avatar_default.png")}
            alt=""
          />
          138****5570
        </header>
        <Button className="enrollBtn" type="primary" size="large">
          邀请好友
        </Button>
      </div>
    );
  }
}

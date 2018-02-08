import React from "react";
import { Result, Icon, WhiteSpace, Button } from "antd-mobile";
import "./EntryResult.less";

export default class EntryResult extends React.Component {
  render() {
    return (
      <div className="result-example">
        <Result
          img={<img src={require("./assets/enroll_success.png")} />}
          title="报名申请成功"
        />
        <Button className="enrollBtn" type="primary" size="large">
          我知道了
        </Button>
      </div>
    );
  }
}

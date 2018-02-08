import React from "react";
import { ActionSheet, WingBlank, Button, Toast } from "antd-mobile";
import "./Invitation.less";

export default class Invitation extends React.Component {
  componentDidMount () {
    document.title = "邀请好友";
  }
  render() {
    return (
      <div id="invitation">
        <div className="writing">
          <header>
            <img
              className="avatar"
              src={require("./assets/avatar_default.png")}
              alt=""
            />
            <div className="phone">138****5570</div>
            <div className="saying">• 邀请小伙伴一起来OA •</div>
          </header>
          <p className="p1">
            厌倦了周末在家千篇一律的乏味生活？来OA体验另一种无以言表的丰富与欢乐。
          </p>
          <p className="p2">
            数以千计的可爱的灵魂们在这里相遇，一同通过文学、艺术、哲学、科技，去探索这广阔而奇妙的世界。
          </p>
          <img className="divider" src={require('./assets/divider.png')} />
          {/* <blockquote>
            人们的目光越出于此岸的现实之外，瞥向神圣的东西。
            <footer class="blockquote-footer"> —黑格尔</footer>
          </blockquote> */}
          <img className="quote" src={require('./assets/quote1.png')} alt=""/>
          <Button className="enrollBtn" type="primary" size="large">
            邀请好友
          </Button>
        </div>
      </div>
    );
  }
}

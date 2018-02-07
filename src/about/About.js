import React from "react";
import { ActionSheet, WingBlank, Button, Toast } from "antd-mobile";
import "./About.less";

export default class About extends React.Component {
  componentDidMount () {
    document.title = "关于OA";
  }
  render() {
    return (
      <div id="about">
        <div className="writing">
          你是否常常感到，除了你职业领域之外，这个世界还有太多有趣的知识，等待着你像寻宝一样去发掘它们？
          <br />
          <br />
          你是否希望，能结交到许多让你无比喜欢的可爱的人，他们时刻闪烁着对未知的好奇和渴望，脱口而出的全是才华，饱读了满腹的诗书，渗透着全身的诚恳？
          <img className="divider" src={require('./assets/divider.png')} />
          那毫无疑问，你应该来奥林浦斯学院（Olympus
          Academy）。奥林浦斯学院是一所专门为职业人群服务的公益性学习组织，以平等友爱的协同式学习为核心理念。成立四年多来，奥林浦斯学院已开设了近百门课程，举办了700多场线下活动，参加总人数超过了12000人。我们曾一同学习过近百本各个领域的优秀书籍，包括戴维·迈尔斯的《社会心理学》、曼昆的《经济学原理》、兹维·博迪的《金融学》、布莱恩·蒂尔尼的《西欧中世纪史》、苏珊·伍德福德的《剑桥艺术史》、撒穆尔·斯通普夫的《西方哲学史》、路易斯·贾内梯的《认识电影》、伊恩·古德费洛的《深度学习》……
          <img className="divider" src={require('./assets/divider.png')} />
          我们曾一同在繁星罗列的夜空下观赏过静谧的土星环、也曾在皇蕴古旧的太庙里拍摄过天南地北的过往。我们曾在言辞放肆的黑格尔文集里跳过迷醉的碎舞，也曾在阿拉伯的漫天黄沙里陪劳伦斯守望过孤独的日出。
          <br />
          <br />
          来奥林浦斯学院，创造自我。
        </div>
      </div>
    );
  }
}

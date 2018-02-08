/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from "react";
import ReactDOM from "react-dom";
import { ListView, Carousel } from "antd-mobile";
import axios from "../utils/customAxios";
import "./Home.less";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Moment from "moment";
import Period from "../components/period/Period";

function MyBody(props) {
  return (
    <div className="am-list-body my-body courses">
      <span style={{ display: "none" }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = pIndex * NUM_SECTIONS + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
      courses: [],
      pageIndex: 0
    };
  }

  componentDidMount() {
    document.title = "OA学院";
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    // simulate initial Ajax
    axios
      .get(
        "/RetrieveEventServlet"
      )
      .then(response => {
        console.log(response);
        // data = data.response
        this.setState(() => ({
          courses: response.data
        }));
        genData();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(
            dataBlobs,
            sectionIDs,
            rowIDs
          ),
          isLoading: false,
          height: hei
        });
      });
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log("reach end", event);
    this.setState({ isLoading: true });
    this.setState(prevState => ({
      pageIndex: prevState.pageIndex + 1
    }));
    axios
      .get(
        "/RetrieveEventServlet?page=" +
          this.state.pageIndex
      )
      .then(response => {
        console.log(response);
        // data = data.response
        this.setState(() => ({
          courses: response.data
        }));
        genData(++pageIndex);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(
            dataBlobs,
            sectionIDs,
            rowIDs
          ),
          isLoading: false
        });
      });
  };

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 8,
          borderTop: "1px solid #ECECED",
          borderBottom: "1px solid #ECECED"
        }}
      />
    );
    let index = this.state.courses.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.state.courses.length - 1;
      }
      const course = this.state.courses[index--];

      return (
        <Link to={'/course/'+  course.course_id} key={course.course_id} className="course">
          <img
            width="87"
            height="130"
            className="cover"
            src={'https://www.jieshu.mobi:8181' + course.event_frontcover_filepath}
            alt=""
          />
          <div className="info">
            <div className="name">{course.title}</div>
            <div className="time">
              <label htmlFor="">时间：</label>
              {Moment(course.event_start_date).format("YYYY/MM/DD")}
            </div>
            <div className="address">
              <label htmlFor="">地点：</label>
              {course.address}
            </div>
            <div className="quota">
              <label htmlFor="">人数：</label>
              限{course.max_attendence}人
            </div>

            <div className="period">
              <Period
                course={course}
                images={[
                  require("./assets/period_enrolling.png"),
                  require("./assets/period_ongoing.png"),
                  require("./assets/period_finish.png")
                ]}
              />
            </div>
          </div>
        </Link>
      );
    };

    return (
      <div id="home">
        <Carousel autoplay={false} infinite selectedIndex={0}>
          {[
            "http://www.boluomi.org/assets/images/banner1.png",
            "http://www.boluomi.org/assets/images/banner2.jpg",
            "http://www.boluomi.org/assets/images/banner3.jpg"
          ].map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: "inline-block", width: "100%", height: 136 }}
            >
              <img
                src={`${val}`}
                alt=""
                style={{ width: "100%", verticalAlign: "top" }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                  this.setState({ imgHeight: "auto" });
                }}
              />
            </a>
          ))}
        </Carousel>
        <ListView
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderHeader={() => (
            <header className="tabs">
              <NavLink
                to="/"
                activeClassName="is-selected"
                onClick={this.handleClick}
              >
                <span>全部</span>
              </NavLink>
              <NavLink to="/" activeClassName="is-selected">
                <span>报名中</span>
              </NavLink>
              <NavLink to="/" activeClassName="is-selected">
                <span>哲学</span>
              </NavLink>
              <NavLink to="/" activeClassName="is-selected">
                <span>艺术</span>
              </NavLink>
              <NavLink to="/" activeClassName="is-selected">
                <span>历史</span>
              </NavLink>
              <NavLink to="/" activeClassName="is-selected">
                其他
              </NavLink>
            </header>
          )}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: "center" }}>
              {this.state.isLoading ? "Loading..." : "Loaded"}
            </div>
          )}
          renderBodyComponent={() => <MyBody />}
          renderRow={row}
          renderSeparator={separator}
          pageSize={4}
          useBodyScroll
          onScroll={() => {
            console.log("scroll");
          }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}

export default Home;

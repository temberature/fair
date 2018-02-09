/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from "react";
import ReactDOM from "react-dom";
import { ListView, Carousel } from "antd-mobile";
import axios from "../utils/customAxios";
import "./Home.less";
import { Link, NavLink } from "react-router-dom";
import Moment from "moment";
import Period from "../components/period/Period";
import classNames from 'classnames/bind';

function MyBody(props) {
  return <div className="am-list-body my-body courses">{props.children}</div>;
}

const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 6;
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
      pageIndex: 0,
      hasMore: false,
      type: 0
    };
  }

  componentDidMount() {
    document.title = "OA学院";
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    const height =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;

    axios.get("/RetrieveEventServlet").then(response => {
      console.log(response);
      if (!response.data) {
        return;
      }
      this.setState({
        courses: response.data
      });
      genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(
          dataBlobs,
          sectionIDs,
          rowIDs
        ),
        isLoading: false,
        height: height
      });
    });
  }
  componentWillUnmount() {
    sectionIDs = [];
    rowIDs = [];
  }
  filter = type => {
    this.setState({
      type
    })
    type = ['', '哲学', '艺术', '历史', '文学', '科技'][type];
    axios
      .get("/RetrieveEventServlet", {
        params: {
          event_tag: encodeURIComponent(type)
        }
      })
      .then(response => {
        console.log(response);
        if (!response.data) {
          return;
        }
        this.setState({
          courses: response.data
        });
      });
  };
  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log(this.state);
    if (!this.state.hasMore) {
      return;
    }
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log("reach end", event);
    this.setState({ isLoading: true });
    this.setState(prevState => ({
      pageIndex: prevState.pageIndex + 1
    }));
    axios
      .get("/RetrieveEventServlet?page=" + this.state.pageIndex)
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
  separator = (sectionID, rowID) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: "#E5E5E5",
        width: 335,
        height: 1,
        margin: "0 auto",
        border: 0
      }}
    />
  );
  render() {
    let index = this.state.courses.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.state.courses.length - 1;
      }
      const course = this.state.courses[index--];

      return (
        <Link
          to={"/course/" + course.course_id}
          key={course.course_id}
          className="course"
        >
          <img
            className="cover"
            src={
              "https://www.jieshu.mobi:8181" + course.event_frontcover_filepath
            }
            alt=""
          />
          <div className="info">
            <div className="name">{course.title}</div>
            <div className="time">
              <label htmlFor="">时间：</label>
              {Moment(course.event_start_date).format("YYYY/MM/DD")} ～{" "}
              {Moment(course.event_end_date).format("YYYY/MM/DD")}
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
          {["banner1.png", "banner2.jpg", "banner3.jpg"].map(val => (
            <a key={val} href="http://www.alipay.com">
              <img
                src={`http://www.boluomi.org/assets/images/${val}`}
                alt=""
                style={{ width: "100%", verticalAlign: "top" }}
              />
            </a>
          ))}
        </Carousel>
        <ListView
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderHeader={() => (
            <header className="tabs">
              <span className={classNames({active: this.state.type===0})} onClick={this.filter.bind(this, 0)}>
                全部<span className="mark" />
              </span>
              <span className={classNames({active: this.state.type===1})} onClick={this.filter.bind(this, 1)}>
                哲学<span className="mark" />
              </span>
              <span className={classNames({active: this.state.type===2})} onClick={this.filter.bind(this, 2)}>
                艺术<span className="mark" />
              </span>
              <span className={classNames({active: this.state.type===3})} onClick={this.filter.bind(this, 3)}>
                历史<span className="mark" />
              </span>
              <span className={classNames({active: this.state.type===4})} onClick={this.filter.bind(this, 4)}>
                文学<span className="mark" />
              </span>
              <span className={classNames({active: this.state.type===5})} onClick={this.filter.bind(this, 5)}>
                科技<span className="mark" />
              </span>
            </header>
          )}
          renderFooter={() => (
            <div style={{ padding: 20, textAlign: "center" }}>
              {this.state.isLoading ? "加载中..." : "你来到了宇宙的边界"}
            </div>
          )}
          renderBodyComponent={() => <MyBody />}
          renderRow={row}
          renderSeparator={this.separator}
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}

export default Home;

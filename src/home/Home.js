/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ListView } from "antd-mobile";
import axios from "axios";
import styles from "./Home.less";
import { Carousel, WhiteSpace, WingBlank } from "antd-mobile";


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
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    // simulate initial Ajax
    axios
      .get(
        "https://easy-mock.com/mock/5a3c67260df23b51b3614cfb/RetrieveEventServlet?page=" +
          this.state.pageIndex
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
        "https://easy-mock.com/mock/5a3c67260df23b51b3614cfb/RetrieveEventServlet?page=" +
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
      const now = new Date().getTime();
      let period;
      if (now < course.event_register_deadline) {
        period = 0;
      } else if (now > course.event_start_date && now < course.event_end_date) {
        period = 1;
      } else if (now > course.event_end_date) {
        period = 2;
      }
      function EnrollingPeriod(props) {
        return <img
        src={require('./assets/period_enrolling.png')}
        alt=""
      />;
      }
      
      function OngoingPeriod(props) {
        return <img
        src={require('./assets/period_ongoing.png')}
        alt=""
      />;
      }
      function FinishPeriod(props) {
        return <img
        src={require('./assets/period_finish.png')}
        alt=""
      />;
      }
      function Period(props) {
        const period = props.period;
        if (period === 0) {
          return <EnrollingPeriod />;
        } else if (period === 1) {
          return <OngoingPeriod />;
        } else if (period === 2) {
          return <FinishPeriod />;
        }
        
      }
      return (
        <li key={course.course_id} className="course">
          {/* <img className="banner" src={require(course.event_frontcover_filepath)} /> */}
          <img
            width="87"
            height="130"
            className="cover"
            src={course.event_frontcover_filepath}
            alt=""
          />
          <div className="info">
            <div className="name">{course.title}</div>
            <div className="time">
              <label htmlFor="">时间：</label>
              {course.event_start_date}
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
              <Period period={period} />
            </div>
          </div>
        </li>
      );
    };

    return (
      <div className="home">
        <Carousel
          autoplay={false}
          infinite
          selectedIndex={1}
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={index => console.log("slide to", index)}
        >
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
              <div className="tabs-list">
                <a onClick={this.handleClick}>
                  <span>全部</span>
                </a>
                <a>
                  <span>报名中</span>
                </a>
                <a>
                  <span>哲学</span>
                </a>
                <a>
                  <span>艺术</span>
                </a>
                <a>
                  <span>历史</span>
                </a>
                <a>其他</a>
              </div>
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

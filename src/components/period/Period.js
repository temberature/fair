import React from 'react'

export default class Period extends React.Component {
    render () {
        const { course, images } = this.props;
        if (!course||!images) {
            return null;
        }
        const now = new Date().getTime();
        if (now < course.event_register_deadline) {
          return <img src={images[0]} alt="" />;
        } else if (now > course.event_start_date && now < course.event_end_date) {
          return <img src={images[1]} alt="" />;
        } else if (now > course.event_end_date) {
          return <img src={images[2]} alt="" />;
        } else {
            return <img alt="" />
        }
    }
}
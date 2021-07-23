import React from "react";

class DayData extends React.Component {
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  render() {
    let date = new Date();
    date.setTime(this.props.dt * 1000);
    
    return (
      <li>
        <div>{this.days[date.getDay()]}</div>
        <div>{ Math.floor(this.props.temp) }&deg;C</div>
      </li>
    );
  }
}

export default DayData;
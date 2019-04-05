import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

import 'antd/lib/date-picker/style/index.css';
import './client.css';

class App extends Component {

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <img width="100" src="/assets/js.svg" />
        <div>
          <DatePicker onChange={this.onChange} />
          <br />
          <MonthPicker onChange={this.onChange} placeholder="Select month" />
          <br />
          <RangePicker onChange={this.onChange} />
          <br />
          <WeekPicker onChange={this.onChange} placeholder="Select week" />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


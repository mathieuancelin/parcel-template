import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <img width="100" src="/assets/js.svg" />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


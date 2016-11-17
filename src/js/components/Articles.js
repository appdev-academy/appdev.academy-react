import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('appState')
@observer
class Articles extends Component {
  render() {
    return (
      <div>
        <button onClick={this.onReset}>
          Seconds passed: {this.props.appState.timer}
        </button>
      </div>
    );
  }

  onReset = () => {
    this.props.appState.resetTimer();
  }
};

export default Articles;
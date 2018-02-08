import React from "react"
import { connect } from "react-redux"

import doSomethingActions from "../actions/primaryActions"

// Transfer store data to props for this class
@connect((store) => {
  return {
    primaryData: store.primaryData,
  };
})
export default class Main extends React.Component {
  componentWillMount() {
    this.props.dispatch(doSomethingActions.doSomething())
  }

  doSomethingMore() {
    this.props.dispatch(doSomethingActions.doSomething())
  }

  render() {
      let { primaryData } = this.props;
      return <div>
        <button onClick={this.doSomethingMore.bind(this)}>Randomize</button>
        <div>
        <span><strong>Response from action : </strong>{primaryData.data}</span>
        </div>
      </div>
  }
}

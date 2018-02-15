import React from "react"
import {
  Panel,
  Button,
  Grid, Row, Col
} from 'react-bootstrap';

import {
  CurrentActivity,
  Walking
} from '../widgets'

export default class Activity extends React.Component {

  static propTypes = {
    walkCount: React.PropTypes.number.isRequired,
    stillCount: React.PropTypes.number.isRequired,
    crouchCount: React.PropTypes.number.isRequired,
    currentActivity: React.PropTypes.string.isRequired,
    handleStopActivity: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <CurrentActivity currActivity={this.props.currentActivity} handleStopActivity={this.props.handleStopActivity}/>
        <Walking walkCount={this.props.walkCount}/>

      </div>);
  }
}
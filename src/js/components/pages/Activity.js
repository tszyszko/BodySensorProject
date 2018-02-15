import React from "react"
import {
  Panel,
  Button,
  Grid, Row, Col
} from 'react-bootstrap';

import {
  CurrentActivity,
  Walking,
  WorkoutStats
} from '../widgets'

export default class Activity extends React.Component {

  static propTypes = {
    walkCount: React.PropTypes.number.isRequired,
    stillCount: React.PropTypes.number.isRequired,
    crouchCount: React.PropTypes.number.isRequired,
    currentActivity: React.PropTypes.string.isRequired,
    handleStopActivity: React.PropTypes.func.isRequired,
    startTime: React.PropTypes.number
  }

  render() {
    return (
      <div>
        <CurrentActivity currActivity={this.props.currentActivity} handleStopActivity={this.props.handleStopActivity}/>
        {this.props.startTime? <WorkoutStats startTime={this.props.startTime}/> : null}
        <Walking walkCount={this.props.walkCount}/>

      </div>);
  }
}
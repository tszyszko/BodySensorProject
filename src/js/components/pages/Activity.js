import React from "react"
import {
  Panel,
  Button,
  Grid, Row, Col
} from 'react-bootstrap';

import {
  CurrentActivity,
  Walking,
  WorkoutStats,
  Pressup
} from '../widgets'

export default class Activity extends React.Component {

  static propTypes = {
    walkEvents: React.PropTypes.array.isRequired, 
    pressupEvents: React.PropTypes.array.isRequired,
    currentActivity: React.PropTypes.string.isRequired,
    handleStopActivity: React.PropTypes.func.isRequired,
    startTime: React.PropTypes.number
  }



  render() {
    return (
      <div>
        <CurrentActivity currActivity={this.props.currentActivity} handleStopActivity={this.props.handleStopActivity}/>
        {this.props.startTime? <WorkoutStats startTime={this.props.startTime}/> : null}
        <Walking walkEvents={this.props.walkEvents}/>
        <Pressup pressupEvents={this.props.pressupEvents}/>
      </div>);
  }
}
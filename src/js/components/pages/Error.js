import React from "react"
import {
  Alert,
  Button
} from 'react-bootstrap';

export default class Error extends React.Component {

  static propTypes = {
    handleDismiss:   React.PropTypes.func.isRequired,
    error: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <Alert bsStyle="danger" onDismiss={this.props.handleDismiss}>
          <h4>Oh snap! You got an error!</h4>
          {this.props.error}
          <p>
            <Button onClick={this.props.handleDismiss}>Start again!</Button>
          </p>
        </Alert>
      </div>);
  }
}

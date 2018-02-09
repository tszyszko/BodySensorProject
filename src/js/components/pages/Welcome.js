import React from "react"
import {
  Jumbotron,
  Button
} from 'react-bootstrap';

export default class Welcome extends React.Component {

  static propTypes = {
    onChange:   React.PropTypes.func
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple exercise aid using sensixa's e-AR device to help you track your exercises
          </p>
          <p>
            <Button bsStyle="primary" onClick={this.props.onChange}>Get Started</Button>
          </p>
        </Jumbotron>;
      </div>);
  }
}

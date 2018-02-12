import React from "react"
import {
  Jumbotron,
  Button
} from 'react-bootstrap';

export default class Loading extends React.Component {

  static propTypes = {

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

          </p>
        </Jumbotron>;
      </div>);
  }
}

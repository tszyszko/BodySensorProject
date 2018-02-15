import React from "react"
import {
  Jumbotron
} from 'react-bootstrap';
import {
  Icon
} from 'react-fa';

export default class Loading extends React.Component {

  static propTypes = {

  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Connecting .......</h1>
          <p>
            Please select e-AR2016 from the drop-down list
            <Icon spin name="spinner" size="lg"/>
          </p>
          <p>

          </p>
        </Jumbotron>
      </div>);
  }
}

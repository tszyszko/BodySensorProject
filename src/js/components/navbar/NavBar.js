import React from "react"
import {connect} from "react-redux"

import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';

// Transfer store data to props for this class
// @connect((store) => {
//     return {
//         primaryData: store.primaryData,
//     };
// })

export default class NavBar extends React.Component {
  static propTypes = {
    onChange:   React.PropTypes.func
  }

  componentWillMount() {
    // this.props.dispatch(doSomethingActions.doSomething())
  }


  render() {
    return <Navbar inverse fixedTop fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#" onClick={this.props.onChange}>Body Sensor Rep Counter</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    </Navbar>;
  }
}
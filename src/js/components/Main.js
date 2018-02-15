import React from "react";
import {
  connect
} from "react-redux";

import {
  NavigationActions
} from "../actions/navigation";



import NavBar from "./navbar/NavBar";
import {
  Welcome,
  Error,
  Loading,
  Activity
} from "./pages";

import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import './Main.scss';

const mapStateToProps = (state) => {
  return {
    ...state,
    curr_view: state.navigation.curr_view,
    error: state.bluetooth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initPage: () => dispatch(NavigationActions.navigateToHomePage()),
    startButtonHandler: () => dispatch(NavigationActions.navigateToConnectPage()),
    handleStopActivity: () => dispatch(NavigationActions.navigateToSummaryPage())
  }
};


class Main extends React.Component {
  componentWillMount() {
    this.props.initPage();
  }

  componentWillReceiveProps(props) {

  }


  // Choose correct page


  loadPage() {
    // Display error if error
    if (this.props.error) {
      return (<Error handleDismiss={this.props.initPage} error={this.props.error.toString()} />)
    } else if (this.props.curr_view){
      switch(this.props.curr_view) {
        case "home":  return (<Welcome onChange={this.props.startButtonHandler}/>);
        case "bluetooth_connect": return (<Loading />);
        case "activity_view" : return (<Activity walkCount={this.props.activity.walkCount}
                                                 crouchCount={this.props.activity.crouchCount}
                                                 stillCount={this.props.activity.stillCount}
                                                 handleStopActivity={this.props.handleStopActivity}
                                                 currentActivity={this.props.activity.currentActivity}
        />);
        default:
          return null
      }
    }
    return "Loading";


  }

  render() {
      let { primaryData } = this.props;
      return (

          <Grid fluid className="bg-1">
            <Row>
              <NavBar onChange={this.props.initPage}/>
            </Row>
            <Row>
              {this.loadPage()}
            </Row>


            {/*<Activity walkCount={this.props.activity.walkCount}*/}
                      {/*crouchCount={this.props.activity.crouchCount}*/}
                      {/*stillCount={this.props.activity.stillCount}*/}
            {/*/>*/}
          </Grid>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
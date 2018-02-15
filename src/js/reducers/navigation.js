import {
  NAVIGATION_CONNECT_PAGE,
  NAVIGATION_HOME_PAGE,
  NAVIGATION_ACTIVITY_PAGE,
  NAVIGATION_SUMMARY_PAGE
} from "../actions/navigation";


let initial_state = {
  curr_view: "",
  error: false
};


const handleNavigationHomePage = (state) => {
  return {
    ...state,
    curr_view: "home"
  }
};

const handleNavigationConnectPage = (state) => {
  return {
    ...state,
    curr_view: "bluetooth_connect"
  }
};

const handleNavigationActivityPage = (state) => {
  return {
    ...state,
    curr_view: "activity_view"
  }
};

const handleNavigationSummaryPage = (state) => {
  return {
    ...state,
    curr_view: "summary_view"
  }
};


// A single reducer
export default function reducer(state=initial_state, action) {

    switch (action.type) {
      case NAVIGATION_HOME_PAGE:
        return handleNavigationHomePage(state);
      case NAVIGATION_CONNECT_PAGE:
        return handleNavigationConnectPage(state);
      case NAVIGATION_ACTIVITY_PAGE:
        return handleNavigationActivityPage(state);
      case NAVIGATION_SUMMARY_PAGE:
        return handleNavigationSummaryPage(state);
    }
    return state
}

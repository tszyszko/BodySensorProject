import {
  NAVIGATION_CONNECT_PAGE,
  NAVIGATION_HOME_PAGE
} from "../actions/navigation";


let initial_state = {
  curr_view: "",
  error: false
}


const handleNavigationHomePage = (state) => {
  return {
    ...state,
    curr_view: "home"
  }
}

const handleNavigationConnectPage = (state) => {
  return {
    ...state,
    curr_view: "bluetooth_connect"
  }
}


// A single reducer
export default function reducer(state=initial_state, action) {

    switch (action.type) {
      case NAVIGATION_HOME_PAGE:
        return handleNavigationHomePage(state);
      case NAVIGATION_CONNECT_PAGE:
        return handleNavigationConnectPage(state);
    }
    return state
}

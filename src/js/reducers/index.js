import { combineReducers } from "redux"

import navigation from "./navigation"
import bluetooth from "./bluetooth"
import activity from "./activity"

export default combineReducers({
  navigation,
  bluetooth,
  activity
  // add more reducers here
})

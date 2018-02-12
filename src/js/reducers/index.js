import { combineReducers } from "redux"

import navigation from "./navigation"
import bluetooth from "./bluetooth"

export default combineReducers({
  navigation,
  bluetooth
  // add more reducers here
})

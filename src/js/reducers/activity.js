import {
  ACTIVITY_WALK_EVENT,
  ACTIVITY_STILL_EVENT,
  ACTIVITY_CROUCH_EVENT
} from "../actions/activity";


let initial_state = {
  walkCount: 0,
  stillCount: 0,
  crouchCount: 0
};


const handleWalkEvent = (state) => {
  return {
    ...state,
    walkCount: state.walkCount + 1
  }
};

const handleStillEvent = (state) => {
  return {
    ...state,
    stillCount: state.stillCount + 1
  }
};

const handleCrouchEvent = (state) => {
  return {
    ...state,
    crouchCount: state.crouchCount + 1
  }
};


// A single reducer
export default function reducer(state=initial_state, action) {

  switch (action.type) {
    case ACTIVITY_WALK_EVENT:
      return handleWalkEvent(state);
    case ACTIVITY_STILL_EVENT:
      return handleStillEvent(state);
    case ACTIVITY_CROUCH_EVENT:
      return handleCrouchEvent(state);
  }
  return state
}
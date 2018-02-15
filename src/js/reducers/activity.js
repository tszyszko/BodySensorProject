import {
  ACTIVITY_WALK_EVENT,
  ACTIVITY_STILL_EVENT,
  ACTIVITY_CROUCH_EVENT,
  ACTIVITY_START_EVENT,
  ACTIVITY_STOP_EVENT
} from "../actions/activity";


let initial_state = {
  recording: false,
  walkCount: 0,
  stillCount: 0,
  crouchCount: 0,
  currentActivity: "Waiting for data",
  walkEvents: [],
  startTime: null,
  stopTime: null
};


const handleWalkEvent = (state, time) => {
  return {
    ...state,
    walkCount: state.walkCount + 1,
    currentActivity: "walk",
    walkEvents: [...state.walkEvents, time]
  }
};

const handleStillEvent = (state) => {
  return {
    ...state,
    stillCount: state.stillCount + 1,
    currentActivity: "still"
  }
};

const handleCrouchEvent = (state) => {
  return {
    ...state,
    crouchCount: state.crouchCount + 1,
    currentActivity: "crouch"
  }
};

const handleStartEvent = (state, time) => {
  return {
    ...state,
    startTime: time,
    recording: true,
    walkEvents: []
  }
};

const handleStopEvent = (state, time) => {
  return {
    ...state,
    stopTime: time,
    recording: stop
  }
};


// A single reducer
export default function reducer(state=initial_state, action) {

  switch (action.type) {
    case ACTIVITY_WALK_EVENT:
      return handleWalkEvent(state, action.time);
    case ACTIVITY_STILL_EVENT:
      return handleStillEvent(state);
    case ACTIVITY_CROUCH_EVENT:
      return handleCrouchEvent(state);
    case ACTIVITY_START_EVENT:
      return handleStartEvent(state, action.time);
    case ACTIVITY_STOP_EVENT:
      return handleStopEvent(state, action.time);
  }
  return state
}
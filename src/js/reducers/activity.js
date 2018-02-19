import {
  ACTIVITY_WALK_EVENT,
  ACTIVITY_STILL_EVENT,
  ACTIVITY_CROUCH_EVENT,
  ACTIVITY_START_EVENT,
  ACTIVITY_STOP_EVENT,
  ACTIVITY_PRESSUP_EVENT
} from "../actions/activity";


let initial_state = {
  recording: false,
  currentActivity: "Waiting for data",
  walkEvents: [],
  pressupEvents: [],
  startTime: null,
  stopTime: null
};


const handleWalkEvent = (state, time) => {
  return {
    ...state,
    currentActivity: "walk",
    walkEvents: [...state.walkEvents, time]
  }
};

const handleStillEvent = (state) => {
  return {
    ...state,
    currentActivity: "still"
  }
};

const handleCrouchEvent = (state) => {
  return {
    ...state,
    currentActivity: "crouch"
  }
};

const handleStartEvent = (state, time) => {
  return {
    ...state,
    startTime: time,
    stopTime: null,
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


const handlePressupEvent = (state, time) => {
  return {
    ...state,
    currentActivity: "pressup",
    pressupEvents: [...state.pressupEvents, time]
  }
};


// A single reducer
export default function reducer(state=initial_state, action) {

  switch (action.type) {
    case ACTIVITY_WALK_EVENT:
      return handleWalkEvent(state, action.time);
    case ACTIVITY_PRESSUP_EVENT:
      return handlePressupEvent(state, action.time);
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
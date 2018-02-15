// Activity events

export let ACTIVITY_WALK_EVENT = "ACTIVITY_WALK_EVENT";
export let ACTIVITY_CROUCH_EVENT = "ACTIVITY_CROUCH_EVENT";
export let ACTIVITY_STILL_EVENT = "ACTIVITY_STILL_EVENT";
export let ACTIVITY_START_EVENT = "ACTIVITY_START_EVENT";
export let ACTIVITY_STOP_EVENT = "ACTIVITY_STOP_EVENT";


export let ActivityActions = {
  walkEvent: (timestamp) => ({
    type: ACTIVITY_WALK_EVENT,
    time: timestamp
  }),

  crouchEvent: () => ({
    type: ACTIVITY_CROUCH_EVENT
  }),

  stillEvent: () => ({
    type: ACTIVITY_STILL_EVENT
  }),

  startEvent: (timestamp) => ({
    type: ACTIVITY_START_EVENT,
    time: timestamp
  }),

  stopEvent: (timestamp) => ({
    type: ACTIVITY_STOP_EVENT,
    time: timestamp
  })

}
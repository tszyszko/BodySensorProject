// Activity events

export let ACTIVITY_WALK_EVENT = "ACTIVITY_WALK_EVENT";
export let ACTIVITY_CROUCH_EVENT = "ACTIVITY_CROUCH_EVENT";
export let ACTIVITY_STILL_EVENT = "ACTIVITY_STILL_EVENT";


export let ActivityActions = {
  walkEvent: () => ({
    type: ACTIVITY_WALK_EVENT,
  }),

  crouchEvent: () => ({
    type: ACTIVITY_CROUCH_EVENT
  }),

  stillEvent: () => ({
    type: ACTIVITY_STILL_EVENT
  })

}
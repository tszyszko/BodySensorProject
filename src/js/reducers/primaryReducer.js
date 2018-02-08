// A single reducer
export default function reducer(state={
    data: "",
    error: null,
  }, action) {

    switch (action.type) {
      case "DO_SOMETHING": {
      	// returns a copy of the state with new data
        return {...state, data: action.payload.data,error:false }
      }
    }
    return state
}

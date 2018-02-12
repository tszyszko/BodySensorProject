import {
  BLUETOOTH_INIT,
  BLUETOOTH_CONNECTED,
  BLUETOOTH_FAILED
} from "../actions/bluetooth";


let initial_state = {
  connected: false,
  pending: false,
  error: false
}


const handleBluetoothInit = (state) => {
  return {
    ...state,
    pending: true,
    connected: false,
    error: false
  }
}

const handleBluetoothConnected = (state) => {
  return {
    ...state,
    pending: false,
    connected: true,
    error: false
  }
}

const handleBluetoothError = (state, error) => {
  return {
    ...state,
    error,
    pending: false
  }
}


// A single reducer
export default function reducer(state=initial_state, action) {

  switch (action.type) {
    case BLUETOOTH_INIT:
      return handleBluetoothInit(state);
    case BLUETOOTH_CONNECTED:
      return handleBluetoothConnected(state);
    case BLUETOOTH_FAILED:
      return handleBluetoothError(state, action.error);
  }
  return state
}

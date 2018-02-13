// Bluetooth events

export let BLUETOOTH_INIT = "BLUETOOTH_INIT";
export let BLUETOOTH_CONNECTED = "BLUETOOTH_CONNECTED";
export let BLUETOOTH_FAILED = "BLUETOOTH_FAILED";
export let BLUETOOTH_RESET = "BLUETOOTH_RESET";


export let BluetoothActions = {
  bluetoothInit: () => ({
    type: BLUETOOTH_INIT,
  }),

  bluetoothConnected: () => ({
    type: BLUETOOTH_CONNECTED
  }),

  bluetoothError: (msg) => ({
    type: BLUETOOTH_FAILED,
    error: msg
  }),

  bluetoothReset: (msg) => ({
    type: BLUETOOTH_RESET
  })


}
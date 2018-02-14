import { takeLatest, fork, put, call } from 'redux-saga/effects';

import {
  BLUETOOTH_INIT,
  BLUETOOTH_CONNECTED,
  BLUETOOTH_FAILED,
  BluetoothActions,
  BLUETOOTH_RESET
} from "../actions/bluetooth"

import {
  BluetoothConnect,
  BluetoothPromptToScanDevice
} from "../utilities"
import {NavigationActions} from "../actions/navigation";


export default function* bluetoothSagas() {
  yield takeLatest(BLUETOOTH_INIT, handleBluetoothInit);
}


function isWebBluetoothEnabled() {
  return !!navigator.bluetooth;
}

function* handleError(msg) {
  yield put(BluetoothActions.bluetoothError(msg));
}



function* handleBluetoothInit() {

  let enableBT = yield call(isWebBluetoothEnabled);
  if (!enableBT) yield handleError('Web Bluetooth API is not available.\n' +
    'Please make sure the "Experimental Web Platform features" flag is enabled. (in chrome://flags)');
  else {
    try {
      let callbacks = {
          handleIMUNotifications: () => {},
          handleTemperatureNotifications: () => {},
          handleAccelNotifications: () => {}
      };
      let device = yield call(BluetoothPromptToScanDevice);
      let connect = yield call(BluetoothConnect, device, callbacks);
      if (connect) {
        yield put(BluetoothActions.bluetoothConnected());
        yield put(NavigationActions.navigateToActivityPage());
      }
    } catch(error) {
      yield handleError(error);
    }
  }
}
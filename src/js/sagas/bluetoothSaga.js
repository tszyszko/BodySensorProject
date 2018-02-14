import { takeLatest, fork, put, call, take } from 'redux-saga/effects';
import { buffers, eventChannel, END } from 'redux-saga';

import { NaiveBayesClassifier } from '../classifiers/naivebayes';
import { ActivityActions } from '../actions/activity'

let classifier;

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



function createBluetoothEventChannel() {
  return eventChannel(emitter => {
    const update = (data) => {
      emitter({data});
    };
    classifier = new NaiveBayesClassifier(update);

    return () => {};
  })
}

function* handleClassifierEvents(channel) {
  while (true) {
    const action = yield take(channel);
    switch (action.data.type) {
      case 'walk':
        yield put(ActivityActions.walkEvent());
        break;
      case 'still':
        yield put(ActivityActions.stillEvent());
        break;
      case 'crouch':
        yield put(ActivityActions.crouchEvent());
        break;
      default:
    }
    // console.log(action);
  }
}



function* handleBluetoothInit() {

  let enableBT = yield call(isWebBluetoothEnabled);
  if (!enableBT) yield handleError('Web Bluetooth API is not available.\n' +
    'Please make sure the "Experimental Web Platform features" flag is enabled. (in chrome://flags)');
  else {
    try {
      const channel = yield call(createBluetoothEventChannel);
      let callbacks = {
          handleIMUNotifications: classifier.handleIMUNotifications,
          handleTemperatureNotifications: () => {},
          handleAccelNotifications: () => {}
      };
      let device = yield call(BluetoothPromptToScanDevice);
      let connect = yield call(BluetoothConnect, device, callbacks);
      if (connect) {
        yield put(BluetoothActions.bluetoothConnected());
        yield put(NavigationActions.navigateToActivityPage());
        yield fork(handleClassifierEvents, channel);
      }
    } catch(error) {
      yield handleError(error);
    }
  }
}
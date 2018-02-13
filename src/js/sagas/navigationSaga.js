import { takeLatest, fork, put } from 'redux-saga/effects';

import {
  NAVIGATION_CONNECT_PAGE,
  NAVIGATION_HOME_PAGE,
} from "../actions/navigation";

import {
  BluetoothActions
} from "../actions/bluetooth"



function* handleBluetoothNav() {
  yield put(BluetoothActions.bluetoothInit());
}

function* handleHomeNav() {
  yield put(BluetoothActions.bluetoothReset());
}


export default function* navigationSagas() {
  yield takeLatest(NAVIGATION_CONNECT_PAGE, handleBluetoothNav);
  yield takeLatest(NAVIGATION_HOME_PAGE, handleHomeNav);
}
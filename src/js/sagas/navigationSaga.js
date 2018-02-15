import { takeLatest, fork, put } from 'redux-saga/effects';

import {
  NAVIGATION_CONNECT_PAGE,
  NAVIGATION_HOME_PAGE,
  NAVIGATION_SUMMARY_PAGE
} from "../actions/navigation";

import {
  BluetoothActions
} from "../actions/bluetooth"

import {
  ActivityActions
} from "../actions/activity"


function* handleBluetoothNav() {
  yield put(BluetoothActions.bluetoothInit());
}

function* handleHomeNav() {
  yield put(BluetoothActions.bluetoothReset());
}

function* handleSummNav() {
  yield put(ActivityActions.stopEvent(Date.now()));
}

export default function* navigationSagas() {
  yield takeLatest(NAVIGATION_CONNECT_PAGE, handleBluetoothNav);
  yield takeLatest(NAVIGATION_HOME_PAGE, handleHomeNav);
  yield takeLatest(NAVIGATION_SUMMARY_PAGE, handleSummNav);
}
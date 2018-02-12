import { fork } from 'redux-saga/effects';
import navigationSaga from './navigationSaga';
import bluetoothSaga from './bluetoothSaga';


export default function* sagas() {
  yield fork(navigationSaga);
  yield fork(bluetoothSaga);
}
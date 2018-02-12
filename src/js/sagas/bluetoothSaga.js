import { takeLatest, fork, put, call } from 'redux-saga/effects';

import {
  BLUETOOTH_INIT,
  BLUETOOTH_CONNECTED,
  BLUETOOTH_FAILED,
  BluetoothActions
} from "../actions/bluetooth"


function init()
{
  if (isWebBluetoothEnabled())
  {
    console.log("BLE is enabled!");
  }
  else {
    console.log("BLE is not enabled in this web browser!")
  }
}

function isWebBluetoothEnabled() {
  if (navigator.bluetooth) {
    return true;
  } else {
    alert('Web Bluetooth API is not available.\n' +
      'Please make sure the "Experimental Web Platform features" flag is enabled. (in chrome://flags)');
    return false;
  }
}

function onDiscoverService() {

  //start searching for BLE devices

  // Validate services UUID entered by user first.
  let optionalServices=['47442014-0f63-5b27-9122-728099603712'];//BSN IoT (note UUID lower case)
  console.log('Requesting any Bluetooth Device...');
  navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: optionalServices//BSN IoT
  })
    .then(device => {
      console.log('Connecting to GATT Server...');
      return device.gatt.connect();
    })
    .then(server => {
      // Note that we could also get all services that match a specific UUID by
      // passing it to getPrimaryServices().
      console.log('Getting Services...');
      return server.getPrimaryServices();
    })
    .then(services => {
      console.log('Getting Characteristics...');
      let queue = Promise.resolve();
      services.forEach(service => {
        queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
          if (service.uuid==['47442014-0f63-5b27-9122-728099603712'])//looking for e-AR sensor
          {
            console.log("> Service: BSN IoT");//got it
            var canvastable=document.getElementById("canvastable");
            canvastable.hidden=false;
            var instructables=document.getElementById("instructions");
            instructables.hidden=true;
            draw();
          }
          else if (service.uuid==['0000180a-0000-1000-8000-00805f9b34fb'])//this is device information
          {
            console.log("> Service: Device Info");
          }
          else console.log('> Service: ' + service.uuid);//other services
          //scan for all characteristics of the service
          characteristics.forEach(characteristic => {
            if (characteristic.uuid==['47442015-0f63-5b27-9122-728099603712'])
            {// console.log(">> Characteristic: Accelerometer");
              return characteristic.startNotifications().then(_ => {
                //console.log('> Notifications started');
                characteristic.addEventListener('characteristicvaluechanged',
                  handleAccelNotifications);
              });
            }
            else if (characteristic.uuid==['47442016-0f63-5b27-9122-728099603712'])
            {//console.log(">> Characteristic: Gyroscope");
            }
            else if (characteristic.uuid==['47442017-0f63-5b27-9122-728099603712'])
            {//console.log(">> Characteristic: Magnetometer");
            }
            else if (characteristic.uuid==['47442018-0f63-5b27-9122-728099603712'])
            {// console.log(">> Characteristic: Temperature");
              return characteristic.startNotifications().then(_ => {
                //console.log('> Notifications started');
                //set the event listener for this characteristic
                characteristic.addEventListener('characteristicvaluechanged',
                  handleTemperatureNotifications);
              });
            }
            else if (characteristic.uuid==['47442019-0f63-5b27-9122-728099603712'])
            {//   console.log(">> Characteristic: Humidity");
            }
            else if (characteristic.uuid==['4744201a-0f63-5b27-9122-728099603712'])
            {//  console.log(">> Characteristic: LED");
            }
            else if (characteristic.uuid==['4744201b-0f63-5b27-9122-728099603712'])
            {//   console.log(">> Characteristic: Screen message");
            }
            else if (characteristic.uuid==['4744201c-0f63-5b27-9122-728099603712'])
            {//  console.log(">> Characteristic: iBeacon");
            }
            else if (characteristic.uuid==['4744201d-0f63-5b27-9122-728099603712'])
            {//    console.log(">> Characteristic: Dust");
            }
            else if (characteristic.uuid==['4744201e-0f63-5b27-9122-728099603712'])
            {// console.log(">> Characteristic: PPG");
            }
            else if (characteristic.uuid==['4744201f-0f63-5b27-9122-728099603712'])
            {//  console.log(">> Characteristic: Touch");
            }
            else if (characteristic.uuid==['47442020-0f63-5b27-9122-728099603712'])
            {//   console.log(">> Characteristic: IMU");
              return characteristic.startNotifications().then(_ => {
                //console.log('> Notifications started');
                //set the event listener for this characteristic
                characteristic.addEventListener('characteristicvaluechanged',
                  handleIMUNotifications);
              });
            }
            else if (characteristic.uuid==['47442021-0f63-5b27-9122-728099603712'])
            {// console.log(">> Characteristic: Sampling Frequency");
            }
            else if (characteristic.uuid==['47442022-0f63-5b27-9122-728099603712'])
            {//  console.log(">> Characteristic: Sampling Frequency Read");
            }
            else if (characteristic.uuid==['47442023-0f63-5b27-9122-728099603712'])
            {//   console.log(">> Characteristic: Reset");
            }
            else if (characteristic.uuid==['47442024-0f63-5b27-9122-728099603712'])
            {//   console.log(">> Characteristic: IMU Power mode");
            }
            else if (characteristic.uuid==['47442025-0f63-5b27-9122-728099603712'])
            {//  console.log(">> Characteristic: Advert Time Interval");
            }
            else if (characteristic.uuid==['47442026-0f63-5b27-9122-728099603712'])
            {//  console.log(">> Characteristic: Battery");
            }
            else if (characteristic.uuid==['47442027-0f63-5b27-9122-728099603712'])
            {// console.log(">> Characteristic: Write to Flash");
            }
            else if (characteristic.uuid==['47442028-0f63-5b27-9122-728099603712'])
            {// console.log(">> Characteristic: Read from Flash");
            }
            else if (characteristic.uuid==['00002a29-0000-1000-8000-00805f9b34fb'])
            {//console.log(">> Characteristic: Manufacturer");
            }
            else
              console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
                getSupportedProperties(characteristic));//other characteristics
          });
        }));
      });
      return queue;
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
}


function* handleBluetoothInit() {
  yield call(init);
  yield call(onDiscoverService);

}

export default function* bluetoothSagas() {
  yield takeLatest(BLUETOOTH_INIT, handleBluetoothInit);
}
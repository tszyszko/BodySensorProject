


export function BluetoothPromptToScanDevice() {
  let optionalServices = ['47442014-0f63-5b27-9122-728099603712'];//BSN IoT (note UUID lower case)
  console.log('Requesting any Bluetooth Device...');
  return navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: optionalServices//BSN IoT
  })
}

export function BluetoothConnect(device) {
  return device.gatt.connect().then(server => {
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
        if (service.uuid == ['47442014-0f63-5b27-9122-728099603712'])//looking for e-AR sensor
        {
          console.log("> Service: BSN IoT");//got it
        }
        else if (service.uuid == ['0000180a-0000-1000-8000-00805f9b34fb'])//this is device information
        {
          console.log("> Service: Device Info");
        }
        else console.log('> Service: ' + service.uuid);//other services
        //scan for all characteristics of the service
        characteristics.forEach(characteristic => {
          if (characteristic.uuid == ['47442015-0f63-5b27-9122-728099603712']) {// console.log(">> Characteristic: Accelerometer");
            return characteristic.startNotifications().then(_ => {
              //console.log('> Notifications started');
              characteristic.addEventListener('characteristicvaluechanged',
                handleAccelNotifications);
            });
          }
          else if (characteristic.uuid == ['47442018-0f63-5b27-9122-728099603712']) {// console.log(">> Characteristic: Temperature");
            return characteristic.startNotifications().then(_ => {
              //console.log('> Notifications started');
              //set the event listener for this characteristic
              characteristic.addEventListener('characteristicvaluechanged',
                handleTemperatureNotifications);
            });
          }
          else if (characteristic.uuid == ['47442020-0f63-5b27-9122-728099603712']) {//   console.log(">> Characteristic: IMU");
            return characteristic.startNotifications().then(_ => {
              //console.log('> Notifications started');
              //set the event listener for this characteristic
              characteristic.addEventListener('characteristicvaluechanged',
                handleIMUNotifications);
            });
          }
        });
      }));
      return queue;
    }).then(() => true)
  });
}


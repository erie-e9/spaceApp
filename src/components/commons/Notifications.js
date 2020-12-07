import React, { useEffect } from 'react'
import OneSignal from 'react-native-onesignal';

const config = () => {
  // Remove this method to stop OneSignal Debugging
  // OneSignal.setLogLevel(6, 0);
  useEffect(() => {
    let isUnMounted = false
    OneSignal.init('7df7e613-b790-43dd-9fda-f9d97f93b190', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    }
    
		return () => {
			isUnMounted = true
		}
  }, [])
  //   onReceived = (notification) => {
  //   console.log('Notification received: ', notification);
  //   }

  //   onOpened = (openResult) => {
  //   console.log('Message: ', openResult.notification.payload.body);
  //   console.log('Data: ', openResult.notification.payload.additionalData);
  //   console.log('isActive: ', openResult.notification.isAppInFocus);
  //   console.log('openResult: ', openResult);
  //   }

//   onIds = (device) => {
//   console.log('Device info: ', device);
//   }
}

export {
  config,
}

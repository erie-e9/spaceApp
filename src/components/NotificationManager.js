// import React, { Component } from 'react';
// import OneSignal from 'react-native-onesignal'; // Import package from node modules

// export default class App extends Component {

// constructor(properties) {
//   super(properties);
//   //Remove this method to stop OneSignal Debugging 
//   OneSignal.setLogLevel(6, 0);
  
//   // Replace '7df7e613-b790-43dd-9fda-f9d97f93b190' with your OneSignal App ID.
//   OneSignal.init("7df7e613-b790-43dd-9fda-f9d97f93b190", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
//   OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
  
//   // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
//   OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

//    OneSignal.addEventListener('received', this.onReceived);
//    OneSignal.addEventListener('opened', this.onOpened);
//    OneSignal.addEventListener('ids', this.onIds);
// }
//   componentWillUnmount() {
//     OneSignal.removeEventListener('received', this.onReceived);
//     OneSignal.removeEventListener('opened', this.onOpened);
//     OneSignal.removeEventListener('ids', this.onIds);
//   }

//   onReceived(notification) {
//     console.log("Notification received: ", notification);
//   }

//   onOpened(openResult) {
//     console.log('Message: ', openResult.notification.payload.body);
//     console.log('Data: ', openResult.notification.payload.additionalData);
//     console.log('isActive: ', openResult.notification.isAppInFocus);
//     console.log('openResult: ', openResult);
//   }

//   onIds(device) {
//     console.log('Device info: ', device);
//   }
// }
// function myiOSPromptCallback(permission){
//     // do something with permission value
// }
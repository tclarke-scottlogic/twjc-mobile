// We count on there being a nativeSdk.js file in the root of any of
// the containers hosting mobile-notifications-core
import firebase from "react-native-firebase";

export const nativeSdk = {
  firebase: {
    init: () => firebase,
    modules: {
      Admob: firebase.admob.nativeModuleExists,
      Analytics: firebase.analytics.nativeModuleExists,
      Authentication: firebase.auth.nativeModuleExists,
      Crashlytics: firebase.crashlytics.nativeModuleExists,
      "Cloud Firestore": firebase.firestore.nativeModuleExists,
      "Cloud Messaging": firebase.messaging.nativeModuleExists,
      "Dynamic Links": firebase.links.nativeModuleExists,
      "Instance ID": firebase.iid.nativeModuleExists,
      Notifications: firebase.notifications.nativeModuleExists,
      "Performance Monitoring": firebase.perf.nativeModuleExists,
      "Realtime Database": firebase.database.nativeModuleExists,
      "Remote Config": firebase.config.nativeModuleExists,
      Storage: firebase.storage.nativeModuleExists
    }
  }
};

export const firebaseApp =
  nativeSdk && nativeSdk.firebase ? nativeSdk.firebase.init() : null;

export const push = nativeSdk && nativeSdk.push ? nativeSdk.push : null;

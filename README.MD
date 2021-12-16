## I. How to start
* yarn install
### 1. Run instructions for Android:
* yarn android
  
### 2.Run instructions for iOS:
* yarn ios

## II. How to build

### 1. For android
Follow [this link](https://www.instamobile.io/android-development/generate-react-native-release-build-android/) to setup key and generate ```.apk``` file

### 2. For Ios
Follow [this link](https://docs.saucelabs.com/mobile-apps/automated-testing/ipa-files/) to create ```.api``` or ```.app``` bundle

## III. How to debug

Note: React native can't debug using Remote react native debugger. Following the statement from [react-hook-reanimated](https://docs.swmansion.com/react-native-reanimated/docs):
> As the library uses JSI for synchronous native methods access, remote debugging is no longer possible. You can use Flipper for debugging your JS code, however connecting debugger to JS context which runs on the UI thread is not currently supported.

### Use Flipper for debugging task: 
1. Install [Flipper](https://fbflipper.com/) for checking network, log, etc.. 
2. Open Flipper and choose Emulator or device
3. Debug!

### Way to add breakpoint: 
1. Enabling Hermes in RN following [this website](https://reactnative.dev/docs/hermes)
2. Open Flipper => React Native => Hermes Debugger
3. Inside Hermes Debugger => Go to Source code tab to set breakpoint and debug

### Way to check network: 
1. Open Flipper => Disable => enable Network

### Way to check Redux state and action in Flipper ( All steps are followed in [this repo](https://github.com/jk-gan/redux-flipper) ): 
1. Install redux-flipper middleware and react-native-flipper in your React Native app:
```sh
yarn add redux-flipper react-native-flipper
# for iOS
cd ios && pod install
```
2. Add the middleware into your redux store:
```js
import { createStore, applyMiddleware } from 'redux';

const middlewares = [
  /* other middlewares */
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = createStore(RootReducer, applyMiddleware(...middlewares));
```
3. Install flipper-plugin-redux-debugger in Flipper desktop client:
```
Manage Plugins > Install Plugins > search "redux-debugger" > Install
```
4. Start your app, then you should be able to see Redux Debugger on your Flipper app

## IV. Bugs 
### 1. TextInput issues on Android follow [this link](https://github.com/facebook/react-native/issues/30503): 
* Use ```defaultValue``` instead of ```value``` in ```TextInput```
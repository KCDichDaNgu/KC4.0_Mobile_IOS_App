<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="/src/asset/images/jsApp_assets_images_lg.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Best-README-Template</h3>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#Debug">Debug</a></li>
    <li><a href="#usage">Bug</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This Neural Machine Translation system is fully supported by the project 'Developing a multilingual translation system between Vietnamese and several other languages' funded by the Science and Technology Program KC 4.0, No. KC-4.0.12/19-25.

### Built With

* [ReactNative](https://reactnative.dev/)
* [Redux](https://redux.js.org/)
* [axios](https://www.npmjs.com/package/axios)
* [lodash](https://lodash.com/)
* [react-google-login](https://www.npmjs.com/package/react-google-login)
* [@mui/material](https://mui.com/)
* [react-bootstrap](https://react-bootstrap.github.io/)
* [react-hook-form](https://www.npmjs.com/package/react-google-login)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

[Create ReactNative App](https://archive.reactnative.dev/docs/getting-started).

## Available Scripts

In the project directory, you can run:

### Prerequisites

Install nodejs https://nodejs.org/en/

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2.  Clone the repo
   ```sh
   git clone https://github.com/anhquanngo/mobile_v2
   ```
3. Install NPM packages
   ```sh
   yarn install
   ```
3.1. Run instructions for Android
   ```sh
   yarn android
   ```
  
3.2.Run instructions for iOS
   ```sh
   * yarn ios
   ```
   
4. Build app
4.1. For android
Follow [this link](https://www.instamobile.io/android-development/generate-react-native-release-build-android/) to setup key and generate ```.apk``` file
4.2. For Ios
Follow [this link](https://docs.saucelabs.com/mobile-apps/automated-testing/ipa-files/) to create ```.api``` or ```.app``` bundle

## Debug

Note: React native can't debug using Remote react native debugger. Following the statement from [react-hook-reanimated](https://docs.swmansion.com/react-native-reanimated/docs):
> As the library uses JSI for synchronous native methods access, remote debugging is no longer possible. You can use Flipper for debugging your JS code, however connecting debugger to JS context which runs on the UI thread is not currently supported.

1. Use Flipper for debugging task: 
1.1 Install [Flipper](https://fbflipper.com/) for checking network, log, etc.. 
1.2 Open Flipper and choose Emulator or device
1.3 Debug!

2. Way to add breakpoint: 
2.1 Enabling Hermes in RN following [this website](https://reactnative.dev/docs/hermes)
2.2 Open Flipper => React Native => Hermes Debugger
2.3 Inside Hermes Debugger => Go to Source code tab to set breakpoint and debug

3 Way to check network: 
3.1 Open Flipper => Disable => enable Network

4 Way to check Redux state and action in Flipper ( All steps are followed in [this repo](https://github.com/jk-gan/redux-flipper) ): 
4.1 Install redux-flipper middleware and react-native-flipper in your React Native app:
```sh
yarn add redux-flipper react-native-flipper
```
+ for iOS
1. open ios and pod
```sh
cd ios && pod install
```
2. Add the middleware into your redux store:
```sh
import { createStore, applyMiddleware } from 'redux';

const middlewares = [
  /* other middlewares */
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}
```
```sh
const store = createStore(RootReducer, applyMiddleware(...middlewares));
```
3. Install flipper-plugin-redux-debugger in Flipper desktop client:
```sh
Manage Plugins > Install Plugins > search "redux-debugger" > Install
```
4. Start your app, then you should be able to see Redux Debugger on your Flipper app

## Bugs 
1. TextInput issues on Android follow [this link](https://github.com/facebook/react-native/issues/30503): 
* Use ```defaultValue``` instead of ```value``` in ```TextInput```

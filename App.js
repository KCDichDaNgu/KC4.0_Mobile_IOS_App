import React from 'react';
import MainScreen from './src/screen/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import './src/config/i18n';

export default function App() {
  return (
    <NavigationContainer>
      <MainScreen/>
    </NavigationContainer>
  );
}

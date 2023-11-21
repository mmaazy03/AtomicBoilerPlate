import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '@navRef';

import OnBoardingScreen from '@pages/authContainer/OnBoardingScreen';
import LoginScreen from '@pages/authContainer/loginScreen';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        // initialRouteName={common?.isOnBoard ? 'Login' : 'OnBoard'}
        initialRouteName={'OnBoard'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoard" component={OnBoardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;

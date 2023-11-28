import React, { useEffect, useState } from 'react'
import Home from '../screens/Home'
import MultiStep from '../screens/MultiStep'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Provides a way for your app to transition between screens where each new screen is placed on top of a stack.
const Stack = createNativeStackNavigator();
export default function Navigation () {
    return (
        <NavigationContainer>
          {/*initialRouteName - Sets the default screen of the stack. Must match one of the keys in route configs.*/}
        <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
          <Stack.Screen name="MultiStep" options={{headerShown: false}} component={MultiStep} />
         </Stack.Navigator>
      </NavigationContainer>
    )
}
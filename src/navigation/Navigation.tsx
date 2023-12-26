import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarouselMain from '../screens/Home';
import Graph from '../components/Graph'
import Quizz from '../utils/Quizz';
import Register from '../screens/Register';
import Login from '../screens/Login';
 import Home from '../screens/Home';
import Landing from '../screens/Landing';
import UserMap from '../screens/UserMap';
// Provides a way for your app to transition between screens where each new screen is placed on top of a stack.
const Stack = createNativeStackNavigator();
export default function Navigation () {
    return (
      <NavigationContainer>
        {/*initialRouteName - Sets the default screen of the stack. Must match one of the keys in route configs.*/}
        <Stack.Navigator initialRouteName='Landing'>
           <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
           <Stack.Screen name="Graph" options={{headerShown: false}} component={Graph} />
          <Stack.Screen name="Landing" options={{headerShown: false}} component={Landing} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
          <Stack.Screen name="Register" options={{headerShown: false}} component={Register} />
          <Stack.Screen name="Quizz" options={{headerShown: false}} component={Quizz} />
          <Stack.Screen name="Map" options={{headerShown: false}} component={UserMap} />
         </Stack.Navigator>
      </NavigationContainer>
    )
}
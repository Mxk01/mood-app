import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarouselMain from '../screens/Home';
import Graph from '../components/Graph'
import Quizz from '../utils/Quizz';
import Landing from '../screens/Landing';

// Provides a way for your app to transition between screens where each new screen is placed on top of a stack.
const Stack = createNativeStackNavigator();
export default function Navigation () {
    return (
      <NavigationContainer>
        {/*initialRouteName - Sets the default screen of the stack. Must match one of the keys in route configs.*/}
        <Stack.Navigator initialRouteName='MainCarousel'>
          <Stack.Screen name="Graph" options={{headerShown: false}} component={Graph} />
          <Stack.Screen name="MainCarousel" options={{headerShown: false}} component={CarouselMain} />
          <Stack.Screen name="Quizz" options={{headerShown: false}} component={Quizz} />
          <Stack.Screen name="Landing" options={{headerShown: false}} component={Landing}/>  
        </Stack.Navigator>
      </NavigationContainer>
    )
}
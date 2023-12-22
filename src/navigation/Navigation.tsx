import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
<<<<<<< HEAD
import CarouselMain from '../screens/Home';
import Graph from '../components/Graph'
import Quizz from '../utils/Quizz';
import Landing from '../screens/Landing';
=======
import CarouselMain from '../screens/CarouselMain';
import FaceRecognition from '../screens/FaceRecognition';
import Graph from '../screens/Graph'
import Quizz from '../screens/Quizz';
import Login from '../screens/Login';
>>>>>>> e9a59904573234c08e1f9b5ea5d32cf1340cfc2b

// Provides a way for your app to transition between screens where each new screen is placed on top of a stack.
const Stack = createNativeStackNavigator();
export default function Navigation () {
    return (
<<<<<<< HEAD
      <NavigationContainer>
        {/*initialRouteName - Sets the default screen of the stack. Must match one of the keys in route configs.*/}
        <Stack.Navigator initialRouteName='MainCarousel'>
          <Stack.Screen name="Graph" options={{headerShown: false}} component={Graph} />
          <Stack.Screen name="MainCarousel" options={{headerShown: false}} component={CarouselMain} />
          <Stack.Screen name="Quizz" options={{headerShown: false}} component={Quizz} />
          <Stack.Screen name="Landing" options={{headerShown: false}} component={Landing}/>  
        </Stack.Navigator>
=======
        <NavigationContainer>
          {/*initialRouteName - Sets the default screen of the stack. Must match one of the keys in route configs.*/}
        <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />

        <Stack.Screen name="Graph" options={{headerShown: false}} component={Graph} />

        <Stack.Screen name="FaceDetection" options={{headerShown: false}} component={FaceRecognition} />
        <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
        <Stack.Screen name="MainCarousel" options={{headerShown: false}} component={CarouselMain} />
        <Stack.Screen name="Quizz"
        
        options={{headerShown: false}} component={Quizz} />
        <Stack.Screen name="MultiStep" options={{headerShown: false}} component={MultiStep} />
            
         </Stack.Navigator>
>>>>>>> e9a59904573234c08e1f9b5ea5d32cf1340cfc2b
      </NavigationContainer>
    )
}
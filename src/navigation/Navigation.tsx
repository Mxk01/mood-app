import React, { useEffect, useState } from 'react'
import Home from '../screens/Home'
import MultiStep from '../screens/MultiStep'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarouselMain from '../screens/CarouselMain';
import FaceRecognition from '../screens/FaceRecognition';
import Graph from '../screens/Graph'
import Quizz from '../screens/Quizz';
import Login from '../screens/Login';

// Provides a way for your app to transition between screens where each new screen is placed on top of a stack.
const Stack = createNativeStackNavigator();
export default function Navigation () {
    return (
        <NavigationContainer>
          {/*initialRouteName - Sets the default screen of the stack. Must match one of the keys in route configs.*/}
        <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />

        <Stack.Screen name="Graph" options={{headerShown: false}} component={Graph} />

        <Stack.Screen name="FaceDetection" options={{headerShown: false}} component={FaceRecognition} />
        <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
        <Stack.Screen name="MainCarousel" options={{headerShown: false}} component={CarouselMain} />
        <Stack.Screen name="Quizz"
        
        options={{headerShown: false}} component={Quizz} />
        <Stack.Screen name="MultiStep" options={{headerShown: false}} component={MultiStep} />
            
         </Stack.Navigator>
      </NavigationContainer>
    )
}
import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {RegisterStyles} from '../utils/styles/register'
const App = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={RegisterStyles.container}>
      {/* Top Half */}
      <LinearGradient
        colors={['#fe7f2d', '#ff0200']}
        style={RegisterStyles.topHalf}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        {/* Black Circle in the Middle of Top Half */}
        <View style={RegisterStyles.circle} />
         
      </LinearGradient>
      <Text style={RegisterStyles.mainText}>Register</Text>

      {/* Form */}
      <View style={RegisterStyles.formContainer}>
        
        {/* Your form components go here */}
        <TextInput style={RegisterStyles.input} placeholder="Username" />
        <TextInput style={RegisterStyles.input} placeholder="Password" secureTextEntry />
        {/* Add more form components as needed */}

        <TouchableOpacity>
          <LinearGradient
            colors={['#FF4500', '#FFA500']}
            start={[0, 0]}
            end={[1, 1]}
            style={RegisterStyles.buttonContainer}
          >
            <Text style={RegisterStyles.buttonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Button 
        color={"transparent"}
        title="Already have an account?"   onPress={()=>navigation.goBack()}/>
      </View>
       {/* Text Underneath */}
      <Text style={RegisterStyles.underneathText}>Something underneath</Text>

      {/* Bottom Half */}
      <LinearGradient
        colors={['#ff0200', '#f54a03']}
        style={RegisterStyles.bottomHalf}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
};
 

export default App;
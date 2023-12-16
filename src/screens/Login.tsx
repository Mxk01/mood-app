import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  return (
    <View style={styles.container}>
      {/* Top Half */}
      <LinearGradient
        colors={['#fe7f2d', '#ff0200']}
        style={styles.topHalf}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        {/* Black Circle in the Middle of Top Half */}
        <View style={styles.circle} />
         
      </LinearGradient>
      <Text style={styles.mainText}>Moody</Text>

      {/* Form */}
      <View style={styles.formContainer}>
        
        {/* Your form components go here */}
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        {/* Add more form components as needed */}

        <TouchableOpacity>
          <LinearGradient
            colors={['#FF4500', '#FFA500']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Text Underneath */}
      <Text style={styles.underneathText}>Something underneath</Text>

      {/* Bottom Half */}
      <LinearGradient
        colors={['#ff0200', '#f54a03']}
        style={styles.bottomHalf}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  topHalf: {
    position: 'absolute',
    top: -300, // Adjust the value to create space
    left: -150,
    right: 0,
    bottom: '50%',
    borderRadius: 400, // Make it a circle
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'black',
    zIndex: 100,
    position: 'absolute',
    top: '80%',
    left: '80%',
    transform: [{ translateX: -100 }, { translateY: -90 },{rotateZ:'15deg'}],
  },
  bottomHalf: {
    position: 'absolute',
    top: '78%',
    left: 25,
    right: 0,
    bottom: -200,
    borderRadius: 200, // Make it a circle
  },
  formContainer: {
    backgroundColor: 'black', // Form background color
    borderRadius: 20,
    padding: 20,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    zIndex: 1,
    top: 50, // Adjust this value to move the form down
  },
  input: {
    height: 40,
    borderColor: '#fe7f2d',
    borderRadius: 25,
    color: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  underneathText: {
    color: 'white',
    marginTop: 20,
  },
  mainText: {
    fontSize:30,
    color:'black',
    textTransform:'uppercase',
    fontWeight:'bold',
    letterSpacing:3,
    marginBottom:10
  }
});

export default App;

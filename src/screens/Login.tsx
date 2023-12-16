import React from 'react';
import { View, StyleSheet,Text, TextInput } from 'react-native';
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
      />

      {/* Form */}
      <View style={styles.formContainer}>
      <View>
  <Text>First part and </Text>
  <Text>second part</Text>
</View>
        {/* Your form components go here */}
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        {/* Add more form components as needed */}
      </View>

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
    backgroundColor:'black'
  },
  topHalf: {
    position: 'absolute',
    top:-300,  // Adjust the value to create space
    left: -100,
    right: 0,
    bottom: '50%',
    borderRadius:400, // Make it a circle
  },
  bottomHalf: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    bottom: -200,
    borderRadius: 50, // Make it a circle
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default App;

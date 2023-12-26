import {StyleSheet} from 'react-native'

export const LandingStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      flex: 1,
      paddingTop: 58,
    },
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
    button: {
      marginTop: 15,
      width: '80%',
      alignItems: 'center', // Center the button horizontally
    },
    gradient: {
      width: '100%', // Set a fixed width for the LinearGradient
      borderRadius: 15,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'black',
      fontSize: 18,
      textTransform:'uppercase',
      textAlign: 'center',
      width:200,
      marginRight:10,
      fontWeight:'bold'
    },
    buttonContainer: {
      borderRadius: 25,
      paddingVertical: 15,
      paddingHorizontal: 20,
      margin: 10,
    },
  });
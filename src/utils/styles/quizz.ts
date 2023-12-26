import {StyleSheet} from 'react-native'
import { Platform } from 'react-native';
export const quizzStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black', // Purple background color
    },
    circleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    circle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    circleText: {
      fontSize: 16,
      color:'black'
    },
    questionText: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',
      color: '#333333', // Light text color
    },
    choicesContainer: {
      width: '82%', // Adjust the width as needed
      backgroundColor: 'white',
      flex: 0.6,
      justifyContent: 'space-evenly',
      padding: 35,
      borderRadius: 15,
      ...Platform.select({
        ios: {
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    choiceButton: {
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
    selectedChoice: {
      backgroundColor: 'orange',
      borderRadius: 15,
      padding: 10,
    },
    choiceText: {
      color: 'black', // Dark text color
      fontSize: 16,
    },
    choiceTextSelected: {
      color: 'white', // Text color when a choice is selected
      fontSize: 16,
    },
    submitButton: {
       padding: 10,
      marginVertical: 10,
      borderRadius: 15,
    },
    submitButtonText: {
      color: 'white', // Light text color
      fontWeight:'bold',
      textTransform:'uppercase',
      fontSize: 16,
      textAlign: 'center',
    },
  });
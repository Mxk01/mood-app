import {StyleSheet} from 'react-native'

export const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  topHalf: {
    position: 'absolute',
    top: -300, // Adjust the value to create space
    left: 100,
    transform:[{rotateX:'150deg'},{scaleY:-1}],
    right: 0,
    bottom: '50%',
    borderRadius: 400, // Make it a circle
  },
  circle: {
    width: 40,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'black',
    zIndex: 100,
    position: 'absolute',
    top: '85%',
    left: '80%',
    transform: [{ translateX: -100 }, { translateY: -90 },{rotateZ:'6deg'} ],
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
    textTransform:'uppercase',
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
    marginLeft:100,
    marginBottom:10
  }
});
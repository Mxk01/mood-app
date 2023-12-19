import { View, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
export default function CircleButton({ onPress}:{onPress:any}) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
      <AntDesign name="doubleright" size={23} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 45,
    height: 45,
     borderWidth: 0,
     padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor:'red',
    color:'white'
     
  },
});

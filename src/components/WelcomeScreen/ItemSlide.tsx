import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  ImageSourcePropType,
} from 'react-native';

// get the width and height of the screen
const { width, height } = Dimensions.get('screen');

interface Item {
  id: number;
  img: any;
  title: string;
  description: string;
  price: string;
}

interface ItemSlideProps {
  item: Item;
}

const ItemSlide: React.FC<ItemSlideProps> = ({ item }) => {
  // equivalent of translateY:40
  const initialY = new Animated.Value(40);
  Animated.timing(initialY, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    // creates a spring-like effect
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        // some props and styles
        source={item.img}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: initialY,
              },
            ],
          },
        ]}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );
};

export default ItemSlide;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    flex: 0.6,
    width: '100%',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

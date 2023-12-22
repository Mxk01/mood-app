import React, { useState,useRef,useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import LottieView from 'lottie-react-native';
import Login from './Login';


const CarouselMain = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const onPageSelected = (event: { nativeEvent: { position: number } }) => {
    setCurrentPage(event.nativeEvent.position);
  };
 
  const renderPagerIndicator = () => {
    const pages = ['1', '2', '3'];

    return (
      <View style={styles.pagination}>
        {pages.map((_, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.paginationDot,
              { backgroundColor: index === currentPage ? '#e74c3c' : 'lightgray' },
            ]}
            onPress={() => {} /* Add your logic to handle button press here */}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        <View style={styles.page} key="1">
          <LottieView source={require('../assets/animations/penguin.json')} autoPlay/>
          <Text style={styles.header}>HELLO Testing hsit</Text>
        </View>
    
        <View style={styles.page} key="2">
          <LottieView source={require('../assets/animations/astronaut.json')} autoPlay/>
        </View>
        <Login/>
      </PagerView>
      {renderPagerIndicator()}
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    backgroundColor: '#1b1b1b'
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  header : {
    marginTop: 'auto',
    fontWeight: 'bold'
  },
});

export default CarouselMain;

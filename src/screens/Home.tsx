import React, { useState,useRef,useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import PagerView from 'react-native-pager-view';
import LottieView from 'lottie-react-native';
import Login from './Login';
import { HomeStyles } from '../utils/styles/home';

const CarouselMain = () => {
  
    useEffect(() => {
      // Hide the status bar when the component mounts
      StatusBar.setHidden(true);
   
    }, []);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const onPageSelected = (event: { nativeEvent: { position: number } }) => {
    setCurrentPage(event.nativeEvent.position);
  };
 
  const renderPagerIndicator = () => {
    const pages = ['1', '2', '3'];

    return (
      <View style={HomeStyles.pagination}>
        {pages.map((_, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[
              HomeStyles.paginationDot,
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
        style={HomeStyles.viewPager}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        <View style={HomeStyles.page} key="1">
          <LottieView source={require('../assets/animations/penguin.json')} autoPlay/>
          <Text style={HomeStyles.header}>HELLO Testing hsit</Text>
        </View>
    
        <View style={HomeStyles.page} key="2">
          <LottieView source={require('../assets/animations/astronaut.json')} autoPlay/>
        </View>
    
        <Login/>
     
      </PagerView>
      {renderPagerIndicator()}
    </View>
  );
};

 
export default CarouselMain

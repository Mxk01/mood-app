import React, { useState,useRef,useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import PagerView from 'react-native-pager-view';
import LottieView from 'lottie-react-native';
import Svg, { Path } from 'react-native-svg';
import CircleButton  from '../components/CircleButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const CarouselMain = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [currentPage, setCurrentPage] = useState(0);
  const animation = useRef(null);
  const onPageSelected = (event: { nativeEvent: { position: number } }) => {
    setCurrentPage(event.nativeEvent.position);
  };
  const goHome = () => {
    navigation.push('Home');
  };
  // const pathRef = useRef<any>(null);
  // let animationData = require('../assets/animations/astronaut-reading.json')

  // useEffect(() => {
  //   // Assuming the animationData has keyframes with path data
  //   const pathKeyframes = animationData.layers[0].shapes[0].ks;

  //   // Convert keyframes to SVG path data
  //   const pathData = pathKeyframes.k;
  //    if(pathRef.current!=null || pathRef.current!=undefined) {
  //   // Animate the SVG path
  //   pathRef.current.setNativeProps({
  //     d: pathData[0].s,
  //   });
  // }
  // }, [animationData]);
  const renderPagerIndicator = () => {
    const pages = ['1', '2', '3'];

    return (
      <View style={styles.pagination}>
          {currentPage==3 ? <Text>Done</Text> :''}
        <View style={{flexDirection:"row"}}>  
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
        <CircleButton onPress={()=>goHome()}/>
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
          <Text style={styles.header}>HELLO</Text>
        </View>
    
        <View style={styles.page} key="2">
          <LottieView source={require('../assets/animations/astronaut.json')} autoPlay/>
        </View>
        <View style={styles.page} key="3">
          <Text>Third Page</Text>
        </View>
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
   },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:10,
    padding:20
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
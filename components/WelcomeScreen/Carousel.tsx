import Data from '../utils/Data'
import {Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View} from 'react-native';
import {useRef, useState} from 'react';
import ItemSlide from './ItemSlide'
import Pagination from './Pagination'
function Carousel() {
    const [pageIndex, setPageIndex] = useState(0);
    // Animated.Value is wrapped in useRef to avoid re-rendering
    const xScrollValue = useRef(new Animated.Value(50)).current;
    // maps the e.scrollX ( scrollX from event) to the value which can be animated (Animated.Value)
    const handleOnScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
        Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: xScrollValue ,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )(event);
      };
      const handleOnViewableItemsChanged = useRef(({viewableItems}:{viewableItems:any}) => {
        // console.log('viewableItems', viewableItems);
        setPageIndex(viewableItems[0].index);
      }).current;
    
      const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
      }).current;
    
  return (
    <View>
           <FlatList
        data={Data}
        renderItem={({item}) => <ItemSlide item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Data} scrollX={xScrollValue} index={pageIndex} />
    </View>
  )
}

export default Carousel
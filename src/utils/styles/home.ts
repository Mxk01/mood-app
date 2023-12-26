import {StyleSheet} from 'react-native'

export const HomeStyles = StyleSheet.create({
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
  
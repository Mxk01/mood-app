import React from 'react';
// import { registrerRootComponent } from 'expo';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Navigation from './navigation/Navigation';


function App(): JSX.Element {
  return (
    <>   
      <View style={{ flex: 1 }}> 
     <Navigation/>
      </View>
    </>
  );
}

export default App;
// registerRootComponent(App)
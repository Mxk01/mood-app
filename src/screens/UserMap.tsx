import MapView,{PROVIDER_GOOGLE, Region} from 'react-native-maps';
import { StyleSheet,TouchableOpacity,Text,View } from 'react-native';
import { useEffect,useRef,useState } from 'react';
import * as Location from 'expo-location'; // Import the Location module
import { useNavigation } from '@react-navigation/native';
export default function UserMap() {
    const [mapPointer,setMapPointer] = useState({
        latitude:45,
        longitude:25,
        latitudeDelta:2,
        longitudeDelta:2
    }) 
    
    let navigator = useNavigation()
 
    const mapRef = useRef<MapView | any >()
    let navigateToMap = () =>{
      mapRef.current?.animateToRegion(mapPointer)
    }

    const onRegionChange = (region: Region) => {
      console.log(region);
    };
    useEffect(()=>{
      navigator.setOptions(
        {
          headerRight:()=>{
           <TouchableOpacity onPress={navigateToMap}>
            <View style={{padding:10}}>
               <Text>Focus Map</Text>
            </View>
           </TouchableOpacity>
          }
        }
      )
    },[])
    const getLocation = async() =>{
        // ask for permission 
        let {status} = await Location.requestForegroundPermissionsAsync()
        if(status!=='granted')
        {
            alert("You denied access to location.")
        }
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        setMapPointer({
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
        })
    }
    useEffect(()=>{
        getLocation();
    },[])
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={mapPointer} showsUserLocation
      ref={mapRef} onRegionChange={onRegionChange}
      showsMyLocationButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

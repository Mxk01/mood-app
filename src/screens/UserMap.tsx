import MapView,{PROVIDER_GOOGLE, Region} from 'react-native-maps';
import { StyleSheet,TouchableOpacity,Text,View } from 'react-native';
import { useCallback, useEffect,useRef,useState } from 'react';
import * as Location from 'expo-location'; // Import the Location module
import { useNavigation } from '@react-navigation/native';
import { MapStyles } from '../utils/styles/userMap';
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

    const onRegionChange = useCallback((region: Region) => {
      console.log(region);
    },[]);
    useEffect(() => {
      navigator.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={navigateToMap}>
            <View style={{ padding: 10 }}>
              <Text>Focus Map</Text>
            </View>
          </TouchableOpacity>
        ),
      });
    }, []);
    
    const getLocation = useCallback(async() =>{
        // ask for permission 
        let {status} = await Location.requestForegroundPermissionsAsync()
        if(status!=='granted')
        {
            alert("You denied access to location.")
        }
        let location = await Location.getCurrentPositionAsync({})
        setMapPointer({
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
        })
    },[])
    useEffect(()=>{
        getLocation();
    },[])
  return (
    <View style={MapStyles.container}>
      <MapView style={MapStyles.map} provider={PROVIDER_GOOGLE} region={mapPointer} showsUserLocation
      ref={mapRef} onRegionChange={onRegionChange}
      showsMyLocationButton />
    </View>
  );
}


import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import * as Network from 'expo-network';
import { SpeedDial } from 'react-native-elements';
import { LandingStyles } from '../utils/styles/landing';
export default function Landing() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [open, setOpen] = React.useState(false);
  const resetView = () => {
    navigation.push('Home');
  };

  const [image, setImage] = useState<string | null>(null);
  const [labels, setLabels] = useState([]);
   let doSomething = () => {

   }
   const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const postImage = async () => {
    try {
      if (image) {
        let ip = await Network.getIpAddressAsync();
        console.log(ip)
        const formData:FormData = new FormData();
        formData.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: 'photo.jpg',
        } as any);
 
        const response = await axios.post('http://127.0.0.1:8000/api/moody', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.status >= 200 && response.status < 300) {
          console.log(response.status);
        }
      }
    } catch (err: AxiosError | unknown) {
      console.error('Error posting image:', err);
    }
  };
  return (
    <View style={LandingStyles.container}>
    <View style={LandingStyles.imageContainer}>
      {image ? <Image source={{ uri: image }} style={LandingStyles.image} /> :
      <View>
          <LinearGradient
          style={{width:320,height:440,
            borderRadius:25}}
        colors={['#fe7f2d', '#ff0200']}
 
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      ></LinearGradient>
        </View>}
    </View>
    <TouchableOpacity>
          <LinearGradient
            colors={['#FF4500', '#FFA500']}
            start={[0, 0]}
            end={[1, 1]}
            style={LandingStyles.buttonContainer}
          >
            <Text style={LandingStyles.buttonText} onPress={postImage}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
 
    <View style={{ flexDirection: "row", padding: 20, justifyContent: "center", alignItems: "center" }}>
  
    </View>
 
      <SpeedDial
isOpen={open}
icon={{ name: 'edit', color: '#fff' }}
openIcon={{ name: 'close', color: '#fff' }}
onOpen={() => setOpen(!open)}
onClose={() => setOpen(!open)}
>
<SpeedDial.Action
  icon={{ name: 'add', color: '#fff' }}
  title="Add"
  buttonStyle={{ backgroundColor: '#f54703' }}
  onPress={() => 
  {
    pickImage()
    setOpen(false)
  }}
/>
<SpeedDial.Action
  icon={{ name: 'add', color: '#fff' }}
  title="Graph"
  buttonStyle={{ backgroundColor: '#f54703' }}
  
  onPress={() => 
  {
     navigation.push('Graph')
  }}
/>
<SpeedDial.Action
  icon={{ name: 'delete', color: '#fff' }}
  title="Delete"
  buttonStyle={{ backgroundColor: '#f54703' }}
  onPress={() => console.log('Delete Something')}
/>
  <SpeedDial.Action
  icon={{ name: 'autorenew', color: '#fff' }}
  title="Refresh"
  buttonStyle={{ backgroundColor: '#f54703' }}
  onPress={() => setImage('')}
/>
<SpeedDial.Action
    icon={{ name: 'help-outline', color: '#fff' }}
    title="Help"
    buttonStyle={{ backgroundColor: '#f54703' }}
    onPress={() => resetView()}
  />
  <SpeedDial.Action
    icon={{ name: 'help-outline', color: '#fff' }}
    title="Quiz"
    buttonStyle={{ backgroundColor: '#f54703' }}
    onPress={() => navigation.push('Quizz')}
  />
    <SpeedDial.Action
    icon={{ name: 'help-outline', color: '#fff' }}
    title="User Map"
    buttonStyle={{ backgroundColor: '#f54703' }}
    onPress={() => navigation.push('Map')}
  />

</SpeedDial>

  </View>
  );
}
 
import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import CircleButton from '../components/CircleButton';
import IconButton from '../components/Icon';
import Icon from '../components/Icon';

export default function MultiStep() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const resetView = () => {
    navigation.push('MultiStep');
  };

  const [image, setImage] = useState<string | null>(null);
  const [labels, setLabels] = useState([]);
   let doSomething = () => {

   }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
     

      try {
        if (!result.assets[0].uri) {
          alert('Please make sure you have uploaded an image.');
          return;
        } else {
           setImage(result.assets[0].uri);
        
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
    const processImage = async() => {
      const VISION_API_KEY = 'AIzaSyBpSymCYW00h8BnpVH0Xd7HfPYBqYrYCdo';
      const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`;
      try {
          
      if(image!=null  && image!=undefined) {
        const fileInfo = await FileSystem.getInfoAsync(image);
        if (fileInfo.exists) {
         const imageToBase64 = await FileSystem.readAsStringAsync(image, {
          encoding: FileSystem.EncodingType.Base64,
        });
         const requestData = {
          requests: [
            {
              image: {
                content: imageToBase64,
              },
              features: [{ type: 'LABEL_DETECTION', maxResults: 5 }]
            },
          ],
        };

        const response = await axios.post(API_URL, requestData);
        console.log(response)
        //  setLabels(response.data.responses[0].labelAnnotations);
      }
      }
    }
      catch(e)
      {
        console.log(e)
      }
    
        }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <TouchableOpacity style={styles.button} onPress={resetView}>
           <Text style={styles.buttonText}>Process Image</Text>
       </TouchableOpacity>
 
      <TouchableOpacity style={styles.button} onPress={resetView}>
           <Text style={styles.buttonText}>Reset View</Text>
       </TouchableOpacity>
      <View style={{flexDirection:"row",padding:20}}> 
      <Icon  icon="edit" label="Edit" onPress={doSomething} />

      <CircleButton onPress={pickImage}/>
      <Icon  icon="refresh" label="Reset" onPress={()=>setImage('')} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  button: {
    marginTop: 15,
    width: '80%',
    alignItems: 'center', // Center the button horizontally
  },
  gradient: {
    width: '100%', // Set a fixed width for the LinearGradient
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textTransform:"uppercase",
    fontSize:"sm",
    width:200,
    textAlign:"center",
    borderRadius:20,
    backgroundColor:"#5352ed",
    marginBottom:3,
    padding:10,
  
    fontSize: 16,
  },
});

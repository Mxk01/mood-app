import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
 
import { SpeedDial } from 'react-native-elements';
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
        const formData = new FormData();
        formData.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: 'photo.jpg',
        } as any);

        const response = await axios.post('http://10.0.2.2:8000/api/moody', formData, {
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
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      {image ? <Image source={{ uri: image }} style={styles.image} /> :
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
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText} onPress={postImage}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
    {/* <TouchableOpacity style={styles.button} onPress={resetView}>
      <Text style={styles.buttonText}>Reset View</Text>
    </TouchableOpacity> */}

    <View style={{ flexDirection: "row", padding: 20, justifyContent: "center", alignItems: "center" }}>
      {/* Your additional components (IconButton and CircleButton) used to be here */}
    </View>
{/* <Icon  icon="edit" label="Edit" onPress={doSomething} />

    <CircleButton onPress={pickImage}/> */}
    {/* <Icon  icon="refresh" label="Reset" onPress={()=>setImage('')} /> */}
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

</SpeedDial>

  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    color: 'black',
    fontSize: 18,
    textTransform:'uppercase',
    textAlign: 'center',
    width:200,
    marginRight:10,
    fontWeight:'bold'
  },
  buttonContainer: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 10,
  },
});
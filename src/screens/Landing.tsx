import React, {useState} from 'react'
import { View, StyleSheet, Button, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios, {AxiosError} from 'axios'


const Landing = () => {
const [image, setImage] = useState<string | null>(null);

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Send To Backend" onPress={postImage} />
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  landing: {
    flex: 1,
    backgroundColor: '#1b1b1b',
  },
});
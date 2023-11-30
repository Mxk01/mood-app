import { Camera,CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';


function FaceRecognition() {
    let [permissions,setPermissions] = useState<boolean>(false);
    let [faces,setFaces] = useState<Array<any>>([])
    useEffect(()=>{
        // will ask for permission when user accesses this component
        (async () =>{
          // get status by calling requestCameraPermissionsAsync
          let {status} = await Camera.requestCameraPermissionsAsync()
          // if status === granted , permissions = true ,otherwise false
          setPermissions(status==='granted');
        })()
    },[])
    let findFaces = ({faces}:{faces:Array<any>}) => {
     setFaces(faces);
    }


  return (
      <View style={styles.container}>  
      <Camera
      style={styles.camera}
      ratio="16:9"
      type={CameraType.front}
      onFacesDetected={findFaces}
      faceDetectorSettings={{
        // speed over accuracy
        mode: FaceDetector.FaceDetectorMode.accurate,
        // find all facial points
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
        runClassifications: FaceDetector.FaceDetectorClassifications.none,
        minDetectionInterval: 1000,
        tracking: true,
      }}
      />
       {faces.map((face, index) => (
        // Drawing the face  which is a box at position absolute,top will be the upper point of the face (top of forehead),
        // height will be the bottom of the face,left will be the left side of face and width will be the right side
        <View
          key={index}
          style={{
            position: 'absolute',
            top: face.bounds.origin.y,
            left: face.bounds.origin.x,
            width: face.bounds.size.width,
            height: face.bounds.size.height,
            borderWidth: 2,
            borderColor: 'red',
          }}
        />
      ))}
     </View>
  )
}

export default FaceRecognition
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    camera: {
      flex: 1,
    },
  });
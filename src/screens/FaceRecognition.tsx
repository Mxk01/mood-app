import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera, CameraType, FaceDetectionResult } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

function FaceRecognition() {
  const [permissions, setPermissions] = useState<boolean>(false);
  const [faces, setFaces] = useState<Array<any>>([]);
  const [currentFaceId, setCurrentFaceId] = useState<number | null>(null);

 
  useEffect(() => {
    // Ask for permission when the user accesses this component
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      // If status === granted, permissions = true, otherwise false
      setPermissions(status === 'granted');
    })();
  }, []);

 
  const findFaces = ({ faces }:FaceDetectionResult) => {
     

    if (faces.length > 0) {
      const currentFace = faces[0] as any;
        console.log(currentFace)
   
        const areEyesOpened =
          currentFace.leftEyeOpenProbability > 0.4 && currentFace.rightEyeOpenProbability > 0.4;
        const isWinking =
          !areEyesOpened &&
          (currentFace.leftEyeOpenProbability < 0.4 || currentFace.rightEyeOpenProbability < 0.4);
        const smilingScore = currentFace.smilingProbability > 0.7;
        console.log("Smiling :"+smilingScore,"Winking : "+isWinking,"Eyes Opened"+areEyesOpened)
  
         if(faces.length>0)
         {
         return  <View style={{ marginTop: 20 }}>
          <Text style={styles.faceDescriptions}>
            Eyes opened: {areEyesOpened ? '🟢' : '🔴'}
          </Text>
          <Text style={styles.faceDescriptions}>
            Winking: {isWinking ? '🟢' : '🔴'}
          </Text>
          <Text style={styles.faceDescriptions}>
            Smiling: {smilingScore ? '🟢' : '🔴'}
          </Text>
        </View>
         
         }  
         setFaces(faces);
      }
  };

  return (
    <View style={styles.container}>
      {permissions && (
        <Camera
          style={styles.camera}
          type={CameraType.front} // Use your import for CameraType.front
          onFacesDetected={findFaces}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.accurate,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 700,
            tracking: true,
          }}
        />
      )}
      {faces.map((face, index) => (
        <View
          key={index}
          style={{
            position: 'absolute',
            top: face.bounds.origin.y,
            left: face.bounds.origin.x,
            width: face.bounds.size.width - 15,
            height: face.bounds.size.height - 15,
            borderWidth: 4,
            borderColor: 'red',
          }}
        />
      ))}
      
    </View>
  );
}

export default FaceRecognition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
  },
  faceDescriptions: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
});

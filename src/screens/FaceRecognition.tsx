import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

function FaceRecognition() {
  type ProbabilitiesType = { winks: boolean; smiles: boolean; openEyes: boolean };
  const [permissions, setPermissions] = useState<boolean>(false);
  const [faceProbabilities, setFaceProbabilities] = useState<ProbabilitiesType>({
    winks: false,
    smiles: false,
    openEyes: false,
  });
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

  let findFaces = ({ faces }: { faces: Array<any> }) => {
    setFaces(faces);

    if (faces.length > 0) {
      const currentFace = faces[0];

      // Check if the face ID has changed
      if (currentFace.trackID !== currentFaceId) {
        const areEyesOpened =
          currentFace.leftEyeOpenProbability > 0.4 && currentFace.rightEyeOpenProbability > 0.4;
        const isWinking =
          !areEyesOpened &&
          (currentFace.leftEyeOpenProbability < 0.4 || currentFace.rightEyeOpenProbability < 0.4);
        const smilingScore = currentFace.smilingProbability > 0.7;

        // Batch state updates
        setFaceProbabilities((prevProbabilities) => ({
          ...prevProbabilities,
          openEyes: areEyesOpened,
          winks: isWinking,
          smiles: smilingScore,
        }));

        // Update the current face ID
        setCurrentFaceId(currentFace.trackID);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      {permissions && (
        <Camera
          style={styles.camera}
          ratio="4:3"
          zoom={0.03}
          type={CameraType.front}
          onFacesDetected={findFaces}
          faceDetectorSettings={{
            // Speed over accuracy
            mode: FaceDetector.FaceDetectorMode.accurate,
            // Find all facial points
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 1000,
            tracking: true,
          }}
        />
      )}
      {faces.map((face, index) => (
        <View key={index} 
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
        <View style={{ marginTop: 20 }}>
            <Text style={styles.faceDescriptions}>
              Eyes opened: {faceProbabilities.openEyes ? '🟢' : '🔴'}
            </Text>
            <Text style={styles.faceDescriptions}>
              Winking: {faceProbabilities.winks ? '🟢' : '🔴'}
            </Text>
            <Text style={styles.faceDescriptions}>
              Smiling: {faceProbabilities.smiles ? '🟢' : '🔴'}
            </Text>
          </View>
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

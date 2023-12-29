from deepface import DeepFace

# Analyze the emotion in the image
face_analysis = DeepFace.analyze(img_path="happy.jpg")

# Access emotion information from the first face in the list
first_face = face_analysis[0]
emotion = first_face["emotion"]
dominant_emotion = first_face["dominant_emotion"]

#For multiple faces
# for face in face_analysis:
#   emotion = face["emotion"]
#    dominant_emotion = face["dominant_emotion"]

# Print the results
print("Emotion:", emotion)
print("Dominant Emotion:", dominant_emotion)

import cv2
import numpy as np
from keras.models import load_model

# Load the pre-trained model
model = load_model('model_v6_23.hdf5')

def preprocess_image(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)  # Read the image in grayscale
    img = cv2.resize(img, (48, 48))
    img = np.reshape(img, (1, 48, 48, 1))
    img = img / 255.0  # Normalize pixel values to be between 0 and 1
    return img

image_path = 'happy.jpg'
image = preprocess_image(image_path)

emotions = ["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"]

# Make predictions
predictions = model.predict(image)
emotion_label = emotions[np.argmax(predictions)]
confidence = np.max(predictions)

print(f"Predicted Emotion: {emotion_label} (Confidence: {confidence * 100:.2f}%)")

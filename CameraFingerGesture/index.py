import cv2
import pyautogui
import mediapipe as mp

# if you want to use a different camera you can use 1 or 2
camera = cv2.VideoCapture(0)  # captures video input from the computer camera

# mp.solutions let us choose what models we want to use; in this case, we're using the hand tracking model
mp_hands = mp.solutions.hands

# max_num_hands - how many hands it should detect; in this case, 1 hand
# min_detection_confidence is a value which will be used to detect if the hand recognition was successful
# here it says it's successful even if it's not a full recognition but 60% recognition of the hand

hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.6, min_tracking_confidence=0.5)
mp_drawings = mp.solutions.drawing_utils

while True:
    # read each frame from the camera
    ret, frame = camera.read()
    if not ret:
        break
    # converting BGR image to RGB image
    image_RGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    # check if there are results (hand landmarks, basically hand points for each finger)
    results = hands.process(frame)

    if results.multi_hand_landmarks:
        # if there are hand landmarks in the results
        for hand_landmarks in results.multi_hand_landmarks:
            # then draw the landmarks (points) with the connection between them
            mp_drawings.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            # Get finger tip and thumb tip positions
            finger_indexY = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y
            finger_thumbY = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].y

            # Detect hand gesture
            if finger_indexY < finger_thumbY:
                hand_gesture = 'pointing up'
            elif finger_indexY > finger_thumbY:
                hand_gesture = 'pointing down'
            else:
                hand_gesture = 'other'

            # Perform action based on hand gesture
            if hand_gesture == 'pointing up':
                pyautogui.press('volumeup')
            elif hand_gesture == 'pointing down':
                pyautogui.press('volumedown')

            cv2.putText(frame, hand_gesture, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

    cv2.imshow('Hand Tracking', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close all windows
camera.release()
cv2.destroyAllWindows()

import mediapipe as mp
import cv2
import numpy as np

cap = cv2.VideoCapture(0)

name = input("Enter the name of the data: ")

holistic = mp.solutions.holistic
hands = mp.solutions.hands
# holistic means use face,pose and other landmarks
holis = holistic.Holistic()
drawing = mp.solutions.drawing_utils

# use this list to store stuff in a numpy array
X = []
data_size = 0

while True:
    lst = []

    _, frm = cap.read()
    # flip image from left to right
    frm = cv2.flip(frm, 1)

    res = holis.process(cv2.cvtColor(frm, cv2.COLOR_BGR2RGB))
    # if there are face landmarks (basically if face is detected in the window)
    # user shows his face and is in within the window bounds
    if res.face_landmarks:
        # then loop through the face landmarks array
        # res.face_landmarks.landmark[1] is the midpoint between the eyes
        # basically it will be used as a reference point
        # res.face_landmarks.landmark  is an array of face points
        # and  there're different points like
        # nose,lips ,cheek ,forehead
        # and  landmark[1] is the midpoint  of the eyes
        # then basically  i.x-landmark[1].x   is the distance of say for example between the nose and  midpoint of the eyes
        for i in res.face_landmarks.landmark:
            lst.append(i.x - res.face_landmarks.landmark[1].x) # horizontal distance between one landmark to another
            lst.append(i.y - res.face_landmarks.landmark[1].y) # vertical distance between one landmark to another

        if res.left_hand_landmarks:
            for i in res.left_hand_landmarks.landmark:
                lst.append(i.x - res.left_hand_landmarks.landmark[8].x)
                lst.append(i.y - res.left_hand_landmarks.landmark[8].y)
        else:
            # hands have 21 x coordinates and 21 y coordinates
            # if nothing is found just append 0 for all 42 coordinates
            for _ in range(42):
                lst.append(0.0)

        if res.right_hand_landmarks:
            for i in res.right_hand_landmarks.landmark:
                lst.append(i.x - res.right_hand_landmarks.landmark[8].x)
                lst.append(i.y - res.right_hand_landmarks.landmark[8].y)
        else:
            for _ in range(42):
                lst.append(0.0)
        # X will be an array of relative distances  E.g  X distance of  midpoint of nose to forehead
        #  Y distance of midpoint of nose to forehead
        X.append(lst)
        data_size += 1
    # draw landmarks
    drawing.draw_landmarks(frm, res.face_landmarks, holistic.FACEMESH_CONTOURS)
    drawing.draw_landmarks(frm, res.left_hand_landmarks, hands.HAND_CONNECTIONS)
    drawing.draw_landmarks(frm, res.right_hand_landmarks, hands.HAND_CONNECTIONS)

    cv2.putText(frm, str(data_size), (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("window", frm)
     # wait till the number passes 100 to detect a good range of emotions
     # give the name of the numpy file as happy sad whatever
    if cv2.waitKey(1) == 27 or data_size > 99:
        cv2.destroyAllWindows()
        cap.release()
        break

np.save(f"{name}.npy", np.array(X))
print(np.array(X).shape)

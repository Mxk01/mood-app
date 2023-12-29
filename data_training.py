import os
import numpy as np
import cv2
from tensorflow.keras.utils import to_categorical

from keras.layers import Input, Dense
from keras.models import Model

label = []
dictionary = {}
c=0
# 1.Checks if file ends in npy extension
# 2.Check if isInit = true  If it's not then set is to true
# 3.load the data from X  array   np.load(i)
# 4.load the size  which is  the length of the array of  numpy file   E.g  5 for happy.npy
# 5.Get the filenaem
# 6. Get an array of emotions :  y = np.array([emotionFileName*size])
# E.g size = 5  Filename  is  happy.npy
# "happy happy happy happy happy"
#
#             X = np.concatenate((X,np.load(i)))
#             y = np.concatenate((y,np.array([i.split('.')[0]]*size)))
# Now is init =  true  so on next iteration
#   # Now in X we will have the current emotions with the previous emotions
#             X = np.concatenate((X,np.load(i)))
#             # then concatenate older emotions with new emotions
#             y = np.concatenate((y,np.array([i.split('.')[0]]*size)))
#
# it will  add the new data


isInit = False
# searching through the numpy files which hold the emotions nad poses
for i in os.listdir():
    # print(i) # print all the file in the directory
    # checks if the extension of the file ends in npy
    if i.split(".")[-1] =="npy" and not (i.split(".")[0] == "labels"):
        if not(isInit):
            isInit = True
            # X will be the features
            # this will be the array data we get from the numpy files
            X = np.load(i)
            # get the nuumber of elements in an one dimensional array
            size = X.shape[0]
            # basically this will be the name for each numpy file
            # E.g  happy ,sad,angry,etc
            emotionFileName = i.split('.')[0]
            # so what happens is here is the emotion will be multiplied
            # by the length of our array
            # for example :  "happy" x 10  ="[happy,happy,happy,happy,happy,happy,happy,happy,happy,"happy"]"
            y = np.array([emotionFileName]*size).reshape(-1,1)
        else :
            # Now in X we will have the current emotions with the previous emotions
            X = np.concatenate((X,np.load(i)))
            # then concatenate older emotions with new emotions
            y = np.concatenate((y,np.array([i.split('.')[0]]*size).reshape(-1,1)))
        # label is an array of the moods
        label.append(i.split('.')[0])
        # mapping the mood to value   E.g  {'angry':0 , 'happy':1,'sad':2}
        dictionary[i.split('.')[0]] = c  # dictionary[emotion] = value
        c=c+1
# print(X)
# print(y)
print(dictionary)
print(label)

# y array has all the emotions ["happy","sad","angry","happy","happy","sad",...]
# y.shape[0] is the length of that array
for i in range(y.shape[0]):
   # Remember y is actually a matrix  which has this form :
   #[['happy']
   #['sad']
   #['angry']]
   # y[i,0] value is used to look up in the dictionary
   # like  y[i,0] = dictionary['Happy']    where 'Happy' = y[i,0]
   # dictionary['Happy'] = 1
   y[i, 0] = dictionary[y[i, 0]]

y = np.array(y, dtype="int32")
###  hello = 0 nope = 1 ---> [1,0] ... [0,1]



# So basically  the emotions are converted into an array of numbers
# then for each unique number E.g  1 for happy,2 for mad,3 for sad  we'll try to represent it using a matrix
# Example below is used for  this array [1, 2, 3, 3, 2, 1, 2, 3, 3]
# First element is 1 so [1,0,0] ,second is 2 so [0,1,0]  , third is 3 so [0,0,1] ,fourth is 3 so [0,0,1]
# [
#  [1, 0, 0],  # Corresponding to class 1
#  [0, 1, 0],  # Corresponding to class 2
#  [0, 0, 1],  # Corresponding to class 3
#  [0, 0, 1],  # Corresponding to class 3
#  [0, 1, 0],  # Corresponding to class 2
#  [1, 0, 0],  # Corresponding to class 1
#  [0, 1, 0],  # Corresponding to class 2
#  [0, 0, 1],  # Corresponding to class 3
#  [0, 0, 1]   # Corresponding to class 3
# ]

y = to_categorical(y)

X_new = X.copy()
y_new = y.copy()
counter = 0
# E.g if X has 100 samples, np.arange(X.shape[0]) would generate the array [0, 1, 2, ..., 98, 99]
# X.shape[0] is the number of rows in the features array
cnt = np.arange(X.shape[0])
# shuffles the indexes randomly
np.random.shuffle(cnt)

for i in cnt:
    X_new[counter] = X[i]
    y_new[counter] = y[i]
    counter = counter + 1

ip = Input(shape=(X.shape[1]))

m = Dense(512, activation="relu")(ip)
m = Dense(256, activation="relu")(m)

op = Dense(y.shape[1], activation="softmax")(m)

model = Model(inputs=ip, outputs=op)

model.compile(optimizer='rmsprop', loss="categorical_crossentropy", metrics=['acc'])

model.fit(X, y, epochs=50)

model.save("model.h5")
np.save("labels.npy", np.array(label))
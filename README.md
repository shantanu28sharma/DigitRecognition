# DigitRecognition
Digit recognition using Tensorflow.js

###Training Data
The CNN used training the model uses MNIST dataset and the trained model is saved in the local machine using tf.saveModel(). This file is then loaded during realtime prediction using tf.loadLayersModel() which is a tensorflow.js function.

###Preprocessing Canvas
Canvas is used to draw the handwitten digit which is to be predicted. 

<img src="Sample Images">

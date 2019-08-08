# DigitRecognition
Digit recognition using Tensorflow.js

<img src="Sample Images/five.png" width="400">

### Training Data
The CNN used training the model uses MNIST dataset and the trained model is saved in the local machine using tf.saveModel(). This file is then loaded during realtime prediction using tf.loadLayersModel() which is a tensorflow.js function.

### Preprocessing Canvas
Canvas is used to draw the handwritten digit which is to be predicted. 

### Resources
For more information regarding training the model refer:-
<a href="https://www.tensorflow.org/js/tutorials/training/handwritten_digit_cnn"> Training CNN </a>

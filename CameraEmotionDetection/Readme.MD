# Emotion Detection Data Training

To train the emotion detection model, follow these steps:

1. Run the data training script using the command:
    ```bash
    python data_training.py
    ```

2. During the training process, you will be prompted to provide a name for the Numpy (npy) file. For example, you can name it "angry" or "sad." This npy file will store the training data for emotion detection.

3. The training script will analyze emotions until the specified number reaches 99.

4. After the training process is complete, run the data training script again using:
    ```bash
    python data_training.py
    ```

5. Finally, run the inference script to make predictions using the trained model:
    ```bash
    python inference.py
    ```

This workflow allows you to train the emotion detection model, save the training data to an npy file, analyze emotions, and then use the trained model for inference.

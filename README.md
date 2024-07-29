# TuneIn

## Requirements

Make sure you have the libraries installed using `pip install -r requirements.tx`:

## Music Genre Prediction (Genre.py)

This project involves predicting the genre of a music file using machine learning. The model is trained using XGBoost and takes audio features extracted using the `librosa` library.

## Emotion Prediction for Lyrics (VectorEmbedding_to_EmotionClassification.py)

This project uses a model trained on 58k songs to predict the emotion expressed in song lyrics. It leverages the `transformers` library to process text and perform emotion classification.

## Audio-to-Text Conversion Using Deepgram (Audio_to_Lyrics.py)

This project converts audio files to text using Deepgram's Speech-to-Text API. The script handles audio file processing and interacts with Deepgram's API to obtain transcriptions.

## Song Similarity Matching (Search_Query.py)

This project performs similarity matching of songs based on lyrics and tags using the `SentenceTransformer` model. The script computes similarity scores between a query and song lyrics and filters songs based on specified tags.

## Song Processing Project (Song_list_preprocess.py)

This project processes audio files to extract song lyrics, genre, and emotion, and then saves this data to a JSON file. The script uses various modules to perform these tasks, including converting audio to text, predicting genre, and classifying emotion. (More than 50 songs data have been converted and stored in songs_data.json)



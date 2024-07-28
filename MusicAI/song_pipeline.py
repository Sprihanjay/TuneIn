import os
from Genre import predict_genre
from VectorEmbedding_to_EmotionClassification import predict_emotion
from Audio_to_Lyrics import audio_to_text_deepgram

songs_data = {}

def process_songs(audio_file):
    
    lyrics = audio_to_text_deepgram(audio_file)
    genre = predict_genre(audio_file)
    emotion = predict_emotion(lyrics)
    songs_data[audio_file] = [lyrics, {"genre": genre, "emotion": emotion}]

    return songs_data

if __name__ == "__main__":
    audio_file = 'End.mp3'  
    songs_data = process_songs(audio_file)
    print(songs_data)

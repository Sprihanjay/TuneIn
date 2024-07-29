import os
import json
from Genre import predict_genre
from VectorEmbedding_to_EmotionClassification import predict_emotion
from Audio_to_Lyrics import audio_to_text_deepgram

def process_song(file_path):
    title = os.path.basename(file_path).split('.')[0] 
    lyrics = audio_to_text_deepgram(file_path)
    genre = predict_genre(file_path)
    emotion = predict_emotion(lyrics)
    
    return {
        "title": title,
        "lyrics": lyrics,
        "tags": [genre, emotion]
    }

def process_songs_in_directory(directory_path):
    songs = []
    
    for filename in os.listdir(directory_path):
        if filename.endswith(".mp3") or filename.endswith(".wav"):
            file_path = os.path.join(directory_path, filename)
            song_entry = process_song(file_path)
            songs.append(song_entry)
    
    return songs

def save_songs_to_file(songs, filename):
    with open(filename, 'w') as f:
        json.dump(songs, f, indent=4)

if __name__ == "__main__":
    directory_path = '/Users/sprihanjay/Programming/Projects/Songs'
    songs = process_songs_in_directory(directory_path)
    save_songs_to_file(songs, 'songs_data.json')

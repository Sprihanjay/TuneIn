import gradio as gr
from Genre import predict_genre
from VectorEmbedding_to_EmotionClassification import predict_emotion
from Audio_to_Lyrics import audio_to_text_deepgram

def process_songs(audio_file_path):
    lyrics = audio_to_text_deepgram(audio_file_path)
    genre = predict_genre(audio_file_path)
    emotion = predict_emotion(lyrics)
    return lyrics, genre, emotion

iface = gr.Interface(
    fn=process_songs,
    inputs=gr.Audio(type="filepath"),
    outputs=[
        gr.Textbox(label="Lyrics to be used for Vectorization and Search Engine Later"),
        gr.Textbox(label="Genre"),
        gr.Textbox(label="Emotion")
    ],
    title="Music Analysis",
    description="Upload an MP3 file to get the lyrics, genre, and emotion of the song."
)

if __name__ == "__main__":
    iface.launch()

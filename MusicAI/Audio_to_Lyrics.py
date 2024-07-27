import requests
from pydub import AudioSegment
import io
import os
from dotenv import load_dotenv

load_dotenv()

def audio_to_text_deepgram(audio_file_path, language='en'):
    """
    Convert audio file to text using Deepgram's Speech-to-Text API.
    
    :param audio_file_path: Path to the audio file.
    :param language: Language code for the transcription, default is 'en' (English).
    :return: Transcribed text from the audio file.
    """
    api_key = os.getenv('DEEPGRAM_API_KEY')
    if not api_key:
        raise ValueError("API key not found in environment variables")

    #print(f"Using API key: {api_key[:10]}...")

    try:
        audio = AudioSegment.from_file(audio_file_path)
    except Exception as e:
        return f"Error reading audio file: {e}"

    with io.BytesIO() as audio_wav:
        try:
            audio.export(audio_wav, format="wav")
            audio_wav.seek(0)
            audio_data = audio_wav.read()
        except Exception as e:
            return f"Error exporting audio file: {e}"

    url = "https://api.deepgram.com/v1/listen"
    headers = {
        "Authorization": f"Token {api_key}",
        "Content-Type": "audio/wav"
    }
    params = {
        "language": language
    }

    try:
        response = requests.post(url, headers=headers, params=params, data=audio_data)
    except Exception as e:
        return f"Error sending request to Deepgram: {e}"

    #print(f"Response Status Code: {response.status_code}")
    #print(f"Response Text: {response.text}")

    if response.status_code == 200:
        try:
            result = response.json()
            transcript = result['results']['channels'][0]['alternatives'][0]['transcript']
            return transcript
        except Exception as e:
            return f"Error parsing response JSON: {e}"
    else:
        return f"Error: {response.status_code}, {response.text}"

audio_file_path = 'End.wav' 
print(audio_to_text_deepgram(audio_file_path))

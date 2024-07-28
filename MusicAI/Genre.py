import librosa
import numpy as np
import pandas as pd
import joblib
import xgboost as xgb

def predict_genre(filename):
    features_df = get_features(filename)
    scaled_features = scaler.transform(features_df)
    prediction = model.predict(scaled_features)
    genre_map = {0: 'Blues', 1: 'Classical', 2: 'Country', 3: 'Disco', 4: 'Hip-Hop', 5: 'Jazz', 6: 'Metal', 7: 'Pop', 8: 'Reggae', 9: 'Rock'}
    genre = genre_map[prediction[0]]
    
    return genre

def get_features(filename):
    y, sr = librosa.load(filename)
    
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    tempo = librosa.feature.tempo(onset_envelope=onset_env, sr=sr)[0]

    y_harmonic, y_percussive = librosa.effects.hpss(y)
    chroma_stft = librosa.feature.chroma_stft(y=y, sr=sr)
    rmse = librosa.feature.rms(y=y)
    spec_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
    spec_bw = librosa.feature.spectral_bandwidth(y=y, sr=sr)
    spec_rolloff = librosa.feature.spectral_rolloff(y=y + 0.01, sr=sr)[0]
    zero_crossing = librosa.feature.zero_crossing_rate(y)
    mfcc = librosa.feature.mfcc(y=y, sr=sr)

    features_dict = {
        'chroma_stft_mean': np.mean(chroma_stft), 'chroma_stft_var': np.var(chroma_stft),
        'rms_mean': np.mean(rmse), 'rms_var': np.var(rmse),
        'spectral_centroid_mean': np.mean(spec_centroid), 'spectral_centroid_var': np.var(spec_centroid),
        'spectral_bandwidth_mean': np.mean(spec_bw), 'spectral_bandwidth_var': np.var(spec_bw),
        'rolloff_mean': np.mean(spec_rolloff), 'rolloff_var': np.var(spec_rolloff),
        'zero_crossing_rate_mean': np.mean(zero_crossing), 'zero_crossing_rate_var': np.var(zero_crossing),
        'tempo': tempo
    }

    for i in range(1, 21):
        if i-1 < mfcc.shape[0]:  
            features_dict[f'mfcc{i}_mean'] = np.mean(mfcc[i - 1])
            features_dict[f'mfcc{i}_var'] = np.var(mfcc[i - 1])

    df_features = pd.DataFrame(features_dict, index=[0])
    return df_features

model = xgb.XGBClassifier()
model.load_model("models.json")
scaler = joblib.load("scalers.save")

#filename = 'End.wav'
#genre = predict_genre(filename)
#print(f"The predicted genre is: {genre}")

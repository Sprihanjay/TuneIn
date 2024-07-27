from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

lyric_model = SentenceTransformer('all-MiniLM-L6-v2')

songs = [
    {"title": "Song A", "lyrics": "Rain be like so wonderful. I dunno what i am typing", "tags": ["hip-hop", "happy"]},
    {"title": "Song B", "lyrics": "Be like sun, so sunny that ur egg is sunny side up.", "tags": ["metal", "sad"]}
]

for song in songs:
    song['lyrics_vector'] = lyric_model.encode(song['lyrics'])

query = "hip-hop song related to rain"
query_vector = lyric_model.encode(query)

for song in songs:
    song['similarity'] = cosine_similarity([query_vector], [song['lyrics_vector']])[0][0]

filtered_songs = [song for song in songs if "happy" in song['tags'] and "rain" in song['lyrics'].lower()]

sorted_songs = sorted(filtered_songs, key=lambda x: x['similarity'], reverse=True)

for song in sorted_songs:
    print(song['title'], song['similarity'])

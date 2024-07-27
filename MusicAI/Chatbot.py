import random

def parse_input(user_input):
    genre_list = ["blues", "classical", "country", "disco", "hip-hop", "jazz", "metal", "pop", "reggae", "rock"]
    emotions_list = ["admiration", "amusement", "anger", "annoyance", "approval", "caring", "confusion", "curiosity", "desire", "disappointment", "disapproval", "disgust", "embarrassment", "excitement", "fear", "gratitude", "grief", "joy", "love", "nervousness", "optimism", "pride", "realization", "relief", "remorse", "sadness", "surprise"]

    user_genre = None
    user_emotion = None

    for genre in genre_list:
        if genre in user_input.lower():
            user_genre = genre
            break

    for emotion in emotions_list:
        if emotion in user_input.lower():
            user_emotion = emotion
            break

    return user_genre, user_emotion

def recommend_songs(songs, genre, emotion):
    if genre and emotion:
        recommended = [song for song in songs if song["genre"] == genre and song["emotion"] == emotion]
    elif genre:
        recommended = [song for song in songs if song["genre"] == genre]
    elif emotion:
        recommended = [song for song in songs if song["emotion"] == emotion]
    else:
        if songs:
            recommended = [random.choice(songs)]  
        else:
            recommended = []
    
    return recommended


def test_chatbot():
    test_cases = [
        ("I want a hip-hop joyful song", ["Happy Vibes"]),
        ("I want a rock song", ["Rock Anthem"]),
        ("I want a happy song", ["Happy Vibes", "Jazz Joy"]),
        ("I want a song", ["Happy Vibes", "Melancholy Blues", "Surprise Twist", "Jazz Joy", "Gloomy Nights", "Classical Serenity", "Disco Fever", "Rock Anthem", "Country Love", "Reggae Chill"]),
        ("I need a song that makes me feel joy", ["Happy Vibes", "Jazz Joy"]),
        ("Give me a country song", ["Country Love"])
    ]
    
    for user_input, expected in test_cases:
        print(f"Testing: {user_input}")
        genre, emotion = parse_input(user_input)
        if genre is None and emotion is None:
            recommendations = recommend_songs(songs, genre, emotion)
            result = [song['title'] for song in recommendations]
            if any(song in result for song in [s['title'] for s in songs]):
                print("Test passed!")
            else:
                print(f"Test failed! Expected a random song from the list, but got: {result}")
        else:
            recommendations = recommend_songs(songs, genre, emotion)
            result = [song['title'] for song in recommendations]
            if result == expected:
                print("Test passed!")
            else:
                print(f"Test failed! Expected: {expected}, but got: {result}")

if __name__ == "__main__":
    songs = [
        {"title": "Happy Vibes", "genre": "hip-hop", "emotion": "joy"},    
        {"title": "Melancholy Blues", "genre": "blues", "emotion": "sadness"}, 
        {"title": "Surprise Twist", "genre": "hip-hop", "emotion": "surprise"}, 
        {"title": "Jazz Joy", "genre": "jazz", "emotion": "joy"},        
        {"title": "Gloomy Nights", "genre": "hip-hop", "emotion": "grief"},  
        {"title": "Classical Serenity", "genre": "classical", "emotion": "relief"}, 
        {"title": "Disco Fever", "genre": "disco", "emotion": "excitement"},
        {"title": "Rock Anthem", "genre": "rock", "emotion": "anger"},     
        {"title": "Country Love", "genre": "country", "emotion": "love"},   
        {"title": "Reggae Chill", "genre": "reggae", "emotion": "caring"}    
    ]

    test_chatbot()

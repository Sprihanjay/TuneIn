from transformers import TFBertForSequenceClassification, BertTokenizer
import tensorflow as tf

def preprocess_lyrics(lyrics):
    inputs = tokenizer(
        lyrics,
        return_tensors='tf',
        truncation=True,
        padding=True,
        max_length=512
    )
    return inputs

def predict_emotion(lyrics):
    inputs = preprocess_lyrics(lyrics)
    outputs = model(inputs)
    logits = outputs.logits
    probabilities = tf.nn.softmax(logits, axis=-1)
    predicted_class = tf.argmax(probabilities, axis=1).numpy()[0]
    return emotions_list[predicted_class]

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

emotions_list = ["admiration", "amusement", "anger", "annoyance", "approval", "caring", "confusion", "curiosity", "desire", "disappointment", "disapproval", "disgust", "embarrassment", "excitement", "fear", "gratitude", "grief", "joy", "love", "nervousness", "optimism", "pride", "realization", "relief", "remorse", "sadness", "surprise"]

model = TFBertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=len(emotions_list))
model.load_weights('bert-weights.hdf5')
#lyrics = "it starts with one i don't know why it doesn't even matter how hard try keep that in mind on zion ron to explain a do tata oh i know time is a valuable thing watch your plot by is the depend little swings want to count down to the end of the day the clock takes life away so unreal watch out go out the windows trying to hold on didn't even know wasted dogs to watch you i've kept everything inside and even know what's tried i don't know why it doesn't need how hard you try keep that in mind our design is trying to remind myself how i try so it's right of the way you were mocking me hacking my i was part your prophet seed remember on the town you've fought with me friday god things aren't the way they were before you wouldn't even that's me anymore not that she knew me back end but it all comes back to me in and you kept everything inside and even know tried it in you far as i can go for all this only should i've put much trust far i can"
#predicted_emotion = predict_emotion(lyrics)
#print(f"The predicted emotion of the song is: {predicted_emotion}")

# TuneIn



## Requirements for MusicAI

Make sure you have the libraries installed using `pip install -r requirements.tx`:

To run the Gradio file just type: `python app.py` in terminal.

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

## React App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




# TuneIn

## 🎵 Discover. Connect. Perform. 🎤

Welcome to TuneIn, the ultimate networking app for music artists! Whether you're a seasoned musician or just starting your journey, TuneIn is here to revolutionize how you find and apply for music gigs. Streamline your path to success with just a few clicks and get detailed insights about songs and music with our intelligent chatbot. Dive into the future of music networking with TuneIn!

## 🚀 Features

### **1. Job Discovery and Application**
- **Global Job Search**: Effortlessly search for music job opportunities worldwide.
- **Job Posting Creation**: Create and post your own job listings to attract top talent.
- **Application Tracking**: Keep track of your job applications directly from your profile.

### **2. Music Insights and Chatbot**
- **Music Chatbot**: Get instant answers and insights about songs and music-related queries from our smart chatbot.
- **Music Education**: Learn more about music with educational content provided by the chatbot.

### **3. Profile Management**
- **User Profiles**: Build and manage your musician profile to showcase your skills and experience.
- **Job Postings**: Create and manage job postings from your profile.
- **Application Tracking**: Monitor your job applications and stay updated on your progress.

### **4. Music Tagging and Recommendations**
- **Genre and Emotion Tags**: Automatically generate genre and emotion tags for any audio format.
- **Search Query Integration**: Find songs based on user input with our advanced search functionality.
- **Listening Data Tracking**: Track your listening habits and generate personalized tags.

### **5. Profile Matching**
- **Profile Tagging**: Connect with other musicians by matching profiles based on generated tags.

### **6. Tech Stack Integration**
- **Frontend Technologies**: Next.js, React, Framer, Tailwind, CLSx, Tiptap, RadixUI, Tabler Icons.
- **Backend Technologies**: Firebase, Spotify API, Cohere API, Tensorflow, Keras-tf, Transformers.

### **7. Future Plans (Completed but Not Integrated)**
- **Music Tagging Integration**: Our model for genre and emotion tagging is ready but not yet integrated into the frontend.
- **Search Query Functionality**: Our advanced search model is set to return songs based on detailed search queries.

## 📚 Table of Contents
1. [Background](#background)
2. [Our Solution](#our-solution)
3. [Tech Stack](#tech-stack)
4. [Future Plans](#future-plans)
5. [Team Info](#team-info)

## 📜 Background
Struggling to find music gigs or overwhelmed with too much information on music? Meet TuneIn! We simplify the process of discovering and applying for gigs and provide a chatbot that answers all your music-related questions.

## 💡 Our Solution
With TuneIn, you can:
- Ask our chatbot anything about music and get detailed insights.
- Create and apply for jobs with ease.
- Track your job applications directly from your profile.

## 🛠 Tech Stack
Our tech stack includes a powerful mix of frontend and backend technologies, ensuring a seamless and efficient experience for our users.

## 🚀 Future Plans
We have exciting features in the pipeline, including enhanced music tagging and advanced search functionalities. Stay tuned for more updates!

## 👥 Team Info
- [Kenny Cao (CS@GaTech)](https://www.linkedin.com/in/kennycao4)
- [Sprihanjay Banik (CS@GaTech)](https://www.linkedin.com/in/sprihanjay/)
- [Michael Wu (CS@Cornell)](https://www.linkedin.com/in/michael-wu-136044198/)
- [Matthew Chen (CS@Cornell)](https://www.linkedin.com/in/matthew-chen-b7221b1a8/)

## 🤔 Have Questions?
Reach out to us through email or LinkedIn. We’d love to hear from you!

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




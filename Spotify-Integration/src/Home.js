import React, { useEffect, useState } from 'react';

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const Home = () => {
  const [client_id] = useState("b3a4ebce6b914388a326d39f42fac645");
  const [redirect_uri, setRedirectUri] = useState("http://localhost:3000/callback");
  const [scope] = useState("user-top-read playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative");
  const [state] = useState(generateRandomString(16));

  const prod = "development"; // Update to "production" for production environment

  useEffect(() => {
    if (prod === 'production') {
      setRedirectUri('https://mywrappeddata.netlify.app/callback');
    } else {
      setRedirectUri('https://localhost:3000/callback');
    }
  }, [prod]);

  const handleAuthClick = (event) => {
    event.preventDefault();

    const baseURL = 'https://accounts.spotify.com/authorize';
    const params = new URLSearchParams({
      response_type: 'token',
      client_id,
      scope,
      redirect_uri,
      state,
    }).toString();

    const url = `${baseURL}?${params}`;

    window.location.href = url;
  };

  return (
    <div className='App'>
      <div className="contentBox">
        <button className="loginBtn" onClick={handleAuthClick}>Login with Spotify</button>
      </div>
    </div>
  );
}

export default Home;

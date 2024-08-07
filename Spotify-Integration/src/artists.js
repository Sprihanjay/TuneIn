import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./artists.css";
import "./callback.css";
import spotifyIcon from "./spotify_icon_black.png";
import Cookies from "js-cookie";

const Artists = () => {
    const navigate = useNavigate();
    const [formattedArtists, setFormattedArtists] = useState([]);
    const [formattedPics, setFormattedPics] = useState([]);
    const [timeFrame, setTimeFrame] = useState("(Last Month)");
    const [urls, setUrls] = useState([]);
    const [genres, setGenres] = useState([]);
    const logout_url = "https://accounts.spotify.com/en/logout";

    const short_term = 'v1/me/top/artists?time_range=short_term&limit=50';
    const med_term = 'v1/me/top/artists?time_range=medium_term&limit=50';
    const long_term = 'v1/me/top/artists?time_range=long_term&limit=50';
    
    const [timeRange, setTimeRange] = useState(short_term);

    const handleLogout = () => {
        const spotifyLogoutWindow = window.open(logout_url, 'Spotify Logout', 'width=700,height=500,top=40,left=40');                                                                                                
        setTimeout(() => spotifyLogoutWindow.close(), 2000);
        navigate("/");
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove('cookieName', { path: '/' }); // Specify cookie name and path if needed
    };

    const displayAuth = () => {
        let local = String(window.location.href);
        local = local.split("#")[1];
        local = local.split("=")[1];
        local = local.split("&")[0];
        return local;
    };

    const token = displayAuth();

    async function fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
            body: JSON.stringify(body)
        });
        return await res.json();
    }
    
    function getTimeFrame() {
        if (timeRange === short_term) {
            setTimeFrame("(Last Month)");
        } else if (timeRange === med_term) {
            setTimeFrame("(Last 6 Months)");
        } else {
            setTimeFrame("(All Time)");
        }
    }

    async function getTopArtists() {
        const topTracksResponse = await fetchWebApi(timeRange, 'GET');
    
        if (!topTracksResponse.items || topTracksResponse.items.length === 0) {
            return []; // Return an empty array when there are no top tracks
        }
    
        return topTracksResponse.items;
    }

    const displayTopArtists = async () => {
        try {
            const topArtists = await getTopArtists();
            console.log(topArtists);
            let artists = [];
            let pictures = [];
            let temp_urls = [];
            let temp_genres = [];
            for (let i = 0; i < topArtists.length; i++) {
                pictures.push(topArtists[i]["images"][0]["url"]);
                temp_urls.push(topArtists[i].external_urls.spotify);
                temp_genres.push(topArtists[i].genres && topArtists[i].genres[0] ? topArtists[i].genres[0] : "Unknown");
            }
            for (let n = 0; n < topArtists.length; n++) {
                artists.push(topArtists[n]["name"]);
            }
            setFormattedArtists(artists);
            setFormattedPics(pictures);
            setUrls(temp_urls);
            setGenres(temp_genres);
        } catch (error) {
            console.error("Error fetching top tracks:", error);
        }
    }

    useEffect(() => {
        getTimeFrame();
    }, [timeRange]);

    useEffect(() => {
        displayTopArtists();
    }, [timeRange]);

    return (
        <div className="mainDiv">
            <div className="navBar">
                <button style={{marginRight: ""}} onClick={handleLogout}>Log Out</button>
                <Link to={"/callback" + window.location.hash}>Get Top Songs</Link>
                <button onClick={() => setTimeRange(short_term)}>Last Month</button>
                <button onClick={() => setTimeRange(med_term)}>Last 6 Months</button>
                <button onClick={() => setTimeRange(long_term)}>All Time</button>
            </div>
            <h1 className="header">Your Top Artists {timeFrame}</h1>
            <ol className="artistList" id="myList">
                {formattedArtists.map((element, index) => (
                    <li key={index}>
                        {formattedPics[index] && (
                            <img className="artistImage" src={formattedPics[index]} alt={element} />
                        )}
                        {element}
                        <div className="genre">
                            {genres[index] !== undefined && genres[index].trim() !== "" ? (
                                <p>Genre: {genres[index]}</p>
                            ) : (
                                <p>Genre: Underground</p>
                            )}
                        </div>
                        <div className="buttonContainer">
                            {urls[index] && (
                                <a className="linkButton" href={urls[index]} target="_blank" rel="noopener noreferrer">
                                    <button><img className="spotifyIcon" src={spotifyIcon} title="Open this icon to view the Artist" /></button>
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Artists;

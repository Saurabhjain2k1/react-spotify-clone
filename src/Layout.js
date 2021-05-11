import React, { useEffect } from "react";
import Login from "./auth/Login";
import { getTokenFromUrl } from './auth/spotify'
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./context/DataLayer";
import Player from "./components/Player";

const spotify = new SpotifyWebApi();

const Layout = () => {
    const [{token }, dispatch] = useDataLayerValue();

    useEffect(() => {
        const hash = getTokenFromUrl();
        window.location.hash = "";
        const _token = hash.access_token;
        if (_token) {
            dispatch({
                type: 'SET_TOKEN',
                token: _token
            })
            spotify.setAccessToken(_token);

            spotify.getMe().then((user) => {
                dispatch({
                    type: 'SET_USER',
                    user: user
                })
            })

            spotify.getUserPlaylists().then((playlists) => {
                dispatch({
                    type: "SET_PLAYLISTS",
                    playlists: playlists
                })
            })
            spotify.getPlaylist('37i9dQZEVXcIdL49Ip8wiY').then(response => {
                dispatch({
                    type: "SET_DISCOVER_WEEKLY",
                    discover_weekly: response
                })
            })
        }
    }, []);
    return (
        <div className="layout">
            {
                token ? (
                    <Player spotify={spotify} />
                ) : (
                    <Login />
                )
            }
        </div>
    )
}

export default Layout


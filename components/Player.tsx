import Script from 'next/script';
import React, { useEffect, useState } from 'react'

const track = {
  name: "",
  album: {
      images: [
          { url: "" }
      ]
  },
  artists: [
      { name: "" }
  ]
}

export const Player = () => {

  const [ player, setPlayer ] = useState(undefined);
  const [ is_paused, setPaused ] = useState(false);
  const [ is_active, setActive ] = useState(false);
  const [ current_track, setTrack ] = useState(track);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {

      const player = new window.Spotify.Player({
          name: 'Player du bled',
          getOAuthToken: cb => { 
            fetch('/api/spotify/player/oauth-token')
              .then(res => res.json())
              .then(json => cb(json.access_token) )
          },
          volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
      });

      player.connect();

      player.addListener('player_state_changed', ( state => {
        if (!state) {
            return;
        }
    
        setTrack(state.track_window.current_track);
        setPaused(state.paused);
    
        player.getCurrentState().then( state => { 
            (!state)? setActive(false) : setActive(true) 
        });
      }));
    };  
  
  }, []);

  return (
    <>
      <Script src='https://sdk.scdn.co/spotify-player.js' />

      <div className="container">
        <div className="main-wrapper">
          <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />

          <div className="now-playing__side">
            <div className="now-playing__name">{current_track.name}</div>
            <div className="now-playing__artist">{current_track.artists[0].name}</div>
          </div>

          <button className="btn-spotify" onClick={() => { player?.previousTrack() }} >
          &lt;&lt;
          </button>

          <button className="btn-spotify" onClick={() => { player?.togglePlay() }} >
          { is_paused ? "PLAY" : "PAUSE" }
          </button>

          <button className="btn-spotify" onClick={() => { player?.nextTrack() }} >
          &gt;&gt;
          </button>
        </div>
      </div>
    </>
  )
}

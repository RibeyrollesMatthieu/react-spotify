import { kStringMaxLength } from 'buffer';
import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react'
import { I__track } from '../redux/features/playerSlice';
import { PlayingTrack } from './PlayingTrack';

const initialTrack: I__track = {
  name: '',
  artists: [{ name: '' }],
  album: {
    images: [{ url: '' }]
  }
};

export const Player = () => {

  const [ player, setPlayer ] = useState(undefined);
  const [ is_paused, setPaused ] = useState<boolean>(false);
  const [ is_active, setActive ] = useState<boolean>(false);
  const [ current_track, setTrack ] = useState<I__track>(initialTrack);
  const [ repeat, setRepeat ] = useState<0 | 1 | 2>(0);
  const [ duration, setDuration ] = useState<number>(0);
  const [ progress, setProgress ] = useState<number>(0);
  const progressRef = useRef({});
  const is_pausedRef = useRef({});

  progressRef.current = progress;
  is_pausedRef.current = is_paused;
  
  useEffect(() => {
    setInterval(() => {
      setProgress(is_pausedRef.current ? progressRef.current as number : progressRef.current as number + 1000);
    }, 1000);
  }, [])

  const setRepeatTo = (state: 'off' | 'context' | 'track') => {
    fetch(`/api/spotify/player/repeat?state=${state}`)
  }

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {

      const player = new window.Spotify.Player({
          name: 'Custom player',
          getOAuthToken: cb => { 
            fetch('/api/spotify/player/oauth-token')
              .then(res => res.json())
              .then(json => cb(json.access_token) )
          },
          volume: 1
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
    
        console.log(state);
        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        setRepeat(state.repeat_mode);
        setDuration(state.duration);
        setProgress(state.position);

        player.getCurrentState().then( state => { 
            (!state)? setActive(false) : setActive(true) 
        });
      }));

      // updateProgress();
    };  
  
  }, []);

  return (
    <>
      <Script src='https://sdk.scdn.co/spotify-player.js' />

      <PlayingTrack progress={progressRef.current as number} duration={duration} repeatCallback={setRepeatTo} repeat={repeat} isPaused={is_paused} track={current_track} nextTrack={() => player?.nextTrack()} previousTrack={() => player?.previousTrack()} togglePlay={() => player?.togglePlay()} />
    </>
  )
}

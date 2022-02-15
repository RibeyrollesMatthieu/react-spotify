import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks'
import Script from 'next/script';
import { I__player, pausePlayer, resumePlayer, setPlayer } from '../redux/features/playerSlice';
import { Player } from '../components/Player';

const Home: NextPage = () => {

  const player = useAppSelector(store => store.player);
  const dispatch = useAppDispatch();

  useEffect(() => {

    // setInterval(() => {
    //   fetch('http://localhost:3000/api/spotify/player/currently-playing')
    //   .then(res => res.json())
    //   .then(json => {
    //     const currentlyPlaying: I__player = {
    //       content: {
    //         name: json.item.name,
    //         artist: json.item.artists[0].name
    //       },
    //       playing: json.is_playing
    //     }

    //     dispatch(setPlayer(currentlyPlaying));
    //   })
    // }, 100);
  }, [dispatch]);

  const pause = (action: string) => {
    fetch(`/api/spotify/player/pause?action=${action}`);
  }

  return (
    <>
      <Player />
    </>
  )
}

export default Home
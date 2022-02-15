import React from 'react'
import { I__track } from '../redux/features/playerSlice'
import { getDuration } from '../utils/getDuration';
import styles from './../styles/components/player.module.scss';
import { Chevron } from './Chevron';
import { Heart } from './Heart';
import { Pause } from './Pause';
import { Play } from './Play';
import { PreviousNext } from './PreviousNext';
import { Queue } from './Queue';
import { Repeat } from './Repeat';
import { ShuffleRandom } from './ShuffleRandom';

interface props {
  track: I__track;
  togglePlay: Function;
  previousTrack: Function;
  nextTrack: Function;
  isPaused: boolean;
  repeat: 0 | 1 | 2;
  repeatCallback: Function;
  duration: number;
  progress: number;
}

export const PlayingTrack = ({ progress, duration, repeatCallback, repeat, track, togglePlay, previousTrack, nextTrack, isPaused }: props) => {

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.chevron}><Chevron /></button>
        <span>Playing now</span>
        <button><Queue /></button>
      </header>

      <img className={styles.album_cover} src={ track.album?.images[0]?.url } alt="Album cover" />

      <div className={styles.track_infos}>
        <div className={styles.track}>
          <h1 className={styles.name}>{ track.name }</h1>
          <span className={styles.artists}>
            {
              track.artists.map((artist, index) => (
                `${artist.name}${index !== track.artists.length-1 ? ', ' : ''}`
              ))
            }
          </span>
        </div>

        <button className={styles.heart} onClick={(e) => (e.target as HTMLButtonElement).classList.toggle(styles.liked)} >
          <Heart />
        </button>
      </div>

      <div>
        <div className={styles.timer}>
          <div style={{ width: (progress * 100 / duration).toFixed(2) + '%'}} className={styles.timer_progress}></div>
        </div>

        <div className={styles.timestamps}>
          <span>{ getDuration(progress)} </span>
          <span>{ getDuration(duration) }</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button ><ShuffleRandom /></button>
        <button onClick={() => previousTrack()}><PreviousNext /></button>
        <button className={styles.play_pause} onClick={() => togglePlay()}>{ isPaused ? <Play /> : <Pause /> }</button>
        <button onClick={() => nextTrack()} className={styles.next} ><PreviousNext /></button>
        <button
          onClick={() => repeatCallback(repeat === 0 ? 'context' : (repeat === 1 ? 'track' : 'off'))}
          className={ repeat === 1 ? styles.repeat_all : (repeat === 2 ? styles.repeat_one : '') } ><Repeat /></button>
      </div>
    </div>
  )
}

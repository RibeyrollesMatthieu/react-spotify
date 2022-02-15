import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface I__player {
  content: {
    name: string;
    artist: string;
  }
  playing: boolean;
}

const initialState: I__player = {
  content: {
    name: '',
    artist: ''
  },
  playing: false
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<I__player>) => state = { ...action.payload },
    pausePlayer: state => { state.playing = false },
    resumePlayer: state => { state.playing = true },
  }
});

export const { setPlayer, pausePlayer, resumePlayer } = playerSlice.actions;
export default playerSlice.reducer;
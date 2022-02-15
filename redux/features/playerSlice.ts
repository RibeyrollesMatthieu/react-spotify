import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface I__track {
  name: string;
  artists: [{ name: string; }];
  album: {
    images: [{ url: string; }]
  }
}
export interface I__player {
  track: I__track;
  playing: boolean;
}

export const initialState: I__player = {
  track: {
    name: '',
    artists: [{ name: ''}],
    album: {
      images: [{ url: ''}]
    }
  },
  playing: false
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<I__player>) => state = { ...action.payload },
  }
});

export const { setPlayer } = playerSlice.actions;
export default playerSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface I__user {
  readonly name: string;
  readonly country: string;
  readonly email: string;
  readonly profile_url: string;
  readonly followers: number;
  readonly id: string;
  readonly premium: boolean;
}

const initialState: I__user = {
  name: '',
  country: '',
  email: '',
  profile_url: '',
  followers: 0,
  id: '',
  premium: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string> ) => { state.name = action.payload; },
    setUser: (state, action: PayloadAction<I__user>) => {
      return state = { ...action.payload }
    }
  }
})

export const { setName, setUser } = userSlice.actions;
export default userSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  Challenge,
  getChallenges as getChallengesRequest,
} from '../../core/services/challenges';

export const getChallenges = createAsyncThunk(
  'challenge/getChallenges',
  async (_, ThunkAPI) => {
    const result = await getChallengesRequest();
    if (!result) {
      return;
    }
    ThunkAPI.dispatch(challengesSlice.actions.challenges(result));
  },
);

const challengesSlice = createSlice({
  name: 'challenge',
  initialState: {
    challenges: [] as Challenge[],
  },
  reducers: {
    challenges: (state, action: PayloadAction<Challenge[]>) => {
      state.challenges = action.payload;
    },
  },
});

export default challengesSlice;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  Challenge,
  getChallenges as getChallengesRequest,
} from '../../core/services/challenges';

const NAMESPACE = 'challenge';

type GetChallenges = {
  PAYLOAD_CREATOR: void;
  PAYLOAD_RETURNED: Challenge[] | null;
}

export const getChallenges = createAsyncThunk<
GetChallenges['PAYLOAD_RETURNED'],
GetChallenges['PAYLOAD_CREATOR'],
{}
>(
  `${NAMESPACE}/getChallenges`,
  async (_, __) => {
    const result = await getChallengesRequest();
    return result;
  },
);

const challengesSlice = createSlice({
  name: NAMESPACE,
  initialState: {
    challenges: [] as Challenge[],
  },
  reducers: {
    challenges: (state, action: PayloadAction<Challenge[]>) => {
      state.challenges = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChallenges.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.challenges = action.payload;
    });
  },
});

export default challengesSlice;

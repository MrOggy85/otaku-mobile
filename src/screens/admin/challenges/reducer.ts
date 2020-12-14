import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  Challenge,
  getChallenges as getChallengesRequest,
} from '../../../core/services/challenges';

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
    loading: false,
  },
  reducers: {
    challenges: (state, action: PayloadAction<Challenge[]>) => {
      state.challenges = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChallenges.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) {
        return;
      }
      state.challenges = action.payload;
    }).addCase(getChallenges.pending, (state) => {
      state.loading = true;
    }).addCase(getChallenges.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default challengesSlice;

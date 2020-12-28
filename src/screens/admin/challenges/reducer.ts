import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  Challenge,
  getAll,
  update,
  add,
  remove,
} from '../../../core/services/challenges';

const NAMESPACE = 'challenge';

export const getChallenges = createAsyncThunk<
Challenge[] | null,
void,
{}
>(
  `${NAMESPACE}/getChallenges`,
  async (_, __) => {
    const result = await getAll();
    return result;
  },
);

type AddChallenge = Parameters<typeof add>[0]

export const addChallenge = createAsyncThunk<
boolean,
AddChallenge,
{}
>(
  `${NAMESPACE}/addChallenge`,
  async (challenge, thunkApi) => {
    const result = await add(challenge);
    if (result) {
      thunkApi.dispatch(getChallenges());
    }
    return result;
  },
);

type UpdateChallenge = Parameters<typeof update>[0]

export const updateChallenge = createAsyncThunk<
boolean,
UpdateChallenge,
{}
>(
  `${NAMESPACE}/updateChallenge`,
  async (challenge, thunkApi) => {
    const result = await update(challenge);
    if (result) {
      thunkApi.dispatch(getChallenges());
    }
    return result;
  },
);

type RemoveChallengeId = Parameters<typeof remove>[0]

export const removeChallenge = createAsyncThunk<
boolean,
RemoveChallengeId,
{}
>(
  `${NAMESPACE}/removeChallenge`,
  async (challengeId, thunkApi) => {
    const result = await remove(challengeId);
    if (result) {
      thunkApi.dispatch(getChallenges());
    }
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

    builder.addCase(addChallenge.fulfilled, (state) => {
      state.loading = false;
    }).addCase(addChallenge.pending, (state) => {
      state.loading = true;
    }).addCase(addChallenge.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateChallenge.fulfilled, (state) => {
      state.loading = false;
    }).addCase(updateChallenge.pending, (state) => {
      state.loading = true;
    }).addCase(updateChallenge.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(removeChallenge.fulfilled, (state) => {
      state.loading = false;
    }).addCase(removeChallenge.pending, (state) => {
      state.loading = true;
    }).addCase(removeChallenge.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default challengesSlice;

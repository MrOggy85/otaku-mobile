import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { startSpeaking as speechStartSpeaking } from '../../core/services/speech';

export const startSpeaking = createAsyncThunk(
  'speak/startSpeaking',
  async (_, __) => {
    await speechStartSpeaking();
  },
);

const speakSlice = createSlice({
  name: 'speak',
  initialState: {
    isSpeaking: false,
    spoken: '',
  },
  reducers: {
    speaking: (state, action: PayloadAction<boolean>) => {
      state.isSpeaking = action.payload;
    },
    spoken: (state, action: PayloadAction<string[]>) => {
      const first = action.payload[0] || '';

      state.spoken = first;
    },
  },
});

export default speakSlice;

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { startSpeaking as speechStartSpeaking } from '../../core/services/speech';
// import store from '../../core/redux/store';

export const startSpeaking = createAsyncThunk(
  'speak/startSpeaking',
  async (_, __) => {
    await speechStartSpeaking();
  },
);

// event.onSpeechStart = (result) => {
//   if (!result) {
//     store.dispatch(speakSlice.actions.speaking(true));
//   }
// };

// event.onSpeechEnd = (result) => {
//   if (!result) {
//     store.dispatch(speakSlice.actions.speaking(false));
//   }
// };

// event.onSpeechResults = (result) => {
//   if (!result) {
//     store.dispatch(speakSlice.actions.spoken(result));
//   }
// };

// const listen = createAsyncThunk(
//   'speak/listen',
//   async (state) => {
//     event.onSpeechStart = (result) => {
//       if (!result) {
//         store.dispatch()
//       }
//     };
//   },
// );

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
    // startSpeaking: (state, action: PayloadAction<void>) => {
    //   speechStartSpeaking();
    //   state.isSpeaking = true;
    // },
  },
  // extraReducers: builder => {
  //   builder.addCase(startSpeaking.fulfilled, (state, action) => {
  //     state.isSpeaking = true;
  //   });
  // },
});

export default speakSlice;

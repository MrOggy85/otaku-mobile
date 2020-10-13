import { createSlice, PayloadAction, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import { startSpeaking as speechStartSpeaking, bindEvents } from '../../core/services/speech';
import { add, SentenceAdd, Sentence, getAll } from '../../core/services/sentences';

export const startSpeaking = createAsyncThunk(
  'speak/startSpeaking',
  async (_, TrunkAPI) => {
    setupEvents(TrunkAPI.dispatch);
    await speechStartSpeaking();
  },
);

export const sendSentence = createAsyncThunk(
  'speak/sendSentence',
  async (sentence: SentenceAdd, _) => {
    await add(sentence);
  },
);

export const getSentences = createAsyncThunk(
  'speak/getSentences',
  async (_, __) => {
    const sentences = await getAll();
    return sentences;
  },
);

type Events = Parameters<typeof bindEvents>[0]

function setupEvents(dispatch: ThunkDispatch<any, any, any>) {
  const onSpeechStart: Events['onSpeechStart'] = (result) => {
    console.log('onSpeechStart', result);
    dispatch(editSlice.actions.speaking(result));
  };

  const onSpeechEnd = () => {
    dispatch(editSlice.actions.speaking(false));
  };

  const onSpeechResults: Events['onSpeechResults'] = (result) => {
    dispatch(editSlice.actions.spoken(result));
  };

  bindEvents({
    onSpeechStart,
    onSpeechEnd,
    onSpeechResults,
  });
}

const editSlice = createSlice({
  name: 'edit',
  initialState: {
    isSpeaking: false,
    spoken: [] as string[],
    sentences: [] as Sentence[],
  },
  reducers: {
    speaking: (state, action: PayloadAction<boolean>) => {
      state.isSpeaking = action.payload;
    },
    spoken: (state, action: PayloadAction<string[]>) => {
      state.spoken = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSentences.fulfilled, (state, action) => {
      if (action.payload) {
        state.sentences = action.payload;
      }
    });
  },
});

export default editSlice;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  Sentence,
  getAll,
  update,
  add,
  remove,
} from '../../../core/services/sentences';

const NAMESPACE = 'sentence';

export const getSentences = createAsyncThunk<
Sentence[] | null,
void,
{}
>(
  `${NAMESPACE}/getAll`,
  async (_, __) => {
    const result = await getAll();
    return result;
  },
);

type AddSentence = Parameters<typeof add>[0]

export const addSentence = createAsyncThunk<
boolean,
AddSentence,
{}
>(
  `${NAMESPACE}/add`,
  async (sentence, thunkApi) => {
    const result = await add(sentence);
    if (result) {
      thunkApi.dispatch(getSentences());
    }
    return result;
  },
);

type Update = Parameters<typeof update>[0]

export const updateSentence = createAsyncThunk<
boolean,
Update,
{}
>(
  `${NAMESPACE}/update`,
  async (sentence, thunkApi) => {
    const result = await update(sentence);
    if (result) {
      thunkApi.dispatch(getSentences());
    }
    return result;
  },
);

type Remove = Parameters<typeof remove>[0]

export const removeSentence = createAsyncThunk<
boolean,
Remove,
{}
>(
  `${NAMESPACE}/remove`,
  async (id, thunkApi) => {
    const result = await remove(id);
    if (result) {
      thunkApi.dispatch(getSentences());
    }
    return result;
  },
);

const sentenceSlice = createSlice({
  name: NAMESPACE,
  initialState: {
    sentences: [] as Sentence[],
    loading: false,
  },
  reducers: {
    challenges: (state, action: PayloadAction<Sentence[]>) => {
      state.sentences = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSentences.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) {
        return;
      }
      state.sentences = action.payload;
    }).addCase(getSentences.pending, (state) => {
      state.loading = true;
    }).addCase(getSentences.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(addSentence.fulfilled, (state) => {
      state.loading = false;
    }).addCase(addSentence.pending, (state) => {
      state.loading = true;
    }).addCase(addSentence.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateSentence.fulfilled, (state) => {
      state.loading = false;
    }).addCase(updateSentence.pending, (state) => {
      state.loading = true;
    }).addCase(updateSentence.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(removeSentence.fulfilled, (state) => {
      state.loading = false;
    }).addCase(removeSentence.pending, (state) => {
      state.loading = true;
    }).addCase(removeSentence.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default sentenceSlice;

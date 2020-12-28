import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  Tag,
  getAll as getAllTagsRequest,
  add,
  update,
  remove,
} from '../../../core/services/tags';
import { getChallenges } from '../challenges/reducer';

const NAMESPACE = 'tags';

export const getTags = createAsyncThunk<
Tag[] | null,
void,
{}
>(
  `${NAMESPACE}/getTags`,
  async (_, __) => {
    const result = await getAllTagsRequest();
    return result;
  },
);

type AddTag = Parameters<typeof add>[0]

export const addTag = createAsyncThunk<
  boolean,
  AddTag,
  {}
>(
  `${NAMESPACE}/addTag`,
  async (tag, thunkApi) => {
    const result = await add(tag);
    if (result) {
      thunkApi.dispatch(getTags());
    }
    return result;
  },
);

type UpdateTag = Parameters<typeof update>[0]

export const updateTag = createAsyncThunk<
  boolean,
  UpdateTag,
  {}
>(
  `${NAMESPACE}/updateTag`,
  async (tag, thunkApi) => {
    const result = await update(tag);
    if (result) {
      thunkApi.dispatch(getTags());
      thunkApi.dispatch(getChallenges());
    }
    return result;
  },
);

type RemoveTagId = Parameters<typeof remove>[0]

export const removeTag = createAsyncThunk<
  boolean,
  RemoveTagId,
  {}
>(
  `${NAMESPACE}/removeTag`,
  async (tagId, thunkApi) => {
    const result = await remove(tagId);
    if (result) {
      thunkApi.dispatch(getTags());
      thunkApi.dispatch(getChallenges());
    }
    return result;
  },
);

const tagsSlice = createSlice({
  name: NAMESPACE,
  initialState: {
    tags: [] as Tag[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) {
        return;
      }
      state.tags = action.payload;
    }).addCase(getTags.pending, (state) => {
      state.loading = true;
    }).addCase(getTags.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(addTag.fulfilled, (state) => {
      state.loading = false;
    }).addCase(addTag.pending, (state) => {
      state.loading = true;
    }).addCase(addTag.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateTag.fulfilled, (state) => {
      state.loading = false;
    }).addCase(updateTag.pending, (state) => {
      state.loading = true;
    }).addCase(updateTag.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(removeTag.fulfilled, (state) => {
      state.loading = false;
    }).addCase(removeTag.pending, (state) => {
      state.loading = true;
    }).addCase(removeTag.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default tagsSlice;

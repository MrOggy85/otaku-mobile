import speakSlice from '../../screens/speak/reducer';
import challengesSlice from '../../screens/admin/challenges/reducer';
import editSlice from '../../screens/edit/reducer';
import tagsSlice from '../../screens/admin/tags/reducer';
import sentenceSlice from '../../screens/admin/sentences/reducer';

const rootReducer = {
  speak: speakSlice.reducer,
  challenges: challengesSlice.reducer,
  sentences: sentenceSlice.reducer,
  tags: tagsSlice.reducer,
  edit: editSlice.reducer,
};

export default rootReducer;

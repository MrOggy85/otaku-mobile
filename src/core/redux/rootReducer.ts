import speakSlice from '../../screens/speak/reducer';
import challengesSlice from '../../screens/challenges/reducer';
import editSlice from '../../screens/edit/reducer';

const rootReducer = {
  speak: speakSlice.reducer,
  challenges: challengesSlice.reducer,
  edit: editSlice.reducer,
};

export default rootReducer;

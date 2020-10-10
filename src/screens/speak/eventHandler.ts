import store from '../../core/redux/store';
import { event } from '../../core/services/speech';
import speakSlice from './reducer';

event.onSpeechStart = (result) => {
  console.log('onSpeechStart', result);
  store.dispatch(speakSlice.actions.speaking(result));
};

event.onSpeechEnd = () => {
  store.dispatch(speakSlice.actions.speaking(false));
};

event.onSpeechResults = (result) => {
  store.dispatch(speakSlice.actions.spoken(result));
};

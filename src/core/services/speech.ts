import Voice, {
  SpeechStartEvent,
  SpeechResultsEvent,
  SpeechEndEvent,
} from '@react-native-community/voice';

const LOCALE = 'ja-JP';

Voice.onSpeechStart = onSpeechStart;
Voice.onSpeechEnd = onSpeechEnd;
Voice.onSpeechResults = onSpeechResults;

function onSpeechStart(e: SpeechStartEvent) {
  if (e.error) {
    console.error('SpeechStart error', e);
  }

  if (event.onSpeechStart) {
    event.onSpeechStart(!e.error);
  }
}

function onSpeechEnd(e: SpeechEndEvent) {
  if (e.error) {
    console.error('SpeechEnd error', e);
  }
  if (event.onSpeechEnd) {
    event.onSpeechEnd();
  }
}

function onSpeechResults(e: SpeechResultsEvent) {
  console.log('onSpeechResults', e.value);

  if (event.onSpeechResults) {
    event.onSpeechResults(e.value || []);
  }
}

type Event = {
  onSpeechStart: null | ((result: boolean) => void);
  onSpeechEnd: null | (() => void);
  onSpeechResults: null | ((result: string[]) => void);
}

export const event: Event = {
  onSpeechStart: null,
  onSpeechEnd: null,
  onSpeechResults: null,
};

export async function startSpeaking() {
  try {
    await Voice.start(LOCALE);
  } catch (error) {
    console.error('Voice.start error', error);
    return false;
  }

  return true;
}

export async function stopSpeaking() {
  try {
    await Voice.stop();
  } catch (error) {
    console.error('Voice.stop error', error);
  }
}

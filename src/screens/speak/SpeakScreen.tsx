import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import Voice, { SpeechStartEvent, SpeechResultsEvent } from '@react-native-community/voice';

type OwnProps = {};
type Props = OwnProps & NavigationComponentProps;

const SpeakScreen: NavigationFunctionComponent<Props> = () => {
  const [status, setStatus] = useState('speech: wait...');
  const [services, setServices] = useState('wait...');
  const [voices, setVoices] = useState('wait...');

  const onSpeechStart = (e: SpeechStartEvent) => {
    setStatus('speech start');

  };
  const onSpeechEnd = (e: SpeechStartEvent) => {
    setStatus('speech end');
  };
  const onSpeechResults = (e: SpeechResultsEvent) => {
    let spoken = '';
    e.value?.forEach(v => {
      spoken += ` ${v}`;
    });
    setStatus(`speech: ${spoken}`);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    const hej = Voice.getSpeechRecognitionServices();
    if (hej) {
      let s = '';
      hej.then(result => {
        s += ` ${result}, `;
        setServices(s);
      }).catch(reason => {
        setServices(`failed: ${reason}`);
      });
    } else {
      setServices('none');
    }

    const tja = Voice.isAvailable();
    if (tja) {
      let s = '';
      tja.then(result => {
        s += ` ${result}, `;
        setVoices(s);
      }).catch(reason => {
        setVoices(`failed: ${reason}`);
      });
    }
  }, []);

  const onStart = useCallback(() => {
    Voice.start('ja-JP')
      .then(hej => {

      }).catch(reason => {
        setStatus(`speech: failed ${reason}`);
      })
  }, []);

  const onStop = useCallback(() => {
    Voice.stop();
  }, []);

  const voiceAvailability = `Is Voice available: ${voices}`;
  const speechRegognicionServices = `Services: ${services}`;

  return (
    <View style={styles.root}>
      <Text>
        Speak Screen
      </Text>
      <Text>
        {voiceAvailability}
      </Text>
      <Text>
        {speechRegognicionServices}
      </Text>
      <Text>
        {status}
      </Text>
      <Button
        title="Start"
        color="#710ce3"
        onPress={onStart}
      />
      <Button
        title="Stop"
        color="#710ce3"
        onPress={onStop}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});

export default SpeakScreen;

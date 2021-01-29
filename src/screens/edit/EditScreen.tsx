import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { startSpeaking } from './reducer';
import CheckBox from '@react-native-community/checkbox';

type OwnProps = {
  id: string;
};
type Props = OwnProps & NavigationComponentProps;

type Listener = {
  id: number;
  callback: (ja: string[]) => void;
}

let listeners = [] as Listener[];

let listenerId = 0;

export const addListener = (callback: Listener['callback']) => {
  listenerId++;
  listeners.push({
    id: listenerId,
    callback,
  });

  return null;
};

const emitEvent = (ja: string[]) => {
  listeners.forEach(x => {
    x.callback(ja);
  });
};


const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
  speakingWrapper: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'white',
    width: '80%',
  },
  checkboxWrapper: {
    width: '80%',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  checkboxText: {
    marginTop: 5,
  },
  startButtonWrapper: {
    width: '80%',
    marginBottom: 10,
  },
  sendButtonWrapper: {
    width: '80%',
  },
});

const EditScreen: NavigationFunctionComponent<Props> = ({ id, componentId }: Props) => {
  const isSpeaking = useSelector(state => state.edit.isSpeaking);
  const spoken = useSelector(state => state.edit.spoken);
  const dispatch = useDispatch();

  const [english, setEnglish] = useState('');
  const [checked, setChecked] = useState({} as Record<number, boolean>);

  const onSpeak = useCallback(() => {
    dispatch(startSpeaking());
  }, [dispatch]);

  const onSend = useCallback(() => {
    const jsToSend = spoken.filter((x, i) => {
      return checked[i];
    });

    emitEvent(jsToSend);
    listeners = []
    Navigation.pop(componentId);
  }, [spoken, checked, componentId]);

  const onTextChange = useCallback((text: string) => {
    setEnglish(text);
  }, []);

  const onCheckBoxChange = useCallback((value: boolean, index: number) => {
    const checkedCopy = {
      ...checked,
    };
    checkedCopy[index] = value;
    setChecked(checkedCopy);
  }, [checked]);

  return (
    <View style={styles.root}>
      <View style={styles.speakingWrapper}>
        <Text>
          {`is Speaking ${isSpeaking}`}
        </Text>
      </View>
      <TextInput
        value={english}
        onChangeText={onTextChange}
        style={styles.textInput}
      />
      <Text>
        Spoken:
      </Text>
      {spoken.map((x, i) => {
        return (
          <View
            key={x}
            style={styles.checkboxWrapper}
          >
            <CheckBox
              value={checked[i]}
              onValueChange={(value: boolean) => {
                onCheckBoxChange(value, i);
              }}
            />
            <Text style={styles.checkboxText}>
              {x}
            </Text>
          </View>
        );
      })}
      <View style={styles.startButtonWrapper}>
        <Button
          title="Speak"
          color="green"
          onPress={onSpeak}
        />
      </View>
      <View style={styles.sendButtonWrapper}>
        <Button
          title="Send"
          color="skyblue"
          onPress={onSend}
        />
      </View>
    </View>
  );
};

export default EditScreen;

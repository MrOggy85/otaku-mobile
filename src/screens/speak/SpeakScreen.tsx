import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { startSpeaking } from './reducer';
import './eventHandler';

type OwnProps = {};
type Props = OwnProps & NavigationComponentProps;

const SpeakScreen: NavigationFunctionComponent<Props> = () => {
  const isSpeaking = useSelector(state => state.speak.isSpeaking);
  const spoken = useSelector(state => state.speak.spoken);
  const dispatch = useDispatch();

  const onStart = useCallback(() => {
    dispatch(startSpeaking());
  }, [dispatch]);

  return (
    <View style={styles.root}>
      <Text>
        {`is Speaking ${isSpeaking}`}
      </Text>
      <Text>
        {`spoken: ${spoken}`}
      </Text>
      <Button
        title="Start"
        color="green"
        onPress={onStart}
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

import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { SPEAK, SENTENCES } from '../../core/navigation/screens';
import { useDispatch, useSelector } from 'react-redux';
import { getChallenges } from './reducer';

type OwnProps = {};
type Props = OwnProps & NavigationComponentProps;

function goToSpeakScreen(componentId: string) {
  Navigation.push(componentId, {
    component: {
      name: SPEAK,
      options: {
        topBar: {
          title: {
            text: 'Speak',
          },
        },
      },
    },
  });
}

function goToEditScreen(componentId: string) {
  Navigation.push(componentId, {
    component: {
      name: SENTENCES,
      options: {
        topBar: {
          title: {
            text: 'Sentences',
          },
        },
      },
    },
  });
}

const ChallengesScreen: NavigationFunctionComponent<Props> = ({ componentId }: Props) => {
  const dispatch = useDispatch();

  const challenges = useSelector(state => state.challenges.challenges);

  const onPress = useCallback(() => {
    goToSpeakScreen(componentId);
  }, [componentId]);

  const onEditPress = useCallback(() => {
    goToEditScreen(componentId);
  }, [componentId]);

  useEffect(() => {
    dispatch(getChallenges());
  }, [dispatch]);

  return (
    <View style={styles.root}>
      <Text>
        Challenges Screen
      </Text>
      {challenges.map(x => {
        return (
          <Text key={x.key}>
            {x.name}
          </Text>
        );
      })}

      <Button
        title="Go to Speak"
        color="#710ce3"
        onPress={onPress}
      />

      <View style={styles.editButtonWrapper}>
        <Button
          title="Go to Edit"
          color="orange"
          onPress={onEditPress}
        />
      </View>
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
  editButtonWrapper: {
    marginTop: 10,
  }
});

export default ChallengesScreen;

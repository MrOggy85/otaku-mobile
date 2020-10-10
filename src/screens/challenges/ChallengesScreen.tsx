import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { SPEAK } from '../../core/navigation/screens';

type OwnProps = {};
type Props = OwnProps & NavigationComponentProps;

const ChallengesScreen: NavigationFunctionComponent<Props> = ({ componentId }: Props) => {
  const onPress = useCallback(() => Navigation.push(componentId, {
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
  }), [componentId]);

  return (
    <View style={styles.root}>
      <Text>
        Challenges Screen
      </Text>
      <Button
        title="Go to Speak"
        color="#710ce3"
        onPress={onPress}
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

export default ChallengesScreen;

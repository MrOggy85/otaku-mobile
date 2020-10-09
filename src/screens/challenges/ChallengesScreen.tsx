import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';

type OwnProps = {};
type Props = OwnProps & NavigationComponentProps;

const ChallengesScreen: NavigationFunctionComponent<Props> = () => {
  return (
    <View style={styles.root}>
      <Text>
        Challenges Screen
      </Text>
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

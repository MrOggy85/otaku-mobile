import React, { useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation, NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { CHALLENGES_LIST } from '../../core/navigation/screens';

type OwnProps = {};
type Props = OwnProps & NavigationComponentProps;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});

const HomeScreen: NavigationFunctionComponent<Props> = ({ componentId }: Props) => {

  const onPress = useCallback(() => Navigation.push(componentId, {
    component: {
      name: CHALLENGES_LIST,
      options: {
        topBar: {
          title: {
            text: 'Challenges',
          },
        },
      },
    },
  }), [componentId]);

  return (
    <View style={styles.root}>
      <Text>
        Home Screen
      </Text>
      <Button
        title="Go to Challenges"
        color="#710ce3"
        onPress={onPress}
      />
    </View>
  );
};

export default HomeScreen;

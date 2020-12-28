import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import goToScreen from '../../core/navigation/goToScreen';
import Button from '../../components/Button';

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

type Screen = Parameters<typeof goToScreen>[0]['screenName']

function goTo(screenName: Screen, titleText: string, componentId: Props['componentId']) {
  goToScreen({
    screenName,
    titleText,
    componentId,
  });
}

const AdminScreen: NavigationFunctionComponent<Props> = ({ componentId }: Props) => {
  return (
    <View style={styles.root}>
      <Button
        text="Challenges"
        onPress={() => goTo('CHALLENGES_LIST', 'Challenges', componentId)}
      />
      <Button
        text="Sentences"
        onPress={() => goTo('SENTENCES', 'Sentences', componentId)}
      />
      <Button
        text="Tags"
        onPress={() => goTo('TAGS_LIST', 'Tags', componentId)}
      />
    </View>
  );
};

export default AdminScreen;

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
  buttonWrapper: {
    width: '100%',
    marginBottom: 5,
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
      <View style={styles.buttonWrapper}>
        <Button
          text="Challenges"
          onPress={() => goTo('CHALLENGES_LIST', 'Challenges', componentId)}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          text="Sentences"
          onPress={() => goTo('SENTENCES_LIST', 'Sentences', componentId)}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          text="Tags"
          onPress={() => goTo('TAGS_LIST', 'Tags', componentId)}
        />
      </View>
    </View>
  );
};

export default AdminScreen;

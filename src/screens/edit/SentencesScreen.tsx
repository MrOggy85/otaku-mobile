import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { getSentences } from './reducer';
import { EDIT } from '../../core/navigation/screens';

type OwnProps = {};
type Props = OwnProps & NavigationComponentProps;

function goToEditScreen(componentId: string, id: string) {
const titleText = id
  ? `Edit ${id}`
  : 'New Sentence';

  Navigation.push(componentId, {
    component: {
      name: EDIT,
      options: {
        topBar: {
          title: {
            text: titleText,
          },
        },
      },
      passProps: {
        id,
      },
    },
  });
}

const SentencesScreen: NavigationFunctionComponent<Props> = ({ componentId }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSentences());
  },[dispatch]);

  const onRefresh = useCallback(() => {
    dispatch(getSentences());
  },[dispatch]);

  const sentences = useSelector(state => state.edit.sentences);

  return (
    <View style={styles.root}>
      <View style={styles.newButtonWrapper}>
        <Button
          title="New"
          // eslint-disable-next-line react/jsx-no-bind
          onPress={() => {
            goToEditScreen(componentId, '');
          }}
        />
      </View>
      <View style={styles.newButtonWrapper}>
        <Button
          title="Refresh"
          onPress={onRefresh}
        />
      </View>
      {sentences.map((x) => {
        return (
          <View
            key={x.id}
            style={styles.checkboxWrapper}
          >
            <Button
              title="Edit"
              // eslint-disable-next-line react/jsx-no-bind
              onPress={() => {
                goToEditScreen(componentId, x.id);
              }}
            />
            <Button
              title="Del"
              // eslint-disable-next-line react/jsx-no-bind
              onPress={() => {
                goToEditScreen(componentId, x.id);
              }}
            />
            <Text
              style={styles.checkboxText}
              numberOfLines={1}
            >
              {x.en}
            </Text>
          </View>
        );
      })}
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
  checkboxWrapper: {
    width: '80%',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  checkboxText: {
    marginTop: 5,
    marginLeft: '5%',
    width: '75%',
  },
  newButtonWrapper: {
    width: '80%',
    marginBottom: 10,
  },
});

export default SentencesScreen;

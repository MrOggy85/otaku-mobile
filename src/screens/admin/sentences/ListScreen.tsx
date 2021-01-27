import React, { useEffect, ComponentProps } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getSentences } from './reducer';
import Button from '../../../components/Button/Button';
import goToScreen from '../../../core/navigation/goToScreen';
import DetailsScreen from './DetailsScreen';

type OwnProps = {};
type Props = OwnProps & NavigationComponentProps;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  topButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#999',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  activityIndicator: {
    margin: 5,
  },
});

type DetailsScreenProps = Omit<ComponentProps<typeof DetailsScreen>, 'componentId'>

function goToEditScreen(componentId: string, id?: string): void {
  goToScreen<DetailsScreenProps>({
    screenName: 'SENTENCES_DETAILS',
    titleText: id ? 'Edit Sentence' : 'New Sentence',
    componentId,
    passProps: {
      id: id || '',
    }});
}

const ListScreen: NavigationFunctionComponent<Props> = ({ componentId }: Props) => {
  const dispatch = useDispatch();
  const sentences = useSelector(state => state.sentences.sentences);
  const loading = useSelector(state => state.sentences.loading);

  useEffect(() => {
    if (sentences.length === 0) {
      dispatch(getSentences());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.topButtonWrapper}>
        <Button
          text="NEW"
          onPress={() => {
            goToEditScreen(componentId);
          }}
        />
        <Button
          text="REFRESH"
          onPress={() => {
            dispatch(getSentences());
          }}
          loading={loading}
          color="SUCCESS"
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading && (
          <ActivityIndicator
            color="#888"
            size={24}
            style={styles.activityIndicator}
          />
        )}
        {sentences.map(x => {
          return (
            <Button
              key={x.id}
              text={x.en}
              onPress={() => {
                goToEditScreen(componentId, x.id);
              }}
              color="WHITE"
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ListScreen;

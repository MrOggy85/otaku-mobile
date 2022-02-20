import React, { useEffect, ComponentProps } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getChallenges } from './reducer';
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

type DetailsScreenProps = Omit<ComponentProps<typeof DetailsScreen>, 'componentId'>;

function goToEditScreen(componentId: string, id?: string): void {
  goToScreen<DetailsScreenProps>({
    screenName: 'CHALLENGES_DETAILS',
    titleText: id ? 'Edit Challenge' : 'New Challenge',
    componentId,
    passProps: {
      id: id || '',
    }
  });
}

const ListScreen: NavigationFunctionComponent<Props> = ({ componentId }: Props) => {
  const dispatch = useDispatch();
  const challenges = useSelector(state => state.challenges.challenges);
  const loading = useSelector(state => state.challenges.loading);

  useEffect(() => {
    if (challenges.length === 0) {
      dispatch(getChallenges());
    }
  }, [dispatch, challenges]);

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
            dispatch(getChallenges());
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
        {challenges.map(x => {
          return (
            <Button
              key={x.id}
              text={x.name}
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

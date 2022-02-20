import React, { useEffect, ComponentProps } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from './reducer';
import Button from '../../../components/Button/Button';
import goToScreen from '../../../core/navigation/goToScreen';
import DetailsScreen from './DetailsScreen';

type DetailsScreenProps = Omit<ComponentProps<typeof DetailsScreen>, 'componentId'>;

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

function goToEditScreen(componentId: string, id?: string): void {
  goToScreen<DetailsScreenProps>({
    screenName: 'TAGS_DETAILS',
    titleText: id ? 'Edit Tag' : 'New Tag',
    componentId,
    passProps: {
      id: id || '',
    }});
}

const ListScreen: NavigationFunctionComponent<Props> = ({ componentId }: Props) => {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags.tags);
  const loading = useSelector(state => state.tags.loading);

  useEffect(() => {
    if (tags.length === 0) {
      dispatch(getTags());
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
            dispatch(getTags());
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
        {tags.map(x => {
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

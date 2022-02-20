import React, { useEffect, useState, ComponentProps } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateChallenge, addChallenge, removeChallenge } from './reducer';
import { getTags } from '../tags/reducer';
import Input from '../../../components/Input';
import TagPicker from '../../../components/TagPicker';
import Button from '../../../components/Button/Button';

type OwnProps = {
  id: string;
};
type Props = OwnProps & NavigationComponentProps;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    padding: '5%',
    paddingTop: 10,
  },
  inputWrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: '100%',
  },
  tagPickerWrapper: {
    width: '100%',
  },
});

type ButtonDisabled = ComponentProps<typeof Pressable>['disabled']

type SendButtonProps = {
  disabled: ButtonDisabled;
  isUpdate: boolean;
  onPress: () => void;
}

const SendButton = ({ disabled, isUpdate, onPress }: SendButtonProps) => {
  return (
    <Button
      text={isUpdate ? 'UPDATE' : 'CREATE'}
      onPress={onPress}
      disabled={disabled}
      color="INFO"
    />
  );
};

type DeleteButtonProps = {
  disabled: ButtonDisabled;
  onPress: () => void;
}

const DeleteButton = ({ disabled, onPress }: DeleteButtonProps) => (
  <Button
    text="DELETE"
    onPress={onPress}
    disabled={disabled}
    color="WARN"
  />
);

const DetailsScreen: NavigationFunctionComponent<Props> = ({ componentId, id }: Props) => {
  const dispatch = useDispatch();
  const challenge = useSelector(state => state.challenges.challenges.find(x => x.id === id));
  const loading = useSelector(state => state.challenges.loading);
  const allTags = useSelector(state => state.tags.tags);
  const [name, setName] = useState(challenge?.name || '');
  const [tags, setTags] = useState(challenge?.tags || []);

  const sendDisabled = !name || loading;

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const tagChoices = allTags.filter(x => !tags.some(t => t.id === x.id));

  const onPress = () => {
    if (!challenge) {
      dispatch(addChallenge({
        name,
        tagIds: tags.map(t => t.id),
      }));
    } else {
      dispatch(updateChallenge({
        id: challenge.id,
        name,
        tagIds: tags.map(t => t.id),
      }));
    }

    Navigation.pop(componentId);
  };

  const onDeletePress = () => {
    if (!challenge) {
      return;
    }
    dispatch(removeChallenge(challenge?.id));
    Navigation.pop(componentId);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.root}>
        {challenge && (
          <View style={styles.inputWrapper}>
            <Text selectable>
              {`ID: ${challenge.id}`}
            </Text>
          </View>
        )}
        <View style={styles.inputWrapper}>
          <Input
            label="Name"
            text={name}
            setText={setName}
          />
        </View>
        <View style={styles.tagPickerWrapper}>
          <TagPicker
            tags={tags}
            setTags={setTags}
            tagChoices={tagChoices}
          />
        </View>

      </View>
      <View style={styles.buttonWrapper}>
        {challenge?.id && (
          <DeleteButton
            disabled={loading}
            onPress={onDeletePress}
          />
        )}
        <SendButton
          disabled={sendDisabled}
          isUpdate={!!challenge}
          onPress={onPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;

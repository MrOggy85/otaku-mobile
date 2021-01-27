import React, { useEffect, useState, ComponentProps } from 'react';
import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle, PressableStateCallbackType } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateChallenge, addChallenge, removeChallenge } from './reducer';
import { getTags } from '../tags/reducer';
import Input from '../../../components/Input';
import TagPicker from '../../../components/TagPicker';

type OwnProps = {
  id: string;
};
type Props = OwnProps & NavigationComponentProps;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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

const pressStyle = (disabled: ButtonDisabled, backgroundColor?: ViewStyle['backgroundColor']) => ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => ({
  width: '90%',
  height: 50,
  backgroundColor: disabled ? '#DDD' : pressed ? '#EEE' : backgroundColor || 'skyblue',
  margin: 5,
  alignItems: 'center',
  justifyContent: 'center',
});

type SendButtonProps = {
  disabled: ButtonDisabled;
  isUpdate: boolean;
  onPress: () => void;
}

const COLOR_DISABLED = '#AAA';
const COLOR_ENABLED = '#000';

const SendButton = ({ disabled, isUpdate, onPress }: SendButtonProps) => {
  return (
    <Pressable
      style={pressStyle(disabled)}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={{ color: disabled ? COLOR_DISABLED : COLOR_ENABLED }}>
        {isUpdate ? 'UPDATE' : 'CREATE'}
      </Text>
    </Pressable>
  );
};

type DeleteButtonProps = {
  disabled: ButtonDisabled;
  onPress: () => void;
}

const DeleteButton = ({ disabled, onPress }: DeleteButtonProps) => (
  <Pressable
    style={pressStyle(disabled, 'red')}
    onPress={onPress}
  >
    <Text>
      DELETE
    </Text>
  </Pressable>
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
    </View>
  );
};

export default DetailsScreen;

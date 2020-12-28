/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, ComponentProps } from 'react';
import { View, Text, StyleSheet, Button, Pressable, TextInput, StyleProp, ViewStyle, PressableStateCallbackType } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../core/redux/store';
import { updateChallenge, addChallenge, removeChallenge } from './reducer';
import { getTags } from '../tags/reducer';

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
  textInput: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 5,
  },
  tagsWrapper: {
    height: 200,
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  tagWrapper: {
    height: 50,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
  },
  tagText: {
    maxWidth: 100,
  },
  tagRemove: {
    padding: 5,
    marginLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '100%',
  },
  picker: {
    flex: 1,
    height: 50,
  },
});

type Tag = RootState['challenges']['challenges'][0]['tags'][0]

type TagProps = {
  tagChoices: Tag[];
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const Tags = ({ tagChoices, tags, setTags }: TagProps) => {
  const [selectedTag, setSelectedTag] = useState('');

  return (
    <View style={{ width: '100%' }}>
      <Text style={{ marginTop: 20 }}>
        Tags
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Picker
          selectedValue={selectedTag}
          style={styles.picker}
          onValueChange={itemValue => {
            setSelectedTag(itemValue as string);
          }}
        >
          <Picker.Item
            label=""
            value=""
          />
          {tagChoices.map(x => (
            <Picker.Item
              key={x.id}
              label={x.name}
              value={x.id}
            />
          ))}
        </Picker>
        <View style={{ width: 120 }}>
          <Button
            disabled={!selectedTag}
            onPress={() => {
              if (!selectedTag) {
                return;
              }
              const newTag = tagChoices.find(x => x.id === selectedTag);
              if (!newTag) {
                return;
              }
              const newTags = [
                ...tags,
                newTag,
              ];
              setTags(newTags);
              setSelectedTag('');
            }}
            title="Add"
          />
        </View>

      </View>
      <View style={styles.tagsWrapper}>
        {tags.map(x => (
          <View
            key={x.id}
            style={styles.tagWrapper}
          >
            <Text
              numberOfLines={1}
              style={styles.tagText}
            >
              {x.name}
            </Text>
            <Pressable
              style={styles.tagRemove}
              onPress={() => {
                const newTags = tags.filter(y => y.id !== x.id);
                setTags(newTags);
              }}
            >
              <Text style={{ }}>
                X
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

type Hej = {
  pressed: PressableStateCallbackType['pressed'];
}

type ButtonDisabled = ComponentProps<typeof Pressable>['disabled']

const pressStyle = (disabled: ButtonDisabled, backgroundColor?: ViewStyle['backgroundColor']) => ({ pressed }: Hej): StyleProp<ViewStyle> => ({
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
        <Text>
          Name
        </Text>
        <TextInput
          value={name}
          style={styles.textInput}
          onChangeText={(text) => {
            setName(text);
          }}
        />
      </View>
      <Tags
        tags={tags}
        setTags={setTags}
        tagChoices={tagChoices}
      />
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

import React, { useCallback, useEffect, useState, ComponentProps } from 'react';
import { View, Text, StyleSheet, Button, Pressable, TextInput, StyleProp, ViewStyle, PressableStateCallbackType } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { SPEAK, SENTENCES } from '../../../core/navigation/screens';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../core/redux/store';

type OwnProps = {
  id: number;
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
    // alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 5,
  },
  tagsWrapper: {
    // flex: 1,
    height: 200,
    width: '90%',
    // backgroundColor: 'orange',
    flexDirection: 'row',
    // alignContent: 'flex-start',
    // justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  tagWrapper: {
    // flex: 1,
    height: 50,
    // width: 150,
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
  buttonDelete: {
    backgroundColor: 'red',
  },
});

type Tag = RootState['challenges']['challenges'][0]['tags'][0]

type TagProps = {
  tagChoices: Tag[];
  // selectedTag: Tag['id'];
  // setSelectedTag: React.Dispatch<React.SetStateAction<Tag['id']>>;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const Tags = ({ tagChoices, tags, setTags }: TagProps) => {
  const [selectedTag, setSelectedTag] = useState('');
  const addDisabled = !selectedTag;

  return (
    <View style={{ width: '100%' }}>
      <Text style={{ marginTop: 20 }}>Tags</Text>
      <View style={{ flexDirection: 'row' }}>
        <Picker
          selectedValue={selectedTag}
          style={{ height: 50, flex: 1}}
          onValueChange={(itemValue, itemIndex) => {
            // this.setState({language: itemValue})
            setSelectedTag(itemValue);
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
            <Text numberOfLines={1} style={styles.tagText}>
              {x.name}
            </Text>
            <Pressable
              style={styles.tagRemove}

              onPress={() => {
                const newTags = tags.filter(y => y.id !== x.id);
                // const newTags = [
                //   ...tags,
                //   newTag!,
                // ];
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
  isUpdating: boolean;
}

const SendButton = ({ disabled, isUpdating }: SendButtonProps) => (
  <Pressable
    style={pressStyle(disabled)}
    disabled={disabled}
    onPress={(): void => {
      // goToEditScreen(componentId);
    }}
  >
    <Text style={{ color: disabled ? '#AAA' : '#000' }}>
      {isUpdating ? 'UPDATE' : 'CREATE'}
    </Text>
  </Pressable>
);

const DeleteButton = () => (
  <Pressable
    style={pressStyle(false, 'red')}
    onPress={(): void => {
      // goToEditScreen(componentId);
    }}
  >
    <Text>
      DELETE
    </Text>
  </Pressable>
);

const DetailsScreen: NavigationFunctionComponent<Props> = ({ componentId, id }: Props) => {
  const challenge = useSelector(state => state.challenges.challenges.find(x => x.id === id));
  const [name, setName] = useState(challenge?.name || '')
  const [tags, setTags] = useState(challenge?.tags || [])

  const sendDisabled = !name;

  // const [tags, setTags] = useState([
  //   {
  //     label: 'tag1 with a long name',
  //     id: 'tag1',
  //   },
  //   {
  //     label: 'tag2',
  //     id: 'tag2',
  //   },
  //   {
  //     label: 'tag3 55 ffknfkn',
  //     id: 'tag3',
  //   }]);

  // const tags = ['tag1 with a long name', 'tag2', 'tag3 55 ffknfkn'];
  const tagChoices = [
    {
      name: 'tag1337',
      id: 'tag1337',
    },
    {
      name: 'tag with a very long title',
      id: 'tag144',
    },
    {
      name: 'tag banana',
      id: 'tag345',
    },
  ].filter(x => !tags.some(t => t.id === x.id))

  return (
    <View style={styles.root}>
      {challenge?.id && (
        <View style={styles.inputWrapper}>
          <Text selectable>
            {`ID: ${challenge?.id}`}
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
          <DeleteButton />
        )}
        <SendButton
          disabled={sendDisabled}
          isUpdating={!!challenge?.id}
        />
      </View>
    </View>
  );
};

export default DetailsScreen;

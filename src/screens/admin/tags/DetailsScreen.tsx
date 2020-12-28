import React, { useState, ComponentProps } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, StyleProp, ViewStyle, PressableStateCallbackType } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateTag, addTag, removeTag } from './reducer';

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
  buttonWrapper: {
    width: '100%',
  },
});

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
  const tag = useSelector(state => state.tags.tags.find(x => x.id === id));
  const loading = useSelector(state => state.tags.loading);
  const [name, setName] = useState(tag?.name || '');

  const sendDisabled = !name || loading;

  const onPress = () => {
    if (!tag) {
      dispatch(addTag({
        name,
      }));
    } else {
      dispatch(updateTag({
        id: tag.id,
        name,
      }));
    }

    Navigation.pop(componentId);
  };

  const onDeletePress = () => {
    if (!tag) {
      return;
    }
    dispatch(removeTag(tag?.id));
    Navigation.pop(componentId);
  };

  return (
    <View style={styles.root}>
      {tag && tag.id && (
        <View style={styles.inputWrapper}>
          <Text selectable>
            {`ID: ${tag.id}`}
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
      <View style={styles.buttonWrapper}>
        {tag && (
          <DeleteButton
            disabled={loading}
            onPress={onDeletePress}
          />
        )}
        <SendButton
          disabled={sendDisabled}
          isUpdate={!!tag}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default DetailsScreen;

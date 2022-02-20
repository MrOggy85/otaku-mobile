import React, { useState, ComponentProps } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateTag, addTag, removeTag } from './reducer';
import Input from '../../../components/Input';
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
    <SafeAreaView style={styles.wrapper} >
      <View style={styles.root}>
        {tag && tag.id && (
        <View style={styles.inputWrapper}>
          <Text selectable>
            {`ID: ${tag.id}`}
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
    </SafeAreaView>
  );
};

export default DetailsScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateSentence, addSentence, removeSentence } from './reducer';
import { getTags } from '../tags/reducer';
import Input from '../../../components/Input';
import TagPicker from '../../../components/TagPicker';
import Button from '../../../components/Button';

type OwnProps = {
  id: string;
};
type Props = OwnProps & NavigationComponentProps;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  idWrapper: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
    backgroundColor: '#DDD',
  },
  idText: {
    color: '#777',
  },
  inputWrapper: {
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  japaneseLabelWrapper: {
    marginTop: 5,
    paddingLeft: 15,
    width: '100%',
    margin: 0,
  },
  japaneseLabelText: {
    fontWeight: 'bold',
  },
  japaneseInputWrapper: {
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    flexDirection: 'row',
  },
  japaneseTextInput: {
    flex: 4,
    borderColor: '#222',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 15,
  },
  jButtonWrapper: {
    flex: 1,
  },
  addButtonWrapper: {
    padding: 15,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  buttonWrapper: {
    width: '100%',
  },
  tagPickerWrapper: {
    padding: 15,
    width: '100%',
  },
});

const DetailsScreen: NavigationFunctionComponent<Props> = ({ componentId, id }: Props) => {
  const dispatch = useDispatch();
  const sentence = useSelector(state => state.sentences.sentences.find(x => x.id === id));
  const loading = useSelector(state => state.sentences.loading);
  const allTags = useSelector(state => state.tags.tags);
  const [en, setEn] = useState(sentence?.en || '');
  const [ja, setJa] = useState(sentence?.ja || []);
  console.log('ja', ja);
  const [tags, setTags] = useState(sentence?.tags || []);

  const sendDisabled = !en || loading;

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const tagChoices = allTags.filter(x => !tags.some(t => t.id === x.id));

  const onPress = () => {
    if (!sentence) {
      dispatch(addSentence({
        en,
        ja,
        tagIds: tags.map(t => t.id),
      }));
    } else {
      dispatch(updateSentence({
        id: sentence.id,
        en,
        ja,
        tagIds: tags.map(t => t.id),
      }));
    }

    Navigation.pop(componentId);
  };

  const onDeletePress = () => {
    if (!sentence) {
      return;
    }
    dispatch(removeSentence(sentence?.id));
    Navigation.pop(componentId);
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        {sentence && (
          <View style={styles.idWrapper}>
            <Text
              style={styles.idText}
              selectable
            >
              {`ID: ${sentence.id}`}
            </Text>
          </View>
        )}
        <View style={styles.inputWrapper}>
          <Input
            label="English"
            text={en}
            setText={setEn}
          />
        </View>
        <View style={styles.japaneseLabelWrapper}>
          <Text style={styles.japaneseLabelText}>
            Japanese
          </Text>
        </View>
        {ja.map((x, i) => (
          <View
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={styles.japaneseInputWrapper}
          >
            <TextInput
              value={x}
              style={styles.japaneseTextInput}
              onChangeText={(changedText) => {
                const copy = [
                  ...ja,
                ];
                copy.splice(i, 1, changedText);
                setJa(copy);
              }}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.jButtonWrapper}>
              <Button
                text="DEL"
                color="WARN"
                onPress={() => {
                  const copy = [
                    ...ja,
                  ];
                  copy.splice(i, 1);
                  setJa(copy);
                }}
              />
            </View>
            <View style={styles.jButtonWrapper}>
              <Button
                text="SPK"
                color="SUCCESS"
                onPress={() => {}}
              />
            </View>
          </View>

        ))}
        <View style={styles.addButtonWrapper}>
          <Button
            text="Add Japanese Sentence"
            disabled={ja[ja.length - 1] === ''}
            onPress={() => {
              setJa([
                ...ja,
                '',
              ]);
            }}
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
          {sentence?.id && (
            <Button
              text="DELETE"
              onPress={onDeletePress}
              disabled={loading}
              color="WARN"
            />
          )}
          <Button
            text={sentence ? 'UPDATE' : 'CREATE'}
            onPress={onPress}
            disabled={sendDisabled}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

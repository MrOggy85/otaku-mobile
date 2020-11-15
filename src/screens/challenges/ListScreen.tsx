import React, { useCallback, useEffect, ComponentProps } from 'react';
import { View, Text, StyleSheet, Button, Pressable, ScrollView, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { SPEAK, SENTENCES, CHALLENGES_DETAILS } from '../../core/navigation/screens';
import { useDispatch, useSelector } from 'react-redux';
import { getChallenges } from './reducer';

type OwnProps = {};
type Props = OwnProps & NavigationComponentProps;

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: 'whitesmoke',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  editButtonWrapper: {
    marginTop: 10,
  },
});

// function goToSpeakScreen(componentId: string): void {
//   Navigation.push(componentId, {
//     component: {
//       name: SPEAK,
//       options: {
//         topBar: {
//           title: {
//             text: 'Speak',
//           },
//         },
//       },
//     },
//   });
// }

function goToEditScreen(componentId: string, id?: number): void {
  Navigation.push(componentId, {
    component: {
      name: CHALLENGES_DETAILS,
      options: {
        topBar: {
          title: {
            text: id ? 'Edit Challenge' : 'New Challenge',
          },
        },
      },
      passProps: {
        id,
      },
    },
  });
}

type Hej = {
  pressed: PressableStateCallbackType['pressed']
}

const ListScreen: NavigationFunctionComponent<Props> = ({ componentId }: Props) => {
  const dispatch = useDispatch();

  const challenges = useSelector(state => state.challenges.challenges);

  // const onPress = useCallback(() => {
  //   goToSpeakScreen(componentId);
  // }, [componentId]);

  // const onEditPress = useCallback(() => {
  //   goToEditScreen(componentId);
  // }, [componentId]);

  useEffect(() => {
    dispatch(getChallenges());
  }, [dispatch]);

  const pressStyle = ({ pressed }: Hej): StyleProp<ViewStyle> => ({
    width: '90%',
    height: 50,
    backgroundColor: pressed ? '#EEE' : 'white',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <View style={styles.root}>
      <View style={styles.scrollView}>
        <Pressable
          style={pressStyle}
          onPress={(): void => {
            goToEditScreen(componentId);
          }}
        >
          <Text>
            New
          </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {challenges.map(x => {
          return (
            <Pressable
              key={x.id}
              style={pressStyle}
              onPress={(): void => {
                goToEditScreen(componentId, x.id);
              }}
            >
              <Text>
                {x.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* <View style={styles.editButtonWrapper}>
        <Button
          title="Go to Edit"
          color="orange"
          onPress={onEditPress}
        />
      </View> */}
    </View>
  );
};

export default ListScreen;

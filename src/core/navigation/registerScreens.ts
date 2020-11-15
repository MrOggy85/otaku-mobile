import { Navigation } from 'react-native-navigation';
import { HOME, CHALLENGES_LIST, SPEAK, EDIT, SENTENCES, CHALLENGES_DETAILS } from './screens';
import WithRedux from './WithRedux';
import HomeScreen from '../../screens/home/HomeScreen';
import ChallengesListScreen from '../../screens/challenges/ListScreen';
import ChallengesDetailsScreen from '../../screens/challenges/DetailsScreen';
import SpeakScreen from '../../screens/speak/SpeakScreen';
import EditScreen from '../../screens/edit/EditScreen';
import SentencesScreen from '../../screens/edit/SentencesScreen';

Navigation.registerComponent(HOME, () => HomeScreen);
Navigation.registerComponent(CHALLENGES_LIST, () => WithRedux(ChallengesListScreen));
Navigation.registerComponent(CHALLENGES_DETAILS, () => WithRedux(ChallengesDetailsScreen));
Navigation.registerComponent(SPEAK, () => WithRedux(SpeakScreen));
Navigation.registerComponent(EDIT, () => WithRedux(EditScreen));
Navigation.registerComponent(SENTENCES, () => WithRedux(SentencesScreen));

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: HOME,
             },
           },
         ],
       },
     },
  });
});

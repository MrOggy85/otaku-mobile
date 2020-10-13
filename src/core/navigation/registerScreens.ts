import { Navigation } from 'react-native-navigation';
import { HOME, CHALLENGES, SPEAK, EDIT, SENTENCES } from './screens';
import WithRedux from './WithRedux';
import HomeScreen from '../../screens/home/HomeScreen';
import ChallengesScreen from '../../screens/challenges/ChallengesScreen';
import SpeakScreen from '../../screens/speak/SpeakScreen';
import EditScreen from '../../screens/edit/EditScreen';
import SentencesScreen from '../../screens/edit/SentencesScreen';

Navigation.registerComponent(HOME, () => HomeScreen);
Navigation.registerComponent(CHALLENGES, () => WithRedux(ChallengesScreen));
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

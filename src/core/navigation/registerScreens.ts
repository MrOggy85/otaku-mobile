import { Navigation } from 'react-native-navigation';
import { HOME, CHALLENGES, SPEAK } from './screens';
import WithRedux from './WithRedux';
import HomeScreen from '../../screens/home/HomeScreen';
import ChallengesScreen from '../../screens/challenges/ChallengesScreen';
import SpeakScreen from '../../screens/speak/SpeakScreen';

const h = WithRedux(SpeakScreen);

type hej = typeof HomeScreen;
type tja = typeof h;

Navigation.registerComponent(HOME, () => HomeScreen);
Navigation.registerComponent(CHALLENGES, () => ChallengesScreen);
Navigation.registerComponent(SPEAK, () => WithRedux(SpeakScreen));

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

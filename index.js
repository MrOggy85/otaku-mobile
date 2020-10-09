import { Navigation } from 'react-native-navigation';
import HomeScreen from './src/screens/home/HomeScreen';
import ChallengesScreen from './src/screens/challenges/ChallengesScreen';
import SpeakScreen from './src/screens/speak/SpeakScreen';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => HomeScreen);
Navigation.registerComponent('Challenges', () => ChallengesScreen);
Navigation.registerComponent('Speak', () => SpeakScreen);

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'com.myApp.WelcomeScreen',
             },
           },
         ],
       },
     },
  });
});

import { Navigation } from 'react-native-navigation';
import HomeScreen from './src/screens/home/HomeScreen';
import ChallengesScreen from './src/screens/challenges/ChallengesScreen';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => HomeScreen);
Navigation.registerComponent('Challenges', () => ChallengesScreen);
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

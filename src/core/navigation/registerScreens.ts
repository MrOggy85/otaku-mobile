import { Navigation } from 'react-native-navigation';
import { HOME, CHALLENGES_LIST, SPEAK, EDIT, SENTENCES, CHALLENGES_DETAILS, ADMIN, TAGS_LIST, TAGS_DETAILS } from './screens';
import WithRedux from './WithRedux';
import HomeScreen from '../../screens/home/HomeScreen';
import ChallengesListScreen from '../../screens/admin/challenges/ListScreen';
import ChallengesDetailsScreen from '../../screens/admin/challenges/DetailsScreen';
import TagsListScreen from '../../screens/admin/tags/ListScreen';
import TagsDetailsScreen from '../../screens/admin/tags/DetailsScreen';
import SpeakScreen from '../../screens/speak/SpeakScreen';
import EditScreen from '../../screens/edit/EditScreen';
import SentencesScreen from '../../screens/edit/SentencesScreen';
import AdminScreen from '../../screens/admin/AdminScreen';

Navigation.registerComponent(HOME, () => HomeScreen);
Navigation.registerComponent(CHALLENGES_LIST, () => WithRedux(ChallengesListScreen));
Navigation.registerComponent(CHALLENGES_DETAILS, () => WithRedux(ChallengesDetailsScreen));
Navigation.registerComponent(TAGS_LIST, () => WithRedux(TagsListScreen));
Navigation.registerComponent(TAGS_DETAILS, () => WithRedux(TagsDetailsScreen));
Navigation.registerComponent(SPEAK, () => WithRedux(SpeakScreen));
Navigation.registerComponent(EDIT, () => WithRedux(EditScreen));
Navigation.registerComponent(SENTENCES, () => WithRedux(SentencesScreen));
Navigation.registerComponent(ADMIN, () => WithRedux(AdminScreen));

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: ADMIN,
             },
           },
         ],
       },
     },
  });
});

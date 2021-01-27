import { Navigation } from 'react-native-navigation';
import { HOME, CHALLENGES_LIST, SPEAK, EDIT, CHALLENGES_DETAILS, ADMIN, TAGS_LIST, TAGS_DETAILS, SENTENCES_LIST, SENTENCES_DETAILS } from './screens';
import WithRedux from './WithRedux';
import HomeScreen from '../../screens/home/HomeScreen';
import ChallengesListScreen from '../../screens/admin/challenges/ListScreen';
import ChallengesDetailsScreen from '../../screens/admin/challenges/DetailsScreen';
import TagsListScreen from '../../screens/admin/tags/ListScreen';
import TagsDetailsScreen from '../../screens/admin/tags/DetailsScreen';
import SentencesListScreen from '../../screens/admin/sentences/ListScreen';
import SentencesDetailsScreen from '../../screens/admin/sentences/DetailsScreen';
import SpeakScreen from '../../screens/speak/SpeakScreen';
import EditScreen from '../../screens/edit/EditScreen';
import AdminScreen from '../../screens/admin/AdminScreen';

Navigation.registerComponent(HOME, () => HomeScreen);
Navigation.registerComponent(CHALLENGES_LIST, () => WithRedux(ChallengesListScreen));
Navigation.registerComponent(CHALLENGES_DETAILS, () => WithRedux(ChallengesDetailsScreen));
Navigation.registerComponent(TAGS_LIST, () => WithRedux(TagsListScreen));
Navigation.registerComponent(TAGS_DETAILS, () => WithRedux(TagsDetailsScreen));
Navigation.registerComponent(SENTENCES_LIST, () => WithRedux(SentencesListScreen));
Navigation.registerComponent(SENTENCES_DETAILS, () => WithRedux(SentencesDetailsScreen));
Navigation.registerComponent(SPEAK, () => WithRedux(SpeakScreen));
Navigation.registerComponent(EDIT, () => WithRedux(EditScreen));
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

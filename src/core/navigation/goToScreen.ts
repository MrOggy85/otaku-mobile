import { Navigation } from 'react-native-navigation';
import * as screens from './screens';

type Screen = keyof typeof screens

type Params = {
  screenName: Screen;
  titleText: string;
  componentId: string;
  passProps?: Record<string, any>;
}

function goToScreen({ screenName, titleText, componentId, passProps }: Params) {
  const name = screens[screenName];

  Navigation.push(componentId, {
    component: {
      name,
      options: {
        topBar: {
          title: {
            text: titleText,
          },
        },
      },
      passProps,
    },
  });
}

export default goToScreen;

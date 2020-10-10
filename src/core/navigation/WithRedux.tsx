import React from 'react';
import { Provider } from 'react-redux';
import { NavigationFunctionComponent, NavigationComponentProps } from 'react-native-navigation';
import store from '../redux/store';

function WithRedux(Component: NavigationFunctionComponent<NavigationComponentProps>) {
  return function inject(props: NavigationComponentProps) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

export default WithRedux;

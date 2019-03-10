import React from 'react';
import Navigator from './src/components/navigation';

import { Provider } from 'react-redux';
import store from './store'; //Import the store

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }
}
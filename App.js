import React from 'react';
import {Provider} from 'react-redux';
import Store from './src/redux/store';
import * as firebase from 'firebase';

import Main from './src/main';

import { firebaseConfig } from './src/utils/links';

firebase.initializeApp(firebaseConfig);

class App extends React.Component {

  render() {
      return (
          <Provider store={Store}>
            <Main/>
          </Provider>
      );
  }
}

export default App;
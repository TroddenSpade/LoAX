import React from 'react';
import {Provider} from 'react-redux';
import Store from './src/redux/store'

import Main from './src/main';

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
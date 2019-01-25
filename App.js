import React from 'react';
import {Provider} from 'react-redux';
import Store from './src/redux/store'
import { StyleSheet, Text, View } from 'react-native';

import reducer from './src/redux/reducer';
import Signup from './src/screens/singup';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Signup/>
      </View>

    );
  }
}

export default reduxApp = ()=>{
  return(
    <Provider store={Store(reducer)}>
      <App/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, {Component} from 'react';
import { StyleSheet, Text, View , Platform} from 'react-native';
import {
    Router,
    Scene
} from 'react-native-router-flux';

import Home from './Home';
import Chat from './Chat';

export default class App extends Component {
    render() {
    return (
        <Router>
            <Scene key='root' style={{paddingTop : Platform.OS === 'ios' ? 64:54}}>
                <Scene key='Home' component={Home} title='Home'/>
                <Scene key='Chat' component={Chat} title='Chat'/>
            </Scene>
        </Router>
    );
  }
}

const styles = StyleSheet.create({
  
});

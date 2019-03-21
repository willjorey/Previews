import React, { Component } from 'react';
import { View, } from 'react-native';
import Home from '../components/Home';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{backgroundColor: '#000000', flex:1,}}>
        <Home/>
      </View>
    );
  }
}
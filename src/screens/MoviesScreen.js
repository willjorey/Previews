import React, { Component } from 'react';
import { View, } from 'react-native';
import Movies from '../components/Movies';

export default class MoviesScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{backgroundColor: '#000000', flex:1,}}>
        <Movies/>
      </View>
    );
  }
}
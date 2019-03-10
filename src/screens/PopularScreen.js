import React, { Component } from 'react';
import { View, } from 'react-native';
import PopularMovies from '../components/PopularMovies';

export default class PopularScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{flex:1, opacity: 0.8}}>
        <PopularMovies/>
      </View>
    );
  }
}
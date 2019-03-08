import React, { Component } from 'react';
import { View, } from 'react-native';
import PopularMovies from '../components/PopularMovies';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{backgroundColor: '#1E90FF', flex:1, opacity: 0.8}}>
        <PopularMovies/>
      </View>
    );
  }
}
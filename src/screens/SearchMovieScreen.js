import React, { Component } from 'react';
import { View, } from 'react-native';
import SearchMovie from '../components/SearchMovie';

export default class SearchMovieScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{ flex:1}}>
        <SearchMovie/>
      </View>
    );
  }
}
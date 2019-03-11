import React, { Component } from 'react';
import { View, } from 'react-native';
import Favourites from '../components/Favourites';

export default class FavouritesScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{ flex:1}}>
        <Favourites/>
      </View>
    );
  }
}
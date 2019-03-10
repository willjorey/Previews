import React, { Component } from 'react';
import { View, } from 'react-native';
import PopularTV from '../components/PopularTV';

export default class PopularTVScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{ flex:1, opacity: 0.8}}>
        <PopularTV/>
      </View>
    );
  }
}
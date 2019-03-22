import React, { Component } from 'react';
import { View, } from 'react-native';
import Tv from '../components/Tv';

export default class TvScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{backgroundColor: '#000000', flex:1,}}>
        <Tv/>
      </View>
    );
  }
}
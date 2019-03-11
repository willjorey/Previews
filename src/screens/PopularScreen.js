import React, { Component } from 'react';
import { View, } from 'react-native';
import PopularMovies from '../components/PopularMovies';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import Async from '../Async';
const async = new Async();

class PopularScreen extends Component {
  static navigationOptions = {
    header: null,
  };



  render() {
    return (
      <View style={{flex:1}}>
        <PopularMovies/>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
      profile:state.profileReducer.profile,
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/PopularMovies.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(PopularScreen);
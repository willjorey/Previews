import React from 'react';
import { StyleSheet, Text, View, FlatList, Image , ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions


class Favourites extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      movies: [],
      tv: [],
      refresh: true
    }
  }

  componentDidMount() {
    this.setState({
      movies: this.props.movies,
      tv: this.props.tv,
      refresh: !this.state.refresh
    });
    console.log(this.props)
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>My Movies</Text>
            <FlatList
              data={this.state.movies}
              keyExtractor={(item,index) => index.toString()}
              renderItem={({item}) => 
              <View style={styles.movieContainer}>
                  <Image style={{width: 125, height: 200}} source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}/>
                  <View style={{justifyContent: 'center', width: '75%', height: 175}}>
                    <Text style={{fontSize: 20, fontWeight:'bold', marginLeft: '20%'}}>{item.title}</Text>
                      <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row', marginLeft: '20%', marginTop: '5%'}}>
                        <Icon name='star' color='#FFD700' size={40}/>
                        <Text style={{fontSize: 30, marginLeft: '3%'}}>{item.vote_average}/10</Text>
                      </View>
                  </View>
              </View>
              }
            />
            <Text style={styles.title}>My TV Shows</Text>
            <FlatList
              data={this.state.tv}
              keyExtractor={(item,index) => index.toString()}
              renderItem={({item}) => 
              <View style={styles.movieContainer}>
                  <Image style={{width: 125, height: 200}} source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}/>
                  <View style={{justifyContent: 'center', width: '75%', height: 175}}>
                    <Text style={{fontSize: 20, fontWeight:'bold', marginLeft: '20%'}}>{item.original_name}</Text>
                      <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row', marginLeft: '20%', marginTop: '5%'}}>
                        <Icon name='star' color='#FFD700' size={40}/>
                        <Text style={{fontSize: 30, marginLeft: '3%'}}>{item.vote_average}/10</Text>
                      </View>
                  </View>
              </View>
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state, props) {
  return {
      movies:state.profileReducer.profile.movies,
      tv:state.profileReducer.profile.tv,

  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/PopularMovies.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Favourites);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title:{
    marginTop: '10%',
    marginBottom:'10%',
    textAlign:'center',
    padding: 10,
    fontSize: 30
  },
  movieContainer:{
    flex:1,
    flexDirection: 'row',
    width: '90%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,

  }
});

import React from 'react';
import { StyleSheet, Text, View, FlatList, Image , ScrollView} from 'react-native';
import {getPopularMovies, getUpcomingMovies, getNowPlayingMovies, getTopRatedMovies,} from '../api/fetch.js';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions

import Async from '../Async';
const async = new Async();

class Movies extends React.Component {
  constructor(props){
    super(props);
    this.state={
      popular:[],
      upcoming: [],
      now_playing: [],
      top_rated: [],
    }
  }

  async componentDidMount(){
    let now_playing = await getNowPlayingMovies();
    let upcoming = await getUpcomingMovies();
    let top_rated = await getTopRatedMovies();
    let popular = await getPopularMovies();

    this.setState({
        now_playing,
        upcoming,
        top_rated,
        popular,

    });
  };



  render() {
    return (
      <ScrollView >
        <View style={styles.container}>
            <View>
            <Text style={styles.title}>In Theaters</Text>
            <FlatList
                horizontal={true}
                data={this.state.now_playing}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item}) => 
                <View style={styles.movieContainer}>
                    <Image style={{width: 125, height: 200}} source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}/>
                </View>
                }
            />

            <Text style={styles.title}>Upcoming Movies</Text>
            <FlatList
                horizontal={true}
                data={this.state.upcoming}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item}) => 
                <View style={styles.movieContainer}>
                    <Image style={{width: 125, height: 200}} source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}/>
                </View>
                }
            />


            <Text style={styles.title}>Popular Movies</Text>
            <FlatList
                horizontal={true}
                data={this.state.popular}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item}) => 
                <View style={styles.movieContainer}>
                    <Image style={{width: 125, height: 200}} source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}/>
                </View>
                }
            />

            <Text style={styles.title}>Top Rated Movies</Text>
            <FlatList
                horizontal={true}
                data={this.state.top_rated}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item}) => 
                <View style={styles.movieContainer}>
                    <Image style={{width: 125, height: 200}} source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}/>
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
      profile:state.profileReducer.profile,
      movies: state.profileReducer.profile.movies,
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/PopularMovies.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Movies);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 200
  },
  title:{
    marginTop:'5%',
    marginBottom:'5%',
    textAlign:'center',
    padding: 10,
    fontSize: 30,
    color: 'gold'
  },
  movieContainer:{
    flex:1,
    width: '90%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    padding: 3

  }
});

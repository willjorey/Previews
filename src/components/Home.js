import React from 'react';
import { StyleSheet, Text, View, FlatList, Image , ScrollView} from 'react-native';
import {getPopularMovies, getPopularTV} from '../api/fetch.js';
import Icon from 'react-native-vector-icons/FontAwesome';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions

import Async from '../Async';
const async = new Async();

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      movies:[],
      tv: [],
    }
  }

  async componentDidMount(){
    // async.removeProfile('profile')

    let movies = await getPopularMovies();
    let tv = await getPopularTV();
    this.setState({
      movies: movies,
      tv: tv,
      search: '',
    });
    this.getProfile();
  };

  getProfile = async () =>{
    let profile = await async.getProfile('profile');
    if(profile){
      console.log('Profile Exists');
      this.props.setProfile({'profile': profile});

    }else{
      console.log('Profile Does Not Exist');
      let new_profile = {profile: {movies: [], tv: []}};
      async.storeProfile(new_profile);
      this.props.setProfile(new_profile);
    }
  }


  render() {
    return (
      <ScrollView >
        <View style={styles.container}>
            <View>
            <Text style={styles.title}>Popular Movies</Text>
            <FlatList
                horizontal={true}
                data={this.state.movies}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item}) => 
                <View style={styles.movieContainer}>
                    <Image style={{width: 125, height: 200}} source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}/>
                </View>
                }
            />

            <Text style={styles.title}>Popular TV Shows</Text>
            <FlatList
                horizontal={true}
                data={this.state.tv}
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);

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

import React from 'react';
import { StyleSheet, Text, View, FlatList, Image , TouchableOpacity, ToastAndroid, TextInput} from 'react-native';
import {searchMovies, getPopularMovies} from '../api/fetch.js';
import Icon from 'react-native-vector-icons/FontAwesome';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions

import Async from '../Async';
const async = new Async();

class PopularMovies extends React.Component {
  constructor(props){
    super(props);
    this.state={
      popular:[],
      search: '',
    }
  }

  async componentDidMount(){
    // async.removeProfile('profile')

    let movies = await getPopularMovies();
    this.setState({
      popular: movies,
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

  onPressMovie = (movie) =>{
    // Check if the movie is a favourite
    if (this.props.movies.some( prop => prop.title === movie.title)){
      ToastAndroid.showWithGravityAndOffset(
        'Movie Already a Favourite',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      // Add the movie to favourites and save
    }else{
      ToastAndroid.showWithGravityAndOffset(
        'Movie Added to Favourites',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      this.props.addFavMovie(movie);
      async.storeProfile(this.props.profile);
    }
  }


  onSearch = async ()=>{
    let search = this.state.search;
    let resp = await searchMovies(search);
    if (resp){
      this.setState({popular: resp})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
        <View style={{marginTop: 20}}>
            <TextInput
              onChangeText={(text) => this.setState({search:text})}
              placeholder="Type Here..."
            />
            <TouchableOpacity style={{width: '20%', marginTop: 10}} onPress={() => this.onSearch()}>
              <Text>Search</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Popular Movies</Text>
          <FlatList
            data={this.state.popular}
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
                  <TouchableOpacity style={{ marginLeft: '20%', marginTop: '5%'}} onPress={() => this.onPressMovie(item)}>
                    <Icon name='rocket' size={30} color="#900" />
                  </TouchableOpacity>
                </View>
            </View>
            }
          />
        </View>
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title:{
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

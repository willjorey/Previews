import React from 'react';
import { StyleSheet, Text, View, FlatList, Image , TouchableOpacity, ToastAndroid, TextInput} from 'react-native';
import {searchMovies} from '../api/fetch.js';
import Icon from 'react-native-vector-icons/FontAwesome';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions

import Async from '../Async';
const async = new Async();

class SearchMovie extends React.Component {
  constructor(props){
    super(props);
    this.state={
      movies:[],
      search:'',
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

  onPressSearch = async () => {
    let movies = await searchMovies(this.state.search);
    this.setState({movies})
    console.log(movies)
  }


  render() {
    return (
      <View style={styles.container}>
            <View style={{width: '100%', alignItems: 'center'}}>
                <TextInput
                    placeholder='Search Movie Here...'
                    onChangeText={(search) => this.setState({search})}
                    style={styles.searchBar}
                />
                <TouchableOpacity onPress={()=>this.onPressSearch()} style={{marginTop: 20}}>
                    <Text>Search</Text>
                </TouchableOpacity>

            </View>
        <View>
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
// Just by doing this, we will have access to the actions defined in out actions file (action/SearchMovie.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(SearchMovie);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title:{
    marginTop:'10%',
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
  },
  searchBar:{
    marginTop: '10%',
    width: '70%',
    borderWidth: 1,
    padding: 10,
  }
});

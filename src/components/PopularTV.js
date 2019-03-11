import React from 'react';
import { StyleSheet, Text, View, FlatList, Image , TouchableOpacity, ToastAndroid} from 'react-native';
import {getPopularTV} from '../api/fetch.js';
import Icon from 'react-native-vector-icons/FontAwesome';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import Async from '../Async';
const async = new Async();

class PopularTV extends React.Component {
  constructor(props){
    super(props);
    this.state={
      popular:[],
    }
  }

  async componentDidMount(){
    let tv = await getPopularTV();
    this.setState({
      popular: tv,
    });
  };

  onPressShow = (show) =>{
    if (this.props.tv.some( prop => prop.original_name === show.original_name)){
      ToastAndroid.showWithGravityAndOffset(
        'Show Already a Favourite',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      // Add the movie to favourites and save
    }else{
      ToastAndroid.showWithGravityAndOffset(
        'Show Added to Favourites',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      this.props.addFavShow(show);
      console.log(this.props.profile)
      async.storeProfile(this.props.profile);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Popular TV Shows</Text>
          <FlatList
            data={this.state.popular}
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
                  <TouchableOpacity style={{ marginLeft: '20%', marginTop: '5%'}} onPress={() => this.onPressShow(item)}>
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
      profile: state.profileReducer.profile,
      tv: state.profileReducer.profile.tv
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/PopularTV.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(PopularTV);

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

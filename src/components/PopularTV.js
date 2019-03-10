import React from 'react';
import { StyleSheet, Text, View, FlatList, Image , TouchableOpacity, ToastAndroid} from 'react-native';
import {getPopularTV} from '../api/fetch.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PopularTV extends React.Component {
  constructor(props){
    super(props);
    this.state={
      popular:[],
      favourite: [],
    }
  }

  async componentDidMount(){
    let tv = await getPopularTV();
    this.setState({
      popular: tv,
    });
  };

  onPressShow = (movie) =>{
    this.state.favourite.push(movie);
    ToastAndroid.showWithGravityAndOffset(
      'Show Added to Favourites',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
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
                <Image style={{width: 100, height: 175}} source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}/>
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
    height: 175,
    marginTop: 10,
    marginBottom: 10,

  }
});

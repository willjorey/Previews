import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import {searchMovies, getPopularMovies} from './src/api/fetch.js';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      popular:[],
    }
  }

  async componentDidMount(){
    let movies = await getPopularMovies();
    this.setState({
      popular: movies,
    });
    console.log(this.state.popular[0].poster_path)
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={{marginTop: '20%', textAlign:'center', padding: 10}}>Popular Movies</Text>
          <FlatList
            data={this.state.popular}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({item}) => 
            <View style={{flex:1, flexDirection: 'row', width: '90%', padding: 10}}>
              <Image style={{width: 100, height: 175}} source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}/>
              <View style={{justifyContent: 'center', width: '75%'}}>
                <Text style={{fontSize: 20, fontWeight:'bold', marginLeft: '25%'}}>{item.title}</Text>
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
});

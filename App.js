import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
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
    console.log(this.state.popular[0].title)
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={{marginTop: '20%'}}>Popular Movies</Text>
          <FlatList
            data={this.state.popular}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({item}) => <Text>{item.title}</Text>}
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

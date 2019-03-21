import React, { Component, } from 'react';
import { createStackNavigator, createAppContainer, DrawerItems, createDrawerNavigator,} from 'react-navigation';
import {SafeAreaView, View, ScrollView, TouchableOpacity, Text} from 'react-native';
import PopularScreen from '../screens/PopularScreen';
import PopularTVScreen from '../screens/PopularTVScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import SearchMovieScreen from '../screens/SearchMovieScreen';

import Async from '../Async';
const async = new Async();

const DrawerComponent = (props) => {
    return(
    <SafeAreaView style={{flex:1}}>
        <View style={{height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
        <TouchableOpacity onPress={() => async.removeProfile()}>
            <Text>Delete Profile</Text>
        </TouchableOpacity>
    </SafeAreaView>
    );
}

const drawer = new createDrawerNavigator({
    "Movies": {
        screen: PopularScreen,
    },
    "TV Shows": {
        screen: PopularTVScreen,
    },
    "Favourites": {
        screen: FavouritesScreen,
    },
    "Search Movie":{
        screen: SearchMovieScreen
    },
},{
    contentComponent: DrawerComponent
})

const Navigator = new createStackNavigator({
    Popular: {
        screen: drawer,
        navigationOptions:{
            header: null,
        },
    }
})

const App = createAppContainer(Navigator);

export default App
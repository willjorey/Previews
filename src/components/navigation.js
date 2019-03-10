import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, DrawerItems, createDrawerNavigator} from 'react-navigation';
import {SafeAreaView, View, ScrollView} from 'react-native';
import PopularScreen from '../screens/PopularScreen';
import PopularTVScreen from '../screens/PopularTVScreen';


const DrawerComponent = (props) => {
    return(
    <SafeAreaView style={{flex:1}}>
        <View style={{height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>   
    </SafeAreaView>
    );
}

const drawer = new createDrawerNavigator({
    "Popular Movies": {
        screen: PopularScreen,
    },
    "Popular TV Shows": {
        screen: PopularTVScreen,
    }
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
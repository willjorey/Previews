import React, { Component } from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation';

import PopularScreen from '../screens/PopularScreen';

const Navigator = new createStackNavigator({
    Title: {
        screen: PopularScreen,
        navigationOptions:{
            header: null,
        }
    }
})

const App = createAppContainer(Navigator);

export default App
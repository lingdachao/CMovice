import React from 'react';
import {
    Text, 
} from 'react-native';
import { createStackNavigator,createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './page/Home';
import Me from './page/Me';
import Detail from './page/Detail';
import List from './page/List';
import Advice from './page/Advice';
import Contact from './page/Contact'
import Search from './page/Search';

const navigationOptions = ({navigation}) => ({
    title:  navigation.state.routeName,
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
})

const HomeStack = createStackNavigator({
    Home: { screen: Home },
    List: {screen: List},
    Detail: { screen: Detail },
},{
    navigationOptions,
});

const MeStack = createStackNavigator({
    Me: { screen: Me },
    List: {screen: List},
    Detail: { screen: Detail },
    Advice: { screen: Advice },
    Contact: { screen: Contact },
},{
    navigationOptions,
});

const SearchStack = createStackNavigator({
    Search: { screen: Search },
    List: {screen: List},
    Detail: { screen: Detail },
},{
    navigationOptions,
});

export default createBottomTabNavigator(
    {
      Home: { screen: HomeStack },
      Search: { screen: SearchStack },
      Me: { screen: MeStack },
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = `ios-home`;
          } else if (routeName === 'Me') {
            iconName = `ios-person`;
          } else if ( routeName === 'Search') {
            iconName = `ios-search`;
          }
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        tabBarLabel: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let name;
            if (routeName === 'Home') {
                name = `首页`;
            } else if (routeName === 'Me') {
                name = `我的`;
            } else if (routeName === 'Search') {
                name = `搜索`;
            }
            return <Text style={{color: tintColor}}>{name}</Text>
        },
        tabBarVisible: navigation.state.index == 0,
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
);
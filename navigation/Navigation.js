import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Search from '../components/Search'
import Statistiques from '../components/Statistiques'

class SearchScreen extends React.Component {
  render() {
    return (
      <Search/>
    );
  }
}

class StatisticsScreen extends React.Component {
  render() {
    return (
      <Statistiques/>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Recherche: SearchScreen,
    Statistiques: StatisticsScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: '#ff4500',
      inactiveTintColor: '#a9a9a9'
    }
  });

export default createAppContainer(TabNavigator);
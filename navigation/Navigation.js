import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Search from '../components/Search'
import Details from '../components/Details'
import Statistiques from '../components/Statistiques'

class SearchScreen extends React.Component {
  render() {
    return (
      <Search navigation = { this.props.navigation }/>
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

class DetailsScreen extends React.Component {
  render() {
    return (
      <Details navigation = { this.props.navigation }/>
    );
  }
}

const SearchStack = createStackNavigator(
  {
    Recherche: { screen: SearchScreen },
    Details: { screen: DetailsScreen },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default createAppContainer(createBottomTabNavigator(
  {
    Recherche: { screen: SearchStack },
    Statistiques: { screen: StatisticsScreen },
  },
  {
    tabBarOptions: {
      activeTintColor: '#ff4500',
      inactiveTintColor: '#a9a9a9'
    }
  }));
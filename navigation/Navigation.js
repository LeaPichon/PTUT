import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Search from '../components/Search'
import Details from '../components/Details'
import Statistiques from '../components/Statistiques'

// Page de recherche, ou l'écran principal
class SearchScreen extends React.Component {
  render() {
    return (
      <Search navigation = { this.props.navigation }/>
    );
  }
}

// Page des statistiques 
class StatisticsScreen extends React.Component {
  render() {
    return (
      <Statistiques/>
    );
  }
}

// Page de détails d'un subreddit
class DetailsScreen extends React.Component {
  render() {
    return (
      <Details navigation = { this.props.navigation }/>
    );
  }
}

// StackNavigator qui permet d'ouvrir la page Détails
// depuis la page Recherche
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

// AppContainer qui contient le TabNavigator qui permet de naviguer 
// entre la page Recherche et la page Statistiques
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
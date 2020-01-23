import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCogs } from '@fortawesome/free-solid-svg-icons';

import Sidebar from './components/Sidebar';
import flexiHome from './components/HomeScreen';
import flexiSetting from './components/SettingScreen';

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: flexiHome,
    navigationOptions: {
      title: "Home",
      drawerIcon: ({ tintColor }) => <FontAwesomeIcon icon={faHome} size={20} color={tintColor} /> 
    }
  },
  Setting: {
    screen: flexiSetting,
    navigationOptions: {
      title: "Setting",
      drawerIcon: ({ tintColor }) => <FontAwesomeIcon icon={faCogs} size={20} color={tintColor} /> 
    }
  }
}, {
  initialRouteName: "Home",
  //contentComponent: props => <Sidebar {...props} />,
  drawerWidth: Dimensions.get("window").width * 0.85,
  hideStatusBar: true,
  contentOptions: {
    activeBackgroundColor: "rgba(54, 79, 107, 0.2)",
    activeTintColor: "rgb(54,79,107)",
    itemsContainerStyle: {
      marginTop: 16,
      marginHorzontal: 8
    },
    itemStyle: {
      borderRadius: 4
    }
  }
});


export default createAppContainer(DrawerNavigator);

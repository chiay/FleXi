import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import {Dimensions} from 'react-native';
import {HomeScreen, SettingScreen} from "./screens";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCogs } from '@fortawesome/free-solid-svg-icons';

const DrawerNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Home",
      drawerIcon: ({ tintColor }) => <FontAwesomeIcon icon={faHome} size={20} color={tintColor} /> 
    }
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      title: "Setting",
      drawerIcon: ({ tintColor }) => <FontAwesomeIcon icon={faCogs} size={20} color={tintColor} /> 
    }
  }
})


export default createAppContainer(DrawerNavigator);

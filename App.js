import React from 'react';
import { Dimensions, View, ScrollView, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import 'react-native-gesture-handler';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCogs } from '@fortawesome/free-solid-svg-icons';

import LinearGradient from 'react-native-linear-gradient'

import flexiHome from './components/HomeScreen';
import flexiSetting from './components/SettingScreen';
import flexiRules from './components/RulesListScreen';
import flexiNotification from './components/NotificationScreen';
import flexiAddEvent from './components/AddEventScreen';
import flexiAddRule from './components/AddRuleScreen';

const DrawerNavigator = createDrawerNavigator({
   Home: {
      screen: flexiHome,
      navigationOptions: {
      title: "Home",
      drawerIcon: ({ tintColor }) => <FontAwesomeIcon icon={faHome} size={20} color={tintColor} /> 
      }
   },
   Settings: {
      screen: flexiSetting,
      navigationOptions: {
      title: "Settings",
      drawerIcon: ({ tintColor }) => <FontAwesomeIcon icon={faCogs} size={20} color={tintColor} /> 
      }
   }
}, {
   initialRouteName: "Home",
   // LinearGradient Usage
   // <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
   contentComponent: props => 
      <ScrollView>
         <LinearGradient colors={[ '#43dde6', '#364f6b' ]} style={ styles.topbar } start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={ styles.text }>
               FleXi
            </Text>
         </LinearGradient>
         <DrawerNavigatorItems {...props} />
      </ScrollView>
   ,
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

const StackNavigator = createStackNavigator({
   DrawerNavigator: {
      screen: DrawerNavigator,
      navigationOptions: {
         headerShown: false,
      }
   },
   Rules: {
      screen: flexiRules,
      defaultNavigateOptions: {
         title: "Rules",
         headerShown: false,
         headerStyle: {
            backgroundColor: "#f0f0f0",
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "#000",
            elevation: 3,
         },
         headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#364f6b",
         },
      },
   },
   Notifications: {
      screen: flexiNotification,
      title: "Notifications",
   },
   AddEvent: {
      screen: flexiAddEvent,
      title: "AddEvent",
      navigationOptions: {
         headerShown: false,
      },
   },
   AddRule: {
      screen: flexiAddRule,
      title: "AddRule",
      navigationOptions: {
         headerShown: false,
      },
   },
});

const styles = StyleSheet.create({
   container:{
      flex: 1
   },
   topbar: {
      width: "100%",
      height: Dimensions.get("window").height * 0.2,
      backgroundColor: "#43dde6",
   },
   text: {
      fontSize: 30,
      marginHorizontal: 25,
      marginVertical: 15,
      color: "#364f6b"
   },
});


export default createAppContainer(StackNavigator);

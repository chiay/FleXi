import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

import LinearGradient from 'react-native-linear-gradient';


export default class NotificationScreen extends React.Component {

   render() {
   return (
      <View style={ styles.container }>
         <Text>
            Notification
         </Text>
      </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#f0f0f0"
   },
   topbar: {
      backgroundColor: "#fc5185", 
      borderBottomStartRadius: 50, 
      borderBottomEndRadius: 50, 
      height: 200,
      marginBottom: 5,
   },
   bars: {
      alignItems: "flex-start",
      margin: 16,
      width: 24,
   },
   date: {
      fontSize: 28,
      color: "#364f6b",
      marginLeft: 10,
      marginTop: 60,
   },
   dateIcon:{
      color: "#364f6b",
      marginLeft: 40,
      marginTop: 66,
   },
   remain: {
      fontSize: 20,
      color: "#364f6b",
      opacity: 0.6,
      marginHorizontal: 40,
   },
   buttonTouch: {
      backgroundColor: "rgba(54, 79, 107, 0.1)",
      width: 60,
      height: 60,
      borderRadius: 50,
      borderStyle: "solid",
      marginTop: Dimensions.get("window").height * 0.85,
      marginLeft: Dimensions.get("window").width * 0.78,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      zIndex: 1,
   },
   taskContainer: {
      borderRadius: 10,
      backgroundColor: "#574b90",
      width: Dimensions.get("window").width * 0.98,
      height: 80,
      marginVertical: 5,
      marginHorizontal: 4,
      opacity: 0.8,
   }
})
import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { DrawerNavigatorItems } from 'react-navigation-drawer';

export default Sidebar = props => (
   <ScrollView style={ styles.topbar }>
      <View>
         <Text style={ styles.logo }>
            FleXi
         </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
         <FontAwesomeIcon style={ styles.icon } icon={ faUser } size={ 20 } color="#f0f0f0"/>
         <Text style={ styles.text }>
            User (Not available)
         </Text>
      </View>

      <View>
         <DrawerNavigatorItems {...props} />
      </View>
      
   </ScrollView>
);

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   topbar: {
      height: Dimensions.get("window").height * 0.18,
      backgroundColor: "#364f6b",
      paddingTop: 48
   },
   logo: {
      color: "#f0f0f0",
      fontSize: 30,
      fontWeight: "800",
      marginLeft: 10,
      marginTop: 5,
      opacity: 0.8
   },
   text: {
      color: "#f0f0f0",
      fontSize: 20,
      fontWeight: "800",
      marginTop: 40,
      marginLeft: 10,
      marginBottom: 20,
      opacity: 0.8
   },
   icon: {
      marginTop: 45,
      marginLeft: 20,
      marginBottom: 20,
      opacity: 0.8
   }
});
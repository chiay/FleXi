import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default class SettingScreen extends React.Component {
   render() {
     return (
      <View style={styles.container}>
      <SafeAreaView style={styles.container}>
         <View style={{ backgroundColor: "#364f6b", borderBottomStartRadius: 50, borderBottomEndRadius: 50, height: 200 }}>
            <TouchableOpacity style={styles.bars} onPress={this.props.navigation.openDrawer}>
               <FontAwesomeIcon icon={faBars} size={24} color="#364f6b" />
            </TouchableOpacity>
         </View>
         <View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
         <Button
         onPress={() => this.props.navigation.navigate('Setting')}
         title="Go to Setting"
         />
         </View>
      </SafeAreaView>
   </View>
       
     );
   }
 }

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#f0f0f0"
   },
   bars: {
      alignItems: "flex-start",
      margin: 16
   },
   text: {
      fontSize: 20,
      color: "#161924"
   }
})
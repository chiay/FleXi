import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList, Alert } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

export default class RulesListScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         rules: {},
      };
   }

   retrieveRule = async () => {

      try {
         const buffer = await AsyncStorage.getItem('rules');
         const myRules = JSON.parse(buffer);
         const length = Object.keys(myRules).length;
         //console.log(length);

         this.setState({ rules: myRules });
         //console.log(this.state.rules);

      } catch (error) {
         Alert.alert('Fail to retrieve data.');
         //console.log(error.message);
      }
   }

   deleteRule = async () => {
      try {
         const existRules = await AsyncStorage.getItem('rules');
      } catch (error) {

      }
   }

   componentDidMount() {
      this.retrieveRule();
   }

   isEmptyList = () => {
      return (
         <View style={ styles.emptyMsgSection }>
            <Text style={ styles.emptyMsg }>
               You have not set any rule yet!
            </Text>
         </View>
      );
   };

   renderSeparator = () => {
      return (
         <View style={ { 
            height: 1, 
            width: "85%",
            marginLeft: "8%",
            backgroundColor: "#CED0CE" } }/>
      );
   };

   key = (item) => item.ruleID.toString();

   render() {
   return (
      <View style={ styles.container }>
         <FlatList
            data={ this.state.rules }
            renderItem={ ({ item }) => 
            <TouchableOpacity>
               <Text style={ styles.listTitle }>{ item.ruleTitle } - { item.ruleTime }</Text>
            </TouchableOpacity>
            }
            ItemSeparatorComponent={ this.renderSeparator }
            keyExtractor={ this.key }
            ListEmptyComponent={ this.isEmptyList }
         />
         
         <TouchableOpacity style={ styles.buttonTouch } onPress= { () => this.props.navigation.navigate('AddRule') }>
            <View>
               <FontAwesomeIcon icon={ faPlus } size={ 35 } color="rgba(54, 79, 107, 0.5)" />
            </View>
         </TouchableOpacity>
      </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#f0f0f0"
   },
   emptyMsgSection: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: Dimensions.get("window").height * 0.1,
   },
   emptyMsg: {
      fontSize: 18,
      opacity: 0.5,
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
   buttonTouch: {
      backgroundColor: "rgba(54, 79, 107, 0.1)",
      width: 60,
      height: 60,
      borderRadius: 50,
      borderStyle: "solid",
      marginTop: Dimensions.get("window").height * 0.75,
      marginLeft: Dimensions.get("window").width * 0.42,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      zIndex: 1,
   },
   listTitle: {
      fontSize: 18,
      marginLeft: 20,
      marginVertical: 10,
   },
   listTime: {

   },
})
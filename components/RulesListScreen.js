import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList, Alert } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

export default class RulesListScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         rules: null,
      };
   }

   retrieveRule = async () => {

      try {
         const buffer = await AsyncStorage.getItem('rules');
         const myRules = JSON.parse(buffer);
         //const length = Object.keys(myRules).length;
         //console.log(length);

         this.setState({ rules: myRules });
         //console.log(this.state.rules);

      } catch (error) {
         Alert.alert('Fail to retrieve data.');
         //console.log(error.message);
      }
   }

   deleteRule = async (id) => {
      try {
         const buffer = await AsyncStorage.getItem('rules');
         const existRules = JSON.parse(buffer);
         const index = existRules.map((e) => {return e.ruleID;}).indexOf(id);
         console.log(index);
         const newRules = existRules.splice(index+1, 1);
         console.log(newRules);
         await AsyncStorage.setItem('rules', JSON.stringify(newRules))
         .then( () => {
            Alert.alert('Your rule is deleted successfully.');
            //console.log(JSON.stringify(newRule));
         } );
         
      } catch (error) {
         console.log(error.message);
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
            <View style={{ flexDirection: 'row' }}>
               <TouchableOpacity 
                  style={{ 
                     flexDirection: 'row',
                     width: Dimensions.get('window').width * 0.70, 
                  }}>
                  <View style={ styles.perRuleTitleView }>
                     <Text style={ styles.listTitle }>{ item.ruleTitle }</Text>
                  </View>
                  <View style={ styles.perRuleTimeView }>
                     <Text style={ styles.listTitle }>{ item.ruleTime }</Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity 
                  style={{ 
                     width: Dimensions.get('window').width * 0.08,
                     marginLeft: 70,
                  }}
                  onPress={ () => this.deleteRule(item.ruleID) }>
                  <FontAwesomeIcon 
                     style={{ marginTop: 12 }} 
                     icon={faTrashAlt} 
                     size={20} 
                     color="rgba(54, 79, 107, 0.3)"
                  />
               </TouchableOpacity>
            </View>
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
   perRule: {
      width: Dimensions.get("window").width * 0.85,
   },
   perRuleTitleView: {
      width: 150
   },
})
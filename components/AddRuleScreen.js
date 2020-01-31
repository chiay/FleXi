import React from 'react';
import 
{ 
View, 
Text, 
StyleSheet, 
Dimensions, 
TextInput,
Picker,
Button,
Alert,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons';

export default class AddRuleScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: 0,
         title: '',
         time: '',
      };
   }

   saveRule = async () => {
      const ruleSetup = {
         'ruleID': this.state.id,
         'ruleTitle': this.state.title,
         'ruleTime': this.state.time,
      }

      /* Check if rules object exists */
      const existRules = await AsyncStorage.getItem('rules');

      const length = Object.keys(existRules).length;
      ruleSetup.ruleID = length + 1;

      let newRule = JSON.parse(existRules);
      if (!newRule) {
         newRule = [];
      }

      /* Add new rule to rules list */
      newRule.push(ruleSetup);

      try {
         await AsyncStorage.setItem('rules', JSON.stringify(newRule))
         .then( () => {
            Alert.alert('Your rule is saved successfully.');
            //console.log(JSON.stringify(newRule));
         } );
      } catch (error) {
         Alert.alert('Your rule failed to save. Please try again.');
      }
   }

   render() {
   return (
      <View style={ styles.container }>
         <View style={ styles.header }>
            <View style={{ flexDirection:"row" }}>
               <FontAwesomeIcon style={{ marginHorizontal: 10, marginTop: 2 }} icon={faPencilRuler} size={25} color="#364f6b"/>
               <Text style={ styles.headerText }>Add to Rules</Text>
            </View>
         </View>
         <View style={ styles.formContainer }>
            <TextInput 
               style={ styles.txtTitle }
               placeholder="What rule do you want to set?"
               onChangeText={ (title) => this.setState({ title }) }
               value={ this.state.title }
            />
            
            <View style={ styles.separator } />

            <TextInput 
               style={ styles.txtTitle }
               placeholder="Time - eg. 01.00-02.00"
               keyboardType="decimal-pad"
               onChangeText={ (time) => this.setState({ time }) }
               value={ this.state.time }
            />

            <View style={ styles.separator } />

            <View style={ styles.buttonContainer }>
               <View style={ styles.buttonStyle }><Button title="Done" onPress={ () => this.saveRule() } /></View>
               <View style={ styles.buttonStyle }><Button title="Discard" onPress={ () => this.props.navigation.goBack(null) } /></View>
            </View>
         </View>
      </View>
   )};
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   header: {
      width: "100%",
      height: Dimensions.get("window").height * 0.08,
      backgroundColor: "#f0f0f0",
      alignItems: "center",
      justifyContent: "center",
      borderBottomColor: "#000",
      elevation: 3,
   },
   headerText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#364f6b",
   },
   txtTitle: {
      marginHorizontal: 20,
      fontSize: 20,
      marginTop: 5,
   },
   picker: {
      marginHorizontal: 25,
      marginVertical: 5,
   },
   formTitle: {
      marginHorizontal: 20,
      marginVertical: 5,
      fontSize: 18,
      fontWeight: "bold"
   },
   separator: {
      height: 1,
      width: "85%",
      marginLeft: "8%",
      marginVertical: 5,
      backgroundColor: "#CED0CE"
   },
   buttonContainer: {
      marginTop: 50,
      flexDirection: "row",
      width: Dimensions.get("window").width,
      alignItems: "center",
      justifyContent: "center",
   },
   buttonStyle: {
      marginHorizontal: 10,
      width: Dimensions.get("window").width * 0.3,
   },

});
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
TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default class AddRuleScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: 0,
         title: '',
         minTime: new Date(),
         maxTime: new Date(),
         show: false,
         mode: 'time',
         timeOption: '',
         from: 'From',
         to: 'To  ',
      };
   }

   setMinTime = (event, date) => {
      this.setState({
         show: false,
         minTime: moment(date).format("h.mm a"),
         from: moment(date).format("h:mm a"),
      });
      //console.log('t1: ' + this.state.minTime);
   }

   setMaxTime = (event, date) => {
      this.setState({
         show: false,
         maxTime: moment(date).format("h.mm a"),
         to: moment(date).format("h:mm a"),
      });
      //console.log('t2: ' + this.state.maxTime);
   }

   showTimePicker = (opt) => {
      this.show('time', opt);
   }

   show = (mode, opt) => {
      this.setState({
         show: true,
         mode,
         timeOption: opt,
      });
   }

   saveRule = async () => {
      const ruleSetup = {
         ruleID: this.state.id,
         ruleTitle: this.state.title,
         ruleMinTime: this.state.minTime,
         ruleMaxTime: this.state.maxTime,
      }

      /* Check if rules object exists */
      const existRules = await AsyncStorage.getItem('rules');
      //const len = Object.keys(existRules).length;

      ruleSetup.ruleID = Math.random();

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
            this.props.navigation.goBack(null);
            //console.log(JSON.stringify(newRule));
         } );
      } catch (error) {
         Alert.alert('Your rule failed to save. Please try again.');
      }
   }

   render() {

      const y = moment(this.state.date).format("YYYY");
      const m = moment(this.state.date).format("MM");
      const d = moment(this.state.date).format("DD");
      const h = moment(this.state.date).format("h");
      const min = moment(this.state.date).format("mm");

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
               <Text style={ styles.formTitle }>Time</Text>

               <View style={ styles.timePicker }>
                  <TouchableOpacity 
                     style={{ justifyContent: 'center', alignItems: 'center' }} 
                     onPress={() => { this.showTimePicker('t1') }}>
                        
                     <Text 
                     style={ styles.calendarPicker }>
                        { this.state.from }
                     </Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                     style={{ justifyContent: 'center', alignItems: 'center' }} 
                     onPress={() => { this.showTimePicker('t2') }}>
                        
                     <Text 
                        style={ styles.calendarPicker }>
                        { this.state.to }
                     </Text>
                  </TouchableOpacity>
               </View>

               {this.state.show && <DateTimePicker
                     mode={ this.state.mode }
                     value={ new Date(parseInt(y), parseInt(m) - 1, parseInt(d), parseInt(h), parseInt(min)) }
                     display='spinner'
                     is24Hour={true}
                     onChange={ (event, date) => { this.state.timeOption === 't1' ? this.setMinTime(event, date) : this.setMaxTime(event, date) }}
                  />}

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
   calendarPicker: {
      marginTop: 2,
      marginBottom: 10,
      fontSize: 20,
      opacity: 0.3,
      marginHorizontal: 70,
   },
   timePicker: {
      flexDirection: "row",
      width: Dimensions.get("window").width,
      justifyContent: 'center'
   },

});
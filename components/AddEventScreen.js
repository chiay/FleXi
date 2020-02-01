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
KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

export default class AddEventScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: 0,
         title: '',
         type: '',
         priority: '',
         date: '',
         time: '',
         location: '',
         description: '',
      };
   }
   

   saveEvent = async () => {
      const eventSetup = {
         eventID: this.state.id,
         eventTitle: this.state.title,
         eventType: this.state.time,
         eventPriority: this.state.priority,
         eventDate: this.state.date,
         eventTime: this.state.time,
         eventLocation: this.state.location,
         eventDescription: this.state.description,
      }

      /* Check if rules object exists */
      const existEvents = await AsyncStorage.getItem('events');
      //const len = Object.keys(existRules).length;

      eventSetup.eventID = Math.random();

      let newEvent = JSON.parse(existEvents);
      if (!newEvent) {
         newEvent = [];
      }

      /* Add new rule to rules list */
      newEvent.push(eventSetup);

      try {
         await AsyncStorage.setItem('events', JSON.stringify(newEvent))
         .then( () => {
            Alert.alert('Your event is saved successfully.');
            this.props.navigation.goBack(null);
            console.log(JSON.stringify(newEvent));
         } );
      } catch (error) {
         Alert.alert('Your event failed to save. Please try again.');
      }
   }

   render() {
   return (
      <KeyboardAvoidingView style={ styles.container } behavior="height" enabled>
         <View style={ styles.header }>
            <View style={{ flexDirection:"row" }}>
               <FontAwesomeIcon style={{ marginHorizontal: 10, marginTop: 2 }} icon={faCalendarPlus} size={25} color="#364f6b"/>
               <Text style={ styles.headerText }>Add to Calendar</Text>
            </View>
         </View>
         <View style={ styles.formContainer }>
            <TextInput style={ styles.txtTitle }
               placeholder="Give me a title..."
               onChangeText={ (title) => this.setState({ title }) }
               value={ this.state.title }
            />
            <Text style={ styles.formTitle }>Type</Text>
            <Picker style={ styles.picker }
               selectedValue={ this.state.type }
               onValueChange={ (itemValue) => this.setState({ type: itemValue }) }
            >
               <Picker.Item label="Event" value="Event"/>
               <Picker.Item label="Meeting" value="Meeting"/>
               <Picker.Item label="Task" value="Task"/>
               
            </Picker>
            
            <View style={ styles.separator } />

            <Text style={ styles.formTitle }>Priority</Text>
            <Picker style={ styles.picker }
               selectedValue={ this.state.priority }
               onValueChange={ (itemValue) => this.setState({ priority: itemValue }) }
            >
               <Picker.Item label="Low" value="Low"/>
               <Picker.Item label="Average" value="Average"/>
               <Picker.Item label="Normal" value="Normal"/>
               <Picker.Item label="High" value="High"/>
               <Picker.Item label="Urgent" value="Urgent"/>
               
            </Picker>
            
            <View style={ styles.separator } />

            <TextInput style={ styles.txtTitle }
               placeholder="Date - MM - DD - YYYY"
               keyboardType="decimal-pad"
               onChangeText={ (date) => this.setState({ date }) }
               value={ this.state.date }
            />
            <View style={ styles.separator } />

            <TextInput style={ styles.txtTitle }
               placeholder="Time - eg. 01.00-02.00"
               keyboardType="decimal-pad"
               onChangeText={ (time) => this.setState({ time }) }
               value={ this.state.time }
            />
            <View style={ styles.separator } />

            <TextInput style={ styles.txtTitle }
               placeholder="Location"
               onChangeText={ (location) => this.setState({ location }) }
               value={ this.state.location }
            />

            <View style={ styles.separator } />

            <TextInput style={ styles.txtTitle }
               placeholder="Description (optional)"
               onChangeText={ (title) => this.setState({ description } ? { description } : '') }
               value={ this.state.description }
            />

            <View style={ styles.buttonContainer }>
               <View style={ styles.buttonStyle }><Button title="Done" onPress={ () => this.saveEvent() } /></View>
               <View style={ styles.buttonStyle }><Button title="Discard" onPress={ () => this.props.navigation.goBack(null) } /></View>
            </View>
         </View>
      </KeyboardAvoidingView>
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
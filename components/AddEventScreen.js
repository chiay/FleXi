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
TouchableOpacity
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';

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
         date: new Date(),
         minTime: new Date(),
         maxTime: new Date(),
         location: '',
         description: '',
         done: false,

         show: false,
         mode: 'date',
         timeOption: '',
         from: 'From',
         to: 'To  ',
         dateTitle: 'Pick a date',
         path: '',
      };

   }

   setDate = (event, date) => {
      const month_str = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      this.setState({
         show: false,
         date: moment(date).format("YYYY-MM-DD"),
         dateTitle: moment(date).format("YYYY-MM-DD"),
         path: 'T' + moment(date).format('YYYY').toString() + month_str[parseInt(moment(date).format('MM')) - 1] + parseInt(moment(date).format('DD')).toString(),
      });
      
      //console.log(this.state.date);
      //console.log(this.state.path);
   }

   setTime = (event, date) => {
      if (this.state.timeOption === 't1') {
         this.setState({
            show: false,
            minTime: moment(date).format("h.mm a"),
            from: moment(date).format("h:mm a"),
         });
         //console.log(this.state.minTime);
      } else {
         this.setState({
            show: false,
            maxTime: moment(date).format("h.mm a"),
            to: moment(date).format("h:mm a"),
         });
         //console.log(this.state.maxTime);
      }
   }

   setMinTime = (event, date) => {
      this.setState({
         show: false,
         minTime: moment(date).format("h.mm a"),
         from: moment(date).format("h:mm a"),
      });
      //console.log(this.state.minTime);
   }

   setMaxTime = (event, date) => {
      this.setState({
         show: false,
         maxTime: moment(date).format("h.mm a"),
         to: moment(date).format("h:mm a"),
      });
      //console.log(this.state.maxTime);
   }
   
   showDatePicker = () => {
      this.show('date', '');
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

   saveEvent = async () => {
      let eventSetup = {
         eventID: this.state.id,
         eventTitle: this.state.title,
         eventType: this.state.type,
         eventPriority: this.state.priority,
         eventDate: this.state.date,
         eventMinTime: this.state.minTime,
         eventMaxTime: this.state.maxTime,
         eventLocation: this.state.location,
         eventDescription: this.state.description,
         eventDone: this.state.done,
      }

      /* Check if rules object exists */
      //const existEvents = await AsyncStorage.getItem('events');
      const existEvents = await AsyncStorage.getItem(this.state.path);
      //const len = Object.keys(existRules).length;

      eventSetup.eventID = Math.random();

      let newEvent = JSON.parse(existEvents);
      if (!newEvent) {
         newEvent = [];
      }

      /* Add new rule to rules list */
      newEvent.push(eventSetup);

      try {
         await AsyncStorage.setItem(this.state.path, JSON.stringify(newEvent))
         .then( () => {
            Alert.alert('Your event is saved successfully.');
            this.props.navigation.goBack(null);
            //console.log(JSON.stringify(newEvent));
         } );
      } catch (error) {
         Alert.alert('Your event failed to save. Please try again.');
      }
   }

   render() {
      const y = moment(this.state.date).format("YYYY");
      const m = moment(this.state.date).format("MM");
      const d = moment(this.state.date).format("DD");
      const h = moment(this.state.date).format("h");
      const min = moment(this.state.date).format("mm");

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
               <Text style={ styles.formTitle }>Date</Text>

               <TouchableOpacity 
                  style={{ justifyContent: 'center', alignItems: 'center' }} 
                  onPress={() => { this.showDatePicker() }}>
                  
                  <Text style={ styles.calendarPicker }>
                     Pick a date
                  </Text>
               </TouchableOpacity>

               {this.state.show && <DateTimePicker
                  mode={ this.state.mode }
                  value={ new Date(parseInt(y), parseInt(m) - 1, parseInt(d), parseInt(h), parseInt(min)) }
                  display='spinner'
                  is24Hour={true}
                  onChange={(event, date) => { this.state.mode === 'date' ? this.setDate(event, date) : this.setTime(event, date) }}
               />}

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
      )
   };
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
      marginTop: 20,
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
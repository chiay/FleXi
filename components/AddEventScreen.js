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
Switch,
TouchableOpacity,
ScrollView,
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
         type: 'Event',
         priority: 1,
         date: new Date(),
         minTime: new Date(),
         maxTime: new Date(),
         location: '',
         description: '',

         show: false,
         mode: 'date',
         timeOption: '',
         from: 'From',
         to: 'To  ',
         dateTitle: 'Pick a date',
         path: '',
         autoAssign: false,
         toggleSwitch: false,
         showDateTime: true,
         requiredTime: 1,
         split: false,
      };

   }

   setDate = (event, date) => {
      const month_str = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      // Example path: T2020Mar2
      this.setState({
         show: false,
         date: moment(date).format("YYYY-MM-DD"),
         dateTitle: moment(date).format("YYYY-MM-DD"),
         path: 'T' + moment(date).format('YYYY').toString() + month_str[parseInt(moment(date).format('MM')) - 1] + parseInt(moment(date).format('DD')).toString(),
      });
      
      //console.log(this.state.date);
      //console.log(this.state.path);

      this.autoAssignment();
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

   switchToggled = (toggled, opt) => {
      if (opt === 'dt') {
         this.setState({
            toggleSwitch: !toggled,
            showDateTime: !this.state.showDateTime,
            autoAssign: !this.state.autoAssign,
         });
      } else if(opt === 'sp') {
         this.setState({
            split: !toggled,
         });
      }
      
   }

   randomTime = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

   formatTime = (t) => {
      if (t >= 1 && t < 12) {
         return t.toString() + '.00 am';
      } else if (t > 12 && t < 24) {
         return (t-12).toString() + '.00 pm';
      } else if (t === 12) {
         return '12.00 pm';
      } else if (t >= 24) {
         return (24-t).toString() + '.00 am'; 
      }
   }

   checkTime = (minT, maxT, tVal) => {
      let dayAllow = []
      for (let i = 0; i < minT.length; ++i) {
         if (minT[i] >= tVal && maxT[i] <= tVal - 1) {
            dayAllow.push(false);
            break;
         }
         dayAllow.push(true);
      }
      return dayAllow;
   }

   /* TODO: Call function to auto-assign date and time*/

   autoAssignment = async () => {
      const priority = this.state.priority;
      const requiredTime = this.state.requiredTime;
      const allowSplit = this.state.split;
      
      const rules = await this.retrieveRules();
      const events = await this.retrieveFullEvent(); // Length of events = days

      //console.log(events);
      //console.log(rules);

      const duration = events.length;
      const numOfRules = rules.length;

      let timeMinScheduled = [];
      let timeMaxScheduled = [];
      let timeMinBuffer = [];
      let timeMaxBuffer = [];
      let t1 = 0.0;
      let t2 = 0.0;
      let ppDay = 0;
      let totalPriority = [];

      for (let i = 0; i < duration; ++i) {
         timeMinBuffer = [];
         timeMaxBuffer = [];
         ppDay = 0;
         for (let j = 0; j < events[i].length; ++j) {
            t1 = parseFloat(events[i][j].eventMinTime.split(' ')[0]);
            t2 = parseFloat(events[i][j].eventMaxTime.split(' ')[0]);

            if (events[i][j].eventMinTime.split(' ')[1] === 'pm' && t1 < 12.00) {
               t1 += 12;
            }
            if (events[i][j].eventMaxTime.split(' ')[1] === 'pm' && t2 < 12.00) {
               t2 += 12;
            }

            timeMinBuffer.push(t1);
            timeMaxBuffer.push(t2);

            ppDay += events[i][j].eventPriority;
         }

         for (let n = 0; n < numOfRules; ++n) {
            let ruleMinTime = rules[n].ruleMinTime.split(' ')[0];
            let ruleMaxTime = rules[n].ruleMaxTime.split(' ')[0];
            let ruleMinPeriod = rules[n].ruleMinTime.split(' ')[1];
            let ruleMaxPeriod = rules[n].ruleMaxTime.split(' ')[1];
            if (!rules[n].ruleAssignment) {
               if (ruleMinPeriod === 'pm' && ruleMaxPeriod === 'am') {
                  timeMinBuffer.push(parseFloat(ruleMinTime) + 12.00);
                  timeMaxBuffer.push(23.59);
                  timeMinBuffer.push(0);
                  timeMaxBuffer.push(parseFloat(ruleMaxTime));
               } else if (ruleMinPeriod === 'am' && ruleMaxPeriod === 'pm') {
                  timeMinBuffer.push(parseFloat(ruleMinTime));
                  timeMinBuffer.push(parseFloat(ruleMaxTime) + 12.00);
               } else {
                  timeMinBuffer.push(parseFloat(ruleMinTime));
                  timeMinBuffer.push(parseFloat(ruleMaxTime));
               }
            }
         }

         timeMinScheduled.push(timeMinBuffer);
         timeMaxScheduled.push(timeMaxBuffer);

         totalPriority.push(ppDay);
      }

      //console.log(timeMinScheduled);
      //console.log(timeMaxScheduled);

      //console.log(totalPriority);
      
      let p = 0;
      let count = 30;
      let isAllowed = false;
      let rTime = 0;
      const month_str = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      for (let i = 0; i < duration; ++i) {   // Per day
         if (priority / totalPriority[i] < 1) {
            p = priority / totalPriority[i] * 100;
         } else {
            p = priority / totalPriority[i];
         }
         if (p < 15) {
            while (count >= 0 || !isAllowed) {
               //rTime = this.randomTime(0, 24);
               if (i === 0) {
                  rTime = this.randomTime(parseInt(moment().format('HH')), 24);
               } else {
                  rTime = this.randomTime(0, 24);
               }
               
               let ct = this.checkTime(timeMinScheduled[i], timeMaxScheduled[i], rTime);
               if (ct.indexOf(true) !== -1) {
                  isAllowed = true;
                  let assignedDate = moment().add(i, 'd').format("YYYY-MM-DD");
                  this.setState({
                     date: assignedDate,
                     minTime: this.formatTime(rTime),
                     maxTime: this.formatTime(rTime + requiredTime),
                     path: 'T' + moment(assignedDate).format('YYYY').toString() + month_str[parseInt(moment(assignedDate).format('MM')) - 1] + parseInt(moment(assignedDate).format('DD')).toString(),
                  });
                  //console.log('Date: ' + this.state.date);
                  //console.log('MinTime: ' + this.state.minTime);
                  //console.log('MaxTime: ' + this.state.maxTime);
                  //this.saveEvent();
                  break;
               } else {
                  // Unable to get time to assign
               }
               --count;
            }
            break;
         } else {
            break;
         }
      }
   }

   retrieveFullEvent = async () => {
      const endDate = moment(this.state.date).format();
      const startDate = moment().format();

      const duration = moment(endDate,"YYYY-MM-DD").diff(startDate, 'days');

      //console.log("End Date: " + endDate);
      //console.log("Start Date: " + startDate);
      //console.log("Duration: " + duration);

      const month_str = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      let allEvents = [];
      let i = 0;

      while (i <= duration) {
         const nextDate = moment().add(i, 'd').format("YYYY-MM-DD");
         //console.log(nextDate);
   
         let DateDay = parseInt(moment(nextDate).format("DD").toString());
         let DateMonth = month_str[moment(nextDate).format("MM") - 1];
         let DateYear = parseInt(moment(nextDate).format("YYYY").toString());

         let path = "T" + DateYear.toString() + DateMonth + (DateDay).toString();
         //console.log("Path: " + path);

         let bufferEvents = await AsyncStorage.getItem(path);
         let eventsJson = JSON.parse(bufferEvents);
         if (eventsJson) {
            allEvents.push(eventsJson);
         }
         ++i;
      }
      //console.log(allEvents);

      return allEvents;
   }

   retrieveRules = async () => {
      const bufferRules = await AsyncStorage.getItem('rules');

      let existRules = JSON.parse(bufferRules);
      if (existRules) {
         //console.log(existRules);
         return existRules;
      }
      return [];
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
         <View style={ styles.container }>
            <View style={ styles.header }>
               <View style={{ flexDirection:"row" }}>
                  <FontAwesomeIcon style={{ marginHorizontal: 10, marginTop: 2 }} icon={faCalendarPlus} size={25} color="#364f6b"/>
                  <Text style={ styles.headerText }>Add to Calendar</Text>
               </View>
            </View>
            <ScrollView style={ styles.formContainer }>
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
                  <Picker.Item label="Low" value={1}/>
                  <Picker.Item label="Average" value={2}/>
                  <Picker.Item label="Normal" value={3}/>
                  <Picker.Item label="High" value={4}/>
                  <Picker.Item label="Urgent" value={5}/>
                  
               </Picker>
               
               <View style={ styles.separator } />

               <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                  <Text style={ styles.formTitle }>Auto-assign Date & Time</Text>
                  <Switch style={ styles.autoAssignSwitch } onValueChange= { () => this.switchToggled(this.state.toggleSwitch, 'dt') } value={ this.state.toggleSwitch }/>
               </View>

               <View style={ styles.separator } />

               {this.state.show && <DateTimePicker
                     mode={ this.state.mode }
                     value={ new Date(parseInt(y), parseInt(m) - 1, parseInt(d), parseInt(h), parseInt(min)) }
                     display='spinner'
                     is24Hour={true}
                     onChange={(event, date) => { this.state.mode === 'date' ? this.setDate(event, date) : this.setTime(event, date) }}
               />}

               {/* Optional barrier */}

               {this.state.showDateTime && <View>

                  <Text style={ styles.formTitle }>Date</Text>

                  <TouchableOpacity 
                     style={{ justifyContent: 'center', alignItems: 'center' }} 
                     onPress={() => { this.showDatePicker() }}>
                     
                     <Text style={ styles.calendarPicker }>
                        { this.state.dateTitle }
                     </Text>
                  </TouchableOpacity>

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

               </View>}
               
               {!this.state.showDateTime && <View>
                  <Text style={ styles.formTitle }>Due Date</Text>

                  <TouchableOpacity 
                     style={{ justifyContent: 'center', alignItems: 'center' }} 
                     onPress={() => { this.showDatePicker() }}>
                        
                     <Text style={ styles.calendarPicker }>
                        { this.state.dateTitle }
                     </Text>
                  </TouchableOpacity>

                  <View style={ styles.separator } />

                  <Text style={ styles.formTitle }>Required Time (hr)</Text>
                  <Picker style={ styles.picker }
                     selectedValue={ this.state.requiredTime }
                     onValueChange={ (itemValue) => this.setState({ requiredTime: itemValue }) }
                  >
                     <Picker.Item label="1 [ *NOT allow to split* ]" value={1}/>
                     <Picker.Item label="2" value={2}/>
                     <Picker.Item label="3" value={3}/>
                     <Picker.Item label="4" value={4}/>
                     <Picker.Item label="5" value={5}/>
                     <Picker.Item label="6" value={6}/>
                     <Picker.Item label="7" value={7}/>
                     <Picker.Item label="8" value={8}/>
                     <Picker.Item label="9" value={9}/>
                     <Picker.Item label="10" value={10}/>
                  </Picker>

                  <View style={ styles.separator } />

                  <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                     <Text style={ styles.formTitle }>Split Task</Text>
                     <Switch style={ styles.splitSwitch } onValueChange= { () => this.switchToggled(this.state.split, 'sp') } value={ this.state.split }/>
                  </View>

                  <View style={ styles.separator } />

               </View>}

               {/* End of optional barrier */}

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
                  <View style={ styles.buttonStyle }><Button title="Done" onPress={ () => this.state.autoAssign === false ? this.saveEvent() : this.autoAssignment() } /></View>
                  <View style={ styles.buttonStyle }><Button title="Discard" onPress={ () => this.props.navigation.goBack(null) } /></View>
               </View>
            </ScrollView>
         </View>
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
   autoAssignSwitch: {
      marginLeft: Dimensions.get('window').width * 0.2,
   },
   splitSwitch: {
      marginLeft: Dimensions.get('window').width * 0.53,
   },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, FlatList } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faPlus, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

class HomeScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         date: '',
         taskRemain: 0,
         events: [],

         show: false,
         path: '',
         isLoading: true,
      };
   }

   isEmptyList = () => {
      return (
         <View style={ styles.emptyMsgSection }>
            <Text style={ styles.emptyMsg }>
               No task for today.
            </Text>
         </View>
      );
   };

   setToday = () => {
      this.setState({ isLoading: true, });

      const date = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const month_str = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const path = 'T' + year.toString() + month_str[month] + date.toString();
      console.log(path);

      this.setState({  
         date: date + ' ' + month_str[month] + '. ' + year,
         path: path,
      });

      if(this.state.isLoading) {
         this.retrieveEvent();
      }
      
   }

   showDatePicker = () => {
      this.setState({
         show: true,
      })
   }

   setDate = (event, date) => {
      const month_str = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      this.setState({
         show: false,

         date: parseInt(moment(date).format("DD")).toString() + ' ' + month_str[parseInt(moment(date).format('MM')) - 1] + '. ' + moment(date).format('YYYY').toString(),
         path: 'T' + moment(date).format('YYYY').toString() + month_str[parseInt(moment(date).format('MM')) - 1] + parseInt(moment(date).format('DD')).toString(),
      });
      
      //console.log(this.state.date);
      //console.log(this.state.path);

      this.retrieveEvent();
   }

   retrieveEvent = async () => {

      try {
         const buffer = await AsyncStorage.getItem(this.state.path);
         if (buffer) {
            const myEvents = JSON.parse(buffer);
            const len = Object.keys(myEvents).length;
            //console.log(length);
            this.setState({ taskRemain: len, events: myEvents, isLoading: false, });
         }
         
         //console.log(this.state.rules);

      } catch (error) {
         //Alert.alert('Fail to retrieve data.');
         console.log(error.message);
      }
   }

   deleteEvent = async (id) => {
      try {
         const buffer = await AsyncStorage.getItem(this.state.path);
         let existEvents = JSON.parse(buffer);
         const index = existEvents.map((e) => {return e.eventID;}).indexOf(id);
         console.log(index);
         existEvents.splice(index, 1);
         console.log(existEvents);
         await AsyncStorage.setItem(this.state.path, JSON.stringify(existEvents))
         .then( () => {
            Alert.alert(
               'Delete Event', 
               'Your event is deleted successfully.',
               [
                  { text: 'OK', onPress: () => this.retrieveEvent() },
               ],
            );
            //console.log(JSON.stringify(newRule));
         } );
         
      } catch (error) {
         console.log(error.message);
      }
   }

   componentDidMount() {
      this.setToday();

      const { navigation } = this.props;
      this.focusListener = navigation.addListener('didFocus', () => {
         this.retrieveEvent();
      });
   }

   componentWillUnmount() {
      this.focusListener.remove();
   }

   key = (item) => item.eventID.toString();

   render() {
      const y = moment(this.state.date).format("YYYY");
      const m = moment(this.state.date).format("MM");
      const d = moment(this.state.date).format("DD");

      return (
         <View style={ styles.container }>
            <View style={ styles.topBar }>
               <TouchableOpacity style={ styles.bars } onPress={ this.props.navigation.openDrawer }>
                  <FontAwesomeIcon icon={ faBars } size={ 24 } color="#364f6b" />
               </TouchableOpacity>
               <View style={{ flexDirection:"row" }}>
                  <FontAwesomeIcon style={ styles.dateIcon } icon={ faCalendarAlt } size={ 28 } />
                  
                  <TouchableOpacity onPress={ () => this.showDatePicker() }>
                     <Text style={ styles.date }>
                        { this.state.date }
                     </Text>
                  </TouchableOpacity>

                  {this.state.show && <DateTimePicker
                  mode={ 'date' }
                  value={ new Date(parseInt(y), parseInt(m) - 1, parseInt(d)) }
                  display='default'
                  is24Hour={true}
                  onChange={(event, date) => { this.setDate(event, date) }}
                  />}
                  
                  <TouchableOpacity 
                     style={{ width: 20, marginLeft: 110, }}
                     onPress={ () => this.setToday() }>
                     <FontAwesomeIcon style={ styles.reloadIcon } icon={ faRedoAlt } size={ 20 } />
                  </TouchableOpacity>
               </View>
               <View>
                  <Text style={ styles.remain }>
                     Total task(s) for today: { this.state.taskRemain }
                  </Text>
               </View> 
            </View>
            <View>

            </View>
            
            <TouchableOpacity style={ styles.buttonTouch } onPress= { () => this.props.navigation.navigate('AddEvent') }>
               <View>
                  <FontAwesomeIcon icon={ faPlus } size={ 35 } color="#364f6b" />
               </View>
            </TouchableOpacity>

            <FlatList
               data={ this.state.events }
               renderItem={ ({ item }) =>
               <View style={ styles.taskContainer }>
                  <TouchableOpacity style={ styles.taskTouch }>
                     <Text style={ styles.perEventTitleFont}>
                        { item.eventTitle }
                     </Text>
                     <Text style={ styles.perEventDateTime }> 
                        { item.eventDate } , { item.eventMinTime } - { item.eventMaxTime }
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                     style={ styles.taskRemove }
                     onPress={ () => this.deleteEvent(item.eventID) }>
                  <FontAwesomeIcon 
                        style={{  }} 
                        icon={ faTrashAlt } 
                        size={30} 
                        color="#000"
                  />
                  </TouchableOpacity>
               </View>
               }
               keyExtractor={ this.key }
               ListEmptyComponent={ this.isEmptyList }
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#f0f0f0"
   },
   topBar: {
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
   reloadIcon:{
      color: "#364f6b",
      //marginLeft: 110,
      marginTop: 70,
      opacity: 0.5,
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
      opacity: 0.7,
   },
   emptyMsgSection: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: Dimensions.get("window").height * 0.2,
   },
   emptyMsg: {
      fontSize: 22,
      opacity: 0.5,
   },
   perEventTitleFont: {
      marginLeft: 30,
      marginTop: 10,
      fontSize: 24,
   },
   perEventDateTime: {
      marginTop: 3,
      marginHorizontal: 20,
      fontSize: 20,
      opacity: 0.5,
   },
   taskTouch: {
      width: Dimensions.get('window').width * 0.87,
   },
   taskRemove: {
      top: -50,
      left: Dimensions.get('window').width * 0.87,
      zIndex: 1,
      position: 'relative',
      opacity: 0.5,
   },
})

export default withNavigationFocus(HomeScreen);
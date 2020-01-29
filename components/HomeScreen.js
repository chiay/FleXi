import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

import LinearGradient from 'react-native-linear-gradient';

export default class HomeScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         date: '',
      };
   }

   componentDidMount() {
      const date = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const month_str = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      this.setState({  
         date: date + ' ' + month_str[month] + '. ' + year,
      });
   }

   render() {
   return (
      <View style={ styles.container }>
         <View style={ styles.topbar }>
            <TouchableOpacity style={ styles.bars } onPress={ this.props.navigation.openDrawer }>
               <FontAwesomeIcon icon={ faBars } size={ 24 } color="#364f6b" />
            </TouchableOpacity>
            <View style={{ flexDirection:"row" }}>
               <FontAwesomeIcon style={ styles.dateIcon } icon={ faCalendarAlt } size={ 28 } />
               <Text style={ styles.date }>
                  { this.state.date }
               </Text>
            </View>
            <View>
               <Text style={ styles.remain }>
                  Task(s) remaining for today: 10
               </Text>
            </View> 
         </View>
         <TouchableOpacity style={ styles.buttonTouch } onPress= { () => this.props.navigation.navigate('AddEvent') }>
            <View>
               <FontAwesomeIcon icon={ faPlus } size={ 35 } color="#364f6b" />
            </View>
         </TouchableOpacity>
         <ScrollView>
            <TouchableOpacity style={ styles.taskContainer }>

            </TouchableOpacity>

            <TouchableOpacity style={ styles.taskContainer }>

            </TouchableOpacity>
            <TouchableOpacity style={ styles.taskContainer }>

            </TouchableOpacity>

         </ScrollView>
      </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#f0f0f0"
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
      opacity: 0.8,
   }
})